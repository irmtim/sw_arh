from netmiko import ConnectHandler
from netmiko import NetMikoTimeoutException
from paramiko.ssh_exception import SSHException
from netmiko import NetmikoAuthenticationException
from datetime import datetime, timezone, timedelta
from re import search
import psycopg2
import logging
import config
from netmiko.ssh_autodetect import SSHDetect



def sw_auto_detect(ip):

    remote_device = {'device_type': 'autodetect',
                         'host': ip,
                         'username': config.sw_username['username'],
                         'password': config.sw_password['password']}
    try:
        guesser = SSHDetect(**remote_device)
        best_match = guesser.autodetect()
        print(best_match) # Name of the best device_type to use further
        print(guesser.potential_matches) # Dictionary of the whole
    except:
        return f'Err. No connection.'

    return best_match


def netmiko_log():
    d_ta = datetime.now(timezone(timedelta(hours=3))).replace(microsecond=0)
    f = f"{config.file_log_path1}{d_ta.strftime('%Y_%d_%m_%H_%M_%S')}.log"
    logging.basicConfig(filename=f, level=logging.DEBUG)
    logg = logging.getLogger("netmiko")
    return logg


def sw_srh_log(string):
    d_ta = datetime.now(timezone(timedelta(hours=3))).replace(microsecond=0)
    f = f"{config.file_log_path2}{d_ta.strftime('%Y_%d_%m_%H_%M_%S')}.log"
    with open(f, 'w', encoding='UTF-8') as file:
        file.write(string)


def ssh_con(ip: str):
    for d_t in config.device_tupl:
        RTR = {
            'ip': IP.strip(),
            'username': config.sw_username,
            'password': config.sw_password,
            'device_type': d_t
        }
        connect_err_log = f'{RTR["ip"]} type: {RTR["device_type"]} {datetime.now(timezone(timedelta(hours=3))).replace(microsecond=0)} '
        try:
            net_conn = ConnectHandler(**RTR)

            return net_conn, d_t
        except NetMikoTimeoutException:
            connect_err_log += f'Device not reachable.\n'
        except NetmikoAuthenticationException:
            connect_err_log += f'Authentication Failure.\n'
        except SSHException:
            connect_err_log += f'Make sure SSH is enabled in device.\n'
        except:

            continue

    return f'Err. {connect_err_log}', d_t


def tp_sg34_ser(net_conn) -> dict:
    serial = net_conn.send_command_timing(
        command_string='show system-info',
        strip_prompt=False,
        strip_command=False
    )
    serial_dict = dict()
    for v in serial.strip().split('\n'):
        if ' - ' in v:
            serial_dict[v.split('- ')[0].strip()] = v.split('- ')[1].strip()
    serial_dict['Model Name'] = serial_dict.pop('Hardware Version')
    serial_dict['Serial-Number'] = serial_dict.pop('Serial Number')
    return serial_dict


def d_1510_ser(net_conn) -> dict:
    ### Не доделал корректную дозапись в словарь (идет затирание предидущей записи последующей.)
    serial = net_conn.send_command('show unit')
    ser_dict = dict()
    for i in serial.split('\n\n\n'):
        ser_iter = (k for k in i.strip().split('\n') if k and "--" not in k)
        key_list = [n.strip() for n in next(ser_iter).split('  ') if n]
        val_list = [n.strip() for n in next(ser_iter).split('  ') if n]
        ser_dict.update(dict(zip(key_list, val_list)))

    return ser_dict


def d_1210_ser(net_conn) -> dict:
    serial = net_conn.send_command_timing(
        command_string='show switch',
        strip_prompt=False,
        strip_command=False
    )
    ser_dict = dict()
    # ser = filter(lambda k: ' : ' in k, (serial.strip().split('\n')))
    for s in serial.strip().split('\n'):
        if ' : ' in s:
            ser_dict[s.split(': ')[0].strip()] = s.split(': ')[1].strip()
    ser_dict['Model Name'] = ser_dict.pop('Device Type')
    if 'System Serial Number' in ser_dict:
        ser_dict['Serial-Number'] = ser_dict.pop('System Serial Number')
    elif 'Serial Number' in ser_dict:
        ser_dict['Serial-Number'] = ser_dict.pop('Serial Number')

    return ser_dict


def tp_sg34_conf(net_conn) -> str:
    output = net_conn.send_command_timing(
        command_string='show startup-config',
        strip_prompt=False,
        strip_command=False
    )
    pattern = r'!(.|\n)*end'
    out = search(pattern, output)
    content = out.group()

    return content


def d_1510_conf(net_conn) -> str:
    st = "CTRL+C ESC q Quit SPACE n Next Page ENTER Next Entry a All"
    output = net_conn.send_command_timing(
        command_string='show running-config',
        strip_prompt=False,
        strip_command=False
    )
    if st in output:
        output += net_conn.send_command_timing(
            command_string='a',
            strip_prompt=True,
            strip_command=True
        )
    flag = False
    content = ''
    for s in output.split('\n'):
        if search(r'!-*', s):
            flag = True
        if 'CTRL+C ESC q Quit SPACE n Next Page ENTER Next Entry a All' not in s and s != '' and flag:
            content += (s + '\n')

    return content


def d_1210_conf(net_conn) -> str:
    command = 'show config current_config'
    output = net_conn.send_command_timing(
        command_string=command,
        strip_prompt=False,
        strip_command=False,
        last_read=15.0
    )
    pattern, content = '#---------', ''
    flag = 0
    for st in output.split('\n'):
        if pattern in st or 0 < flag < 4:
            content = content + st + '\n'
            if pattern in st:
                flag += 1

    return content


def vc_db(ip, content, ser_dict, file_path) -> str:
    try:
        conn = psycopg2.connect(config.pg_conn)
    except:
        flag = f'Can`t establish connection to database'
        return flag
    sql_query = 'SELECT content, created_on FROM public.backup_sw where ip = %s order by created_on desc limit 1'
    with conn.cursor() as curs:
        curs.execute(sql_query, (ip,))  ## IP.strip()
        data = curs.fetchone()
        conn.commit()
        if data is None or data[0] != content:
            curs.execute(
                "INSERT INTO backup_sw (ip, model, serial, created_on, file_path, content) VALUES ( %s, %s, %s, %s, %s, %s)",
                [ip, ser_dict['Model Name'], ser_dict['Serial-Number'], da_ta, file_path, content])
            conn.commit()
            conn.close()
            flag = f'Backup {ip} is done. New ver: {da_ta}'
            return flag

        else:
            conn.close()
            flag = f'Backup {ip} is actual. Current ver: {data[1]}'
            return flag


def file_w(file_path, content):
    with open(file_path, 'w') as SAVE_FILE:
        SAVE_FILE.write(content)

    return f'Finished backup operation. Created {file_path}'


# if __name__ == '__main__':
i = 0
err_log = ''
func_ser = {'dlink_ds': (d_1510_ser, d_1210_ser), 'tplink_jetstream': (tp_sg34_ser,)}
func_conf = {'dlink_ds': (d_1510_conf, d_1210_conf), 'tplink_jetstream': (tp_sg34_conf,)}

for m, st in config.dev_path:

    with open(st, 'r', encoding='UTF-8') as IP_LIST:
        for IP in IP_LIST.read().strip().split():
            logger = netmiko_log()
            net_connect, mod = ssh_con(IP.strip())
            if isinstance(net_connect, str):
                err_log = err_log + f'{net_connect} {mod}\n'
                print(net_connect, mod)
            else:
                err_log = err_log + f'Initiating show switch: {IP.strip()}\n'
                print(f'Initiating show switch: {IP.strip()}')
                ser_dict = func_ser[mod][m](net_connect)
                content = func_conf[mod][m](net_connect)
                da_ta = datetime.now(timezone(timedelta(hours=3))).replace(microsecond=0)
                file_path = f"{config.file_path}{IP.strip().replace('.', '_')}@{da_ta.strftime('%Y_%d_%m_%H_%M_%S')}.cfg"
                stat = vc_db(IP.strip(), content, ser_dict, file_path)
                err_log = err_log + f'{stat}\n'
                if 'done' in stat:
                    wr_stat = file_w(file_path, content)
                    err_log = err_log + f'{wr_stat}\n'
                    print(wr_stat)
                else:
                    print(stat)
    sw_srh_log(err_log)




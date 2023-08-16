from netmiko import ConnectHandler
from netmiko import NetMikoTimeoutException
from paramiko.ssh_exception import SSHException
from netmiko import NetmikoAuthenticationException
import datetime
from re import search
import psycopg2
import logging
import config
from netmiko.ssh_autodetect import SSHDetect
import os


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
    d = datetime.datetime.now().replace(microsecond=0)
    f = f"{config.file_log_path1}{d.strftime('%Y_%d_%m_%H_%M_%S')}.log"
    logging.basicConfig(filename=f, level=logging.DEBUG)
    logg = logging.getLogger("netmiko")
    return logg


def sw_srh_log(string):
    d = datetime.datetime.now().replace(microsecond=0)
    f = f"{config.file_log_path2}{d.strftime('%Y_%d_%m_%H_%M_%S')}.log"
    with open(f, 'w', encoding='UTF-8') as file:
        file.write(string)


def ssh_con(model: str, ip: str):
    RTR = {
        'ip': ip,
        'username': config.model_sw_dict[model]['sw_username'],
        'password': config.model_sw_dict[model]['sw_password'],
        'device_type': config.model_sw_dict[model]['device_type']
    }
    connect_err_log = f'{RTR["ip"]} type: {RTR["device_type"]} {datetime.datetime.now()}\n'
    try:
        net_conn = ConnectHandler(**RTR)
        return net_conn, config.model_sw_dict[model]['device_type']
    except NetMikoTimeoutException:
        connect_err_log += f'Device not reachable.\n'
    except NetmikoAuthenticationException:
        connect_err_log += f'Authentication Failure.\n'
    except SSHException:
        connect_err_log += f'Make sure SSH is enabled in device.\n'
    # except:

    return f'Err. Connection error or Device {ip} not in list', config.model_sw_dict[model]['device_type']


def sw_1_serial(model, net_conn) -> dict:
    ### Не доделал корректную дозапись в словарь (идет затирание предидущей записи последующей.)
    serial = net_conn.send_command(config.model_sw_dict[model]['serial_command_string'])
    serial_dict = dict()
    for i in serial.split('\n\n\n'):
        ser_iter = (k for k in i.strip().split('\n') if k and "--" not in k)
        key_list = [n.strip() for n in next(ser_iter).split('  ') if n]
        val_list = [n.strip() for n in next(ser_iter).split('  ') if n]
        serial_dict.update(dict(zip(key_list, val_list)))

    return serial_dict


def sw_2_serial(model, net_conn) -> dict:
    serial = net_conn.send_command_timing(
        command_string=config.model_sw_dict[model]['serial_command_string'],
        strip_prompt=False,
        strip_command=False
    )
    serial_dict = dict()
    d = config.model_sw_dict[model]['delimiter']
    for v in serial.strip().split('\n'):
        if f'{d} ' in v:
            serial_dict[v.split(f'{d} ')[0].strip()] = v.split(f'{d} ')[1].strip()
    serial_dict['Model Name'] = serial_dict.pop(config.model_sw_dict[model]['Model Name'])
    serial_dict['Serial-Number'] = serial_dict.pop(config.model_sw_dict[model]['Serial-Number'])
    return serial_dict


def route_1_conf(model, net_conn) -> str:  # MikroTik RB1100x4
    output = net_conn.send_command(
        config.model_sw_dict[model]['config_command_string']
    )
    content = output[(output.find('\n') + 1):]

    return content


def sw_1_conf(model, net_conn) -> str:
    output = net_conn.send_command_timing(
        command_string=config.model_sw_dict[model]['config_command_string'],
        strip_prompt=False,
        strip_command=False
    )
    pattern = r'!(.|\n)*end'
    out = search(pattern, output)
    content = out.group()

    return content


def sw_2_conf(model, net_conn) -> str:
    st = "CTRL+C ESC q Quit SPACE n Next Page ENTER Next Entry a All"
    output = net_conn.send_command_timing(
        command_string=config.model_sw_dict[model]['config_command_string'],
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


def sw_3_conf(model, net_conn) -> str:
    output = net_conn.send_command_timing(
        command_string=config.model_sw_dict[model]['config_command_string'],
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


def create_ip_dict_fromfile(files_ip_path) -> dict:
    ip_dict = dict()
    i = next(os.walk(files_ip_path))
    for j in i[2]:
        if j[:3] == 'SW_' and j[-4:] == '.txt':
            with open(f'{i[0]}{j}', 'r', encoding='UTF-8') as ip_list:
                for ip in ip_list.read().strip().split():
                    n = j[3:-4]
                    if n in ip_dict:
                        ip_dict[n].add(ip)
                    else:
                        ip_dict[n] = {ip}

    return ip_dict



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
                "INSERT INTO backup_sw (ip, model, serial, created_on, file_path, content) VALUES (%s, %s, %s, %s, %s, %s)",
                [ip, ser_dict['Model Name'], ser_dict['Serial-Number'], dat, file_path, content])
            conn.commit()
            conn.close()
            flag = f'Backup {ip} is done. New ver: {dat}'
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
ip_dict = create_ip_dict_fromfile(config.files_ip_path)
err_log = ''

func_ser = (sw_1_serial, sw_2_serial)
func_conf = (sw_1_conf, sw_2_conf, sw_3_conf, route_1_conf)

for model, ip_set in ip_dict.items():
    for ip in ip_set:
        logger = netmiko_log()
        net_connect, mod = ssh_con(model, ip)
        if isinstance(net_connect, str):
            err_log = err_log + f'{net_connect} {mod}\n'
            print(net_connect, mod)
        else:
            err_log = err_log + f'Initiating show switch: {ip}\n'
            print(f'Initiating show switch: {ip}')
            ser_dict = func_ser[config.model_sw_dict[model]['func_ser']](model, net_connect)
            content = func_conf[config.model_sw_dict[model]['func_conf']](model, net_connect)
            dat = datetime.datetime.now().replace(microsecond=0)
            file_path = f"{config.file_path}{ip.replace('.', '_')}@{dat.strftime('%Y_%d_%m_%H_%M_%S')}.cfg"
            stat = vc_db(ip, content, ser_dict, file_path)
            err_log = err_log + f'{stat}\n'
            if 'done' in stat:
                wr_stat = file_w(file_path, content)
                err_log = err_log + f'{wr_stat}\n'
                print(wr_stat)
            else:
                print(stat)
            net_connect.disconnect()
sw_srh_log(err_log)





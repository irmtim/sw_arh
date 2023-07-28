##################################################
# cfg default
##################################################

# ldsp_server = 'ldap://173.34.5.1:389'
#
# root_dn = "dc=rpz,dc=local"
#
# d_name = '@rpz.local'
#
# sw_password = '333333'
#
# sw_username = 'adm'
#
# db_type = 'postgresql'
#
# db_ip = '10.5.0.2'
#
# db_pass = 'pg'
#
# db_user = 'pg'
#
# db_port = '5432'
#
# db_db = 'SW_DB'
#
# adm_group = 'Switch_arh_admin'
#
# tab_name = 'backup_sw'
#
# schedule_time = 300  # time out in hours

##################################################
# cfg from schedule.ini
##################################################
with open('/usr/src/app/data/scheduler.ini', 'r', encoding='UTF-8') as file:
# with open('/home/flask/services/web/data/scheduler.ini', 'r', encoding='UTF-8') as file:
    conf_dict = dict()
    for ins in file.read().split('\n'):
        if '==' in ins:
            conf_dict[ins.split('==')[0].strip()] = ins.split('==')[1].strip()

ldsp_server = conf_dict['ldsp_server']

root_dn = conf_dict['root_dn']

d_name = conf_dict['d_name']

sw_password = conf_dict['sw_password']

sw_username = conf_dict['sw_username']

db_type = conf_dict['db_type']

db_ip = conf_dict['db_ip']

db_pass = conf_dict['db_pass']

db_user = conf_dict['db_user']

db_port = conf_dict['db_port']

db_db = conf_dict['db_db']

adm_group = conf_dict['adm_group']

tab_name = conf_dict['tab_name']

schedule_time = int(conf_dict['schedule_time'])

pg_conn = f'{db_type}://{db_user}:{db_pass}@{db_ip}:{db_port}/{db_db}'
url_create = {
    'drivername': db_type,
    'username': db_user,
    'host': db_ip,
    'database': db_db,
    'password': db_pass,
    'port': db_port
}

device_tupl = ('dlink_ds', 'tplink_jetstream')
# device_tupl = ('dlink_ds', 'tplink_jetstream', 'mikrotik_routeros', 'hp_comware')

dev_path = ((0, "/usr/src/app/data/DEV_SW/sw.txt"), (1, "/usr/src/app/data/DEV_SW/dgs_1210_sw.txt"))

file_path = f"/usr/src/app/data/ARH_SW/"
file_log_path1 = f"/usr/src/app/data/LOG_SW/netmiko/"
file_log_path2 = f"/usr/src/app/data/LOG_SW/app/"

UPLOAD_FOLDER = f"/usr/src/app/data/ARH_SW"

template_folder = "/usr/src/app/templates"

root_path = "/usr/src/app"

model_sw = {
    'd_1210_': {'device_type': 'dlink_ds', 'serial_command_string': 'show switch', 'Model Name': 'Device Type',
                'Serial-Number': 'System Serial Number',
                'config_command_string': 'show config current_config'},
    'd_1510_X': {'device_type': 'dlink_ds', 'serial_command_string': 'show unit', 'Model Name': 'Model Name',
                 'Serial-Number': 'Serial-Number',
                 'config_command_string': 'show running-config'},
    'tp_sg34_X': {'device_type': 'tplink_jetstream', 'serial_command_string': 'show system-info',
                  'Model Name': 'Hardware Version', 'Serial-Number': 'Serial Number',
                  'config_command_string': 'show startup-config'}
}

import os

# basedir = os.path.abspath(os.path.dirname(__file__))
#
#
# class Config(object):
#     SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")
#     SQLALCHEMY_TRACK_MODIFICATIONS = False


##################################################
# cfg для скрипта сбора резервных копий          #
#                                                #
#                                                #
##################################################

ldsp_server = f"ldap://173.34.5.1:389"

root_dn = "dc=rpz,dc=local"

d_name = '@rpz.local'

adm_group = 'Switch_arh_admin'

device_tupl = ('dlink_ds', 'tplink_jetstream')
# device_tupl = ('dlink_ds', 'tplink_jetstream', 'mikrotik_routeros', 'hp_comware')

dev_path = ((0, "/usr/src/app/data/DEV_SW/sw.txt"), (1, "/usr/src/app/data/DEV_SW/dgs_1210_sw.txt"))

sw_password = '333333'

sw_username = 'adm'

file_path = f"/usr/src/app/data/ARH_SW/"
file_log_path1 = f"/usr/src/app/data/LOG_SW/netmiko/"
file_log_path2 = f"/usr/src/app/data/LOG_SW/app/"

pg_conn = 'postgresql://pg:pg@10.5.0.2:5432/SW_DB'

UPLOAD_FOLDER = f"/usr/src/app/data/ARH_SW"

template_folder = "/usr/src/app/templates"

root_path = "/usr/src/app"

tab_name = 'backup_sw'

schedule_time = 600      # time out in hours

url_create = {
    'drivername': "postgresql",
    'username': "pg",
    'host': "10.5.0.2",
    'database': "SW_DB",
    'password': "pg",
    'port': "5432"
}

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

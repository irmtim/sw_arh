from flask import Flask, render_template, send_file, cli, request
from ldap3 import Server, Connection, ALL, SUBTREE
import os
from forms import LoginForm
from config import url_create, ldsp_server, root_dn, adm_group, tab_name, UPLOAD_FOLDER, d_name, schedule_time
from flask_sqlalchemy import SQLAlchemy
from flask_bootstrap import Bootstrap
from flask_migrate import Migrate
from datetime import datetime
import schedule
import runpy
import time
import db_create

app = Flask(__name__)

app.config[
    'SQLALCHEMY_DATABASE_URI'] = f"{url_create['drivername']}://{url_create['username']}:{url_create['password']}" \
                                 f"@{url_create['host']}:{url_create['port']}/{url_create['database']}"

cli = cli.FlaskGroup(app)

# UPLOAD_FOLDER = f"/usr/src/app/data/ARH_SW"

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db = SQLAlchemy(app)

migrate = Migrate(app, db)

bootstrap = Bootstrap(app)

app.secret_key = os.urandom(24)

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024


@cli.command("create_tab")
def create_tab():
    db_create.Base.metadata.create_all(db_create.engine)


@cli.command("start_inv")
def start_inv():
    import sw_foo


def job():
    print(f'Start')
    runpy.run_module(mod_name='sw_foo')


@cli.command("scheduler")
def scheduler():
    schedule.every(schedule_time).minutes.do(job)
    while True:
        schedule.run_pending()
        time.sleep(1)


def global_ldap_authentication(user_name, user_pwd, group=adm_group):
    flag = False
    ldap_user_name = user_name.strip()
    ldap_user_pwd = user_pwd.strip()
    ldsp_serve = ldsp_server
    root_d = root_dn
    user = f'cn={ldap_user_name},{root_d}'
    server = Server(ldsp_serve, get_info=ALL)
    connection = Connection(server,
                            user=f'{ldap_user_name}{d_name}',
                            password=ldap_user_pwd)
    if not connection.bind():
        return flag
    else:
        search_filter = f"(sAMAccountName={user_name})"
        search_attribute = ['memberOf']
        connection.search(search_base=root_dn,
                          search_scope=SUBTREE,
                          search_filter=search_filter,
                          attributes=search_attribute)
        flag = any(map(lambda i: group in i, connection.response[0]['attributes']['memberOf']))

    return flag


class SwitchArh(db.Model):
    __tablename__ = tab_name

    id = db.Column(db.Integer, primary_key=True)
    ip = db.Column(db.String(20), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    serial = db.Column(db.String(50), nullable=False)
    created_on = db.Column(db.DateTime(), default=datetime.now)
    file_path = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String(), nullable=False)

    def __init__(self, ip, model, serial, created_on, file_path, content):
        self.name = ip
        self.model = model
        self.serial = serial
        self.created_on = created_on
        self.file_path = file_path
        self.content = content

    def __repr__(self):
        return f"<Switch {self.model}>"


def handle_switches_():
    switches = SwitchArh.query.all()
    results = [
        {
            "ip": switch.ip,
            "model": switch.model,
            "serial": switch.serial,
            "created_on": switch.created_on,
            # 'file_path': switch.file_path
        } for switch in switches]
    ip_list, sw_list = [], []
    for i in sorted(results, key=lambda i: i['created_on']):
        if i['ip'] not in ip_list:
            ip_list.append(i['ip'])
            i.pop('created_on')
            sw_list.append(i)

    return sw_list


def arh_switch(ip):
    switches = SwitchArh.query.all()
    results = [
        {
            # "id": switch.id,
            "model": switch.model,
            "serial": switch.serial,
            "created_on": switch.created_on,
            # 'file_path': switch.file_path
        } for switch in switches if switch.ip == ip]

    return results


def data_switch(data):
    results = ''
    switches = SwitchArh.query.all()
    for switch in switches:
        if switch.created_on == datetime.fromisoformat(data):
            results = switch.file_path
    return results


@app.route('/', methods=['GET', 'POST'])
@app.route('/login', methods=['GET', 'POST'])
def index():
    # initiate the form..
    form = LoginForm.LoginValidation()

    if request.method in ('POST'):
        login_id = form.user_name_pid.data
        login_password = form.user_pid_Password.data

        # create a directory to hold the Logs
        # login_msg = global_ldap_authentication(login_id, login_password)

        # validate the connection
        if global_ldap_authentication(login_id, login_password):
            success_message = f"*** Authentication Success "
            return render_template('sw1.html', all_sw=handle_switches_())

        else:
            error_message = f"*** Authentication Failed ***"
            return render_template("error.html", error_message=str(error_message))

    return render_template('login.html', form=form)


@app.route('/ip/<ip>', methods=['GET', 'POST'])
def sw2(ip):
    return render_template('sw2.html', one_sw=arh_switch(ip), ip=ip)


@app.route('/ip/arh/<d>')
def images(d):
    ff = data_switch(d)
    print(data_switch(d))
    return send_file(ff, mimetype='text/csv', as_attachment=True)


if __name__ == '__main__':
    cli()

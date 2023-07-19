from flask import render_template, url_for, send_from_directory, send_file
import pg_content
from views.global_ldap_authentication import *
from forms.LoginForm import *
from flask import request
from main import *


@app.route('/', methods=['GET', 'POST'])
@app.route('/login', methods=['GET', 'POST'])
def index():
    # initiate the form..
    form = LoginValidation()

    if request.method in ('POST'):
        login_id = form.user_name_pid.data
        login_password = form.user_pid_Password.data

        # create a directory to hold the Logs
        # login_msg = global_ldap_authentication(login_id, login_password)

        # validate the connection
        if global_ldap_authentication(login_id, login_password):
            success_message = f"*** Authentication Success "
            return render_template('sw1.html', all_sw=pg_content.handle_switches_())

        else:
            error_message = f"*** Authentication Failed ***"
            return render_template("error.html", error_message=str(error_message))

    return render_template('login.html', form=form)


@app.route('/ip/<ip>', methods=['GET', 'POST'])
def sw2(ip):
    return render_template('sw2.html', one_sw=pg_content.arh_switch(ip), ip=ip)


@app.route('/ip/arh/<d>')
def images(d):
    f = pg_content.data_switch(d)
    return send_file(f, mimetype='text/csv', as_attachment=True)


# @app.route('/ip/arh/<d>', methods=['GET', 'POST'])
# def sw3(d):
#     return render_template('sw3.html', cfg_sw=pg_content.dat_switch(d))




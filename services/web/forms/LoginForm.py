# from project import app
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, validators


class LoginValidation(FlaskForm):
    user_name_pid = StringField('', [validators.InputRequired()],
                                render_kw={'autofocus': True, 'placeholder': 'Enter User'})

    user_pid_Password = PasswordField('', [validators.InputRequired()],
                                      render_kw={'autofocus': True, 'placeholder': 'Enter your login Password'})
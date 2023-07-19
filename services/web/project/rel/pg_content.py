from datetime import datetime
from main import *
from markdown import markdown

class SwitchArh(db.Model):
    __tablename__ = 'backup_sw'

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
            "serial": switch.serial
            # "created_on": switch.created_on,
            # 'file_path': switch.file_path
        } for switch in switches]

    return results


def arh_switch(ip):
    switches = SwitchArh.query.all()
    results = [
        {
            #"id": switch.id,
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


# def dat_switch(data):
#     results, content = '', ''
#     switches = SwitchArh.query.all()
#     for switch in switches:
#         if switch.created_on == datetime.fromisoformat(data):
#             results = switch.file_path
#             content = switch.content
#     content = markdown(content)
#     return results[10:], content




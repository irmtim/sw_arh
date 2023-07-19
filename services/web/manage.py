# from flask_script import Server, Manager
from flask.cli import FlaskGroup
import os
from project.app import app

cli = FlaskGroup(app)

# manager = Manager(app#
# manager.add_command("runserver", Server(
#     use_debugger=True,
#     use_reloader=True,
#     host='localhost',
#     port=5000
# ))

if __name__ == '__main__':
    # manager.run(debag=1)
    cli()
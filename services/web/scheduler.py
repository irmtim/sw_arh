import schedule
import time
from config import schedule_time
import runpy


def job():
    print(f'Start')
    runpy.run_module(mod_name='sw_foo')


# schedule.every(schedule_time).hours.do(job)
schedule.every(schedule_time).minutes.do(job)

while True:
    schedule.run_pending()
    time.sleep(1)

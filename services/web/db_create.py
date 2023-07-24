from sqlalchemy import Column, Integer, String, DateTime, create_engine
from sqlalchemy.orm import declarative_base
from datetime import datetime
import config
from sqlalchemy.engine import URL

url = URL.create(
    drivername=config.url_create['drivername'],
    username=config.url_create['username'],
    host=config.url_create['host'],
    database=config.url_create['database'],
    password=config.url_create['password'],
    port=config.url_create['port']
)

engine = create_engine(url)

connection = engine.connect()

Base = declarative_base()


class Backup_sw(Base):
    __tablename__ = config.tab_name

    id = Column(Integer(), primary_key=True)
    model = Column(String(100), nullable=False)
    ip = Column(String(20), nullable=False)
    serial = Column(String(50), nullable=False)
    created_on = Column(DateTime(), default=datetime.now)
    file_path = Column(String(100), nullable=False)
    content = Column(String, nullable=False)


# Base.metadata.create_all(engine)

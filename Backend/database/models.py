from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String

Base = declarative_base()


class Interaction(Base):

    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True)

    doctor = Column(String)

    hospital = Column(String)

    notes = Column(String)

    followup = Column(String)

    summary = Column(String)
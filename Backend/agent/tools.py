from database.db import SessionLocal
from database.models import Interaction


def log_interaction(state):

    db = SessionLocal()

    interaction = Interaction(
        doctor=state["doctor"],
        hospital=state["hospital"],
        notes=state["notes"],
        followup=state["followup"],
        summary=state["summary"],
    )

    db.add(interaction)
    db.commit()
    db.close()

    return {"status": "Logged"}


def get_history():

    db = SessionLocal()

    data = db.query(Interaction).all()

    history = []

    for item in data:
        history.append({
            "id": item.id,
            "doctor": item.doctor,
            "hospital": item.hospital,
            "notes": item.notes,
            "followup": item.followup,
            "summary": item.summary,
        })

    db.close()

    return history


def edit_interaction(id, notes):

    db = SessionLocal()

    interaction = db.query(Interaction).filter(
        Interaction.id == id
    ).first()

    if interaction:

        interaction.notes = notes

        db.commit()

        db.close()

        return {"status": "Updated"}

    db.close()

    return {"status": "Not Found"}


followups = []

def schedule_followup(doctor, date):

    followups.append({
        "doctor": doctor,
        "date": date
    })

    return {
        "status": "Scheduled"
    }


def get_followups():
    return followups

def ai_insights(summary):

    return {
        "insight": f"Next meeting should focus on {summary}"
    }


def delete_interaction(id):

    db = SessionLocal()

    interaction = db.query(Interaction).filter(
        Interaction.id == id
    ).first()

    if interaction:

        db.delete(interaction)
        db.commit()

        db.close()

        return {"status": "Deleted"}

    db.close()

    return {"status": "Not Found"}


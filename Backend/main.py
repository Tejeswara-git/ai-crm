from fastapi import FastAPI
from pydantic import BaseModel
from agent.graph import crm_graph
import database.db
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware
from agent.tools import (
    edit_interaction,
    delete_interaction,
    get_history,
    schedule_followup,
    ai_insights,
)
from agent.tools import get_followups
class ChatRequest(BaseModel):
    message: str

import os

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        os.getenv("FRONTEND_URL", "*"),  # Set FRONTEND_URL=https://your-app.vercel.app in Railway env
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Interaction(BaseModel):
    doctor: str
    hospital: str
    notes: str
    followup: str


@app.get("/")
def home():
    return {
        "message": "AI CRM Backend Running 🚀"
    }

@app.delete("/delete/{id}")
def delete(id: int):
    return delete_interaction(id)



@app.post("/log-interaction")
def log_interaction(data: Interaction):

    result = crm_graph.invoke(
        {
            "doctor": data.doctor,
            "hospital": data.hospital,
            "notes": data.notes,
            "followup": data.followup,
            "summary": "",
        }
    )

    return result

@app.put("/edit-interaction")
def edit(id: int, notes: str):

    return edit_interaction(id, notes)

@app.get("/history")
def history():

    return get_history()

@app.post("/followup")
def followup(doctor: str, date: str):

    return schedule_followup(doctor, date)

@app.get("/insights")
def insights(summary: str):

    return ai_insights(summary)

@app.get("/followups")
def followups():
    return get_followups()

@app.post("/chat")
def chat(request: ChatRequest):

    prompt = f"""
    You are an AI CRM assistant.

    Extract the following from the user's message:

    Doctor:
    Hospital:
    Notes:
    Followup:

    Then generate a short summary.

    User Message:
    {request.message}

    Return it in this format:

    Doctor:
    Hospital:
    Notes:
    Followup:
    Summary:
    """

    from services.groq_services import client

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "response": response.choices[0].message.content
    }
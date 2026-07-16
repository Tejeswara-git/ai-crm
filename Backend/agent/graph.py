from typing import TypedDict
from agent.tools import (
    log_interaction,
    get_history,
    schedule_followup,
    ai_insights,
)

from langgraph.graph import StateGraph, END

from services.groq_services import summarize_interaction


class CRMState(TypedDict):
    doctor: str
    hospital: str
    notes: str
    followup: str
    summary: str


def log_interaction_node(state: CRMState):
    return state

def generate_summary(state: CRMState):

    summary = summarize_interaction(
        doctor=state["doctor"],
        hospital=state["hospital"],
        notes=state["notes"],
        followup=state["followup"],
    )

    state["summary"] = summary

    return state



from agent.tools import log_interaction as save_to_db

def save_interaction(state: CRMState):

    save_to_db(state)

    return state


graph = StateGraph(CRMState)

graph.add_node("log", log_interaction_node)
graph.add_node("summary", generate_summary)
graph.add_node("save", save_interaction)

graph.set_entry_point("log")

graph.add_edge("log", "summary")
graph.add_edge("summary", "save")
graph.add_edge("save", END)

crm_graph = graph.compile()
import { useState } from "react";
import FormTab from "../components/FormTab";
import ChatTab from "../components/ChatTab";
import "./Home.css";
import History from "../components/History";
import Followup from "../components/Followup";
import Insights from "../components/Insights";

function Home() {
  const [tab, setTab] = useState("form");
  const [reload, setReload] = useState(false);

const refreshHistory = () => {
    setReload(prev => !prev);
};

  return (
    <div className="container">
      <h1>AI CRM  TEST</h1>
      <p>Healthcare Professional Module</p>

      <div className="tabs">
        <button
          className={tab === "form" ? "active" : ""}
          onClick={() => setTab("form")}
        >
          Structured Form
        </button>

        <button
          className={tab === "chat" ? "active" : ""}
          onClick={() => setTab("chat")}
        >
          AI Chat
        </button>
        
      </div>

      {tab === "form" ? <FormTab refreshHistory={refreshHistory}/> : <ChatTab />}
    
      
<Followup/>
<Insights/>
<History reload={reload} />
    </div>
  );
}

export default Home;
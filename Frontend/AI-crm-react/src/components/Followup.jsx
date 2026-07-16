import { useState, useEffect } from "react";
import axios from "axios";

function Followup() {

    const [doctor, setDoctor] = useState("");
    const [date, setDate] = useState("");

    const [followups, setFollowups] = useState([]);

    const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    const loadFollowups = async () => {

        const res = await axios.get(
            `${BASE_URL}/followups`
        );

        setFollowups(res.data);
    };

    useEffect(() => {
        loadFollowups();
    }, []);

    async function schedule() {

        await axios.post(
            `${BASE_URL}/followup`,
            null,
            {
                params: {
                    doctor,
                    date
                }
            }
        );

        loadFollowups();

        setDoctor("");
        setDate("");
    }

    return (

        <div className="card">

            <h2>Upcoming Follow-ups</h2>

            <input
                placeholder="Doctor"
                value={doctor}
                onChange={(e)=>setDoctor(e.target.value)}
            />

            <br/><br/>

            <input
                placeholder="Date"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
            />

            <br/><br/>

            <button onClick={schedule}>
                Schedule
            </button>

            <br/><br/>

            {

                followups.map((item,index)=>(

                    <div key={index}>

                        <h4>👨‍⚕️ {item.doctor}</h4>

                        <p>📅 {item.date}</p>

                        <hr/>

                    </div>

                ))

            }

        </div>

    );

}

export default Followup;
import { useEffect, useState } from "react";
import axios from "axios";

function History({reload}) {

    const [history, setHistory] = useState([]);

    const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    const loadHistory = async () => {

        const res = await axios.get(
            `${BASE_URL}/history`
        );

        setHistory(res.data);

    };

    useEffect(() => {

        loadHistory();

    }, [reload]);

    const deleteInteraction = async (id) => {

        await axios.delete(
            `${BASE_URL}/delete/${id}`
        );

        loadHistory();

    };

    const updateInteraction = async (id) => {

    const notes =
        document.getElementById(`notes-${id}`).value;

    await axios.put(
        `${BASE_URL}/edit-interaction`,
        null,
        {
            params: {
                id,
                notes
            }
        }
    );

    loadHistory();

};

    return (

        <div className="card">

            <h2>Recent Interactions</h2>

            {

                history.map((item) => (

                    <div key={item.id}>

                        <h3>{item.doctor}</h3>

                        <p><b>Hospital:</b> {item.hospital}</p>
<div style={{marginTop:"10px"}}>

<label>Notes</label>

<br/>

<textarea
    defaultValue={item.notes}
    id={`notes-${item.id}`}
    rows={4}
    cols={50}
/>

</div>

                        <p><b>Follow-up:</b> {item.followup}</p>

                        <p><b>Summary:</b> {item.summary}</p>

                       <button
    onClick={() => deleteInteraction(item.id)}
    style={{
        background:"red",
        color:"white",
        marginTop:"10px"
    }}
>
    🗑 Delete
</button>
<button
    onClick={() => updateInteraction(item.id)}
    style={{
        marginRight:"10px",
        marginTop:"10px"
    }}
>
    💾 Update
</button>
                        <hr/>

                    </div>

                ))

            }

        </div>

    );

}

export default History;
import { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setLatest } from "../redux/interactionSlice";


  function FormTab({ refreshHistory }) {
  const [form, setForm] = useState({
    doctor: "",
    hospital: "",
    notes: "",
    followup: "",
  });
const dispatch = useDispatch();
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const res = await axios.post(
        `${BASE_URL}/log-interaction`,
        form
      );

      
      setResponse(res.data);

refreshHistory();
  setForm({
      doctor: "",
      hospital: "",
      notes: "",
      followup: "",
    });


dispatch(setLatest(res.data));
    } catch (err) {
      console.log(err);
      alert("Backend Error");
    }
  };

  return (
    <div>

      <input
        name="doctor"
        placeholder="Doctor"
        value={form.doctor}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="hospital"
        placeholder="Hospital"
        value={form.hospital}
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="notes"
        placeholder="Interaction Notes"
        rows="5"
        value={form.notes}
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="followup"
        placeholder="Follow Up Date"
        value={form.followup}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={submit}>
        Log Interaction
      </button>

      {response && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 10,
            background: "#f4f4f4"
          }}
        >
          <h3>AI Summary</h3>

          <p><b>Doctor:</b> {response.doctor}</p>

          <p>{response.summary}</p>
        </div>
      )}

    </div>
  );
}

export default FormTab;
'use client' // to fix 

import { useState } from "react";

export default function SpendPage() {
    const [groceries, setGroceries] = useState("");
    const [dining, setDining] = useState("");
    const [gas, setGas] = useState("");
    const [travel, setTravel] = useState("");
    const [error, setError] = useState("");
    
    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        
        if(!groceries || !dining || !gas || !travel){ 
            setError("Please fill in all fields!");
            return; 
        }

        setError("");

        try {
            const response = await fetch("/api/recommend", {
                method: 'POST',
                body: JSON.stringify({ groceries, dining, gas, travel }),
                headers: {
                    'Content-type': 'application/json',
                },
            });

            if(!response.ok){
                throw new Error(`Server error: ${response.status}`)
            }
            
            const data = await response.json();
            console.log("Success: ", data)

        } catch(err) {
            console.error("Error:", err);
        }
    }

    return (
      <div>
        <h1>Enter Your Monthly Spending</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <input type="number" value={groceries} onChange={e => setGroceries(e.target.value)} placeholder="Groceries"></input>
            <input type="number" value={dining} onChange={e => setDining(e.target.value)} placeholder="Dining"></input>
            <input type="number" value={gas} onChange={e => setGas(e.target.value)} placeholder="Gas"></input>
            <input type="number" value={travel} onChange={e => setTravel(e.target.value)} placeholder="Travel"></input>
            <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://vhxsymxaukaokylyvtxf.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoeHN5bXhhdWthb2t5bHl2dHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzY2MjIsImV4cCI6MjA1NzgxMjYyMn0.o4TJDknGZmI3qnt39FK37ZNWKIwnFIX2wFRp1NIxlWs");

function Test() {
    const [instruments, setInstruments] = useState([]);

    useEffect(() => {
      getInstruments();
    }, []);

    async function getInstruments() {
      const { data } = await supabase.from("instruments").select().order("id", { ascending: true });;
      setInstruments(data);
      console.log(data)
    }
  
    async function modifyInstruments() {
      const {error} = await supabase 
      .from('instruments')
      .update({name: "keyboard"})
      .eq('id', 1)
      console.log(error)
    }

    async function addInstrument() {
      const { data, error } = await supabase
        .from("instruments") // Table name
        .insert([
          { name: "Guitar", type: "strings"} // New row data
        ]);
    
      if (error) {
        console.error("Insert Error:", error.message);
      } else {
        console.log("Inserted Data:", data);
      }
    }
    

    return (
      <>
      <button className="bg-red-500 pointer" onClick={()=>modifyInstruments()}>Set data</button>
      <button className="bg-blue-500 pointer" onClick={()=>addInstrument()}>Add data</button>
      <ul>
        {instruments.map((instrument) => (
          <li key={instrument.name}>{instrument.name}</li>
        ))}
      </ul>
      </>
    );
}

export default Test;
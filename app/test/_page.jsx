'use client'

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const SUPABASE_URL = "https://vhxsymxaukaokylyvtxf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoeHN5bXhhdWthb2t5bHl2dHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzY2MjIsImV4cCI6MjA1NzgxMjYyMn0.o4TJDknGZmI3qnt39FK37ZNWKIwnFIX2wFRp1NIxlWs";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const UI = <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>React + Supabase Login</h1>
      {!session ? (
        UI
      ) : (
        <div>
          <p>Welcome, {session.user.email}!</p>
          <button onClick={() => supabase.auth.signOut()}>Log Out</button>
        </div>
      )}
    </div>
  );
}

export default App;

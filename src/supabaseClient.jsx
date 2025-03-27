// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vhxsymxaukaokylyvtxf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoeHN5bXhhdWthb2t5bHl2dHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzY2MjIsImV4cCI6MjA1NzgxMjYyMn0.o4TJDknGZmI3qnt39FK37ZNWKIwnFIX2wFRp1NIxlWs";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

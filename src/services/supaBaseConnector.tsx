import { createClient } from "@supabase/supabase-js";

// tried to nest data in .env didnt want to pass on import or process

const supabaseURL = "https://hfembhazsufruiznyfwu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmZW1iaGF6c3VmcnVpem55Znd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4MzQ0MTYsImV4cCI6MjAxNjQxMDQxNn0.KA6PK_on128h0LIbocODeQEEYMBStw4mVx1CNENpsTU";

const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;
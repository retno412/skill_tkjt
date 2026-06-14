// supabase-config.js
// 1. Ambil URL dan Anon Key dari Dashboard Supabase Anda
const SUPABASE_URL = "https://yjzvwuikfdkzprkltxbw.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqenZ3dWlrZmRrenBya2x0eGJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MDQwNzAsImV4cCI6MjA5Njk4MDA3MH0.fGaq6zACJHqFDHLTPSTdapyfNcBcSFJwZhDy8X9Gm8Y";

// 2. Inisialisasi Client Supabase global
//const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabaseClient = window.supabase;
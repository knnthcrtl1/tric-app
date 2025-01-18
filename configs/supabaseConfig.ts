import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://fdardohlpqeoidjinrvv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkYXJkb2hscHFlb2lkamlucnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMTgwMTgsImV4cCI6MjA1Mjc5NDAxOH0.PVSzbpRIZWUcm-n4YrJxSIzdgttfSiHbBnp3coCrzQs";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vgrqxbervrhgqjvzfwrt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZncnF4YmVydnJoZ3Fqdnpmd3J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5Mjg1OTEsImV4cCI6MjA1ODUwNDU5MX0.Eb-AvkyCEGFoZAPx3acMPCeqbaf9iiUneZ5hGR50C7c';

export const supabase = createClient(supabaseUrl, supabaseKey);

// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oiubojqbqzyapefgprsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pdWJvanFicXp5YXBlZmdwcnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MzQ0MjcsImV4cCI6MjA2ODQxMDQyN30.ggwxzlS8OQqkT0W8Jt01d_FziOCXWl1U3-rBGeRBkeg';

export const supabase = createClient(supabaseUrl, supabaseKey);

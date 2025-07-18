// src/api/microwaveService.js
import { supabase } from './supabaseClient';

export const fetchMicrowaves = async () => {
    const { data, error } = await supabase.from('microwaves').select('*');
    if (error) throw error;
    return data;
};

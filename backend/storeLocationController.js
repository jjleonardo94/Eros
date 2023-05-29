const { supabase } = require('../utils/supabaseClient')


async function getStoreLocations() {
    const { data, error } = await supabase.from('storeLocation').select();
    return data;
}

async function getPlants() {
    const { data, error } = await supabase.from('plant').select();
    return data;
}

async function getMaterialCodes() {
    const { data, error } = await supabase.from('materialCode').select();
    return data;
}

async function getDrivers() {
    const { data, error } = await supabase.from('driver').select();
    return data;
}

async function getUserByEmail(email){
    const { data, error } = await supabase.from('user').select().eq('userName', email);
   if(data){
    return data[0];
   }
   
}

module.exports = {
    getStoreLocations,
    getPlants,
    getMaterialCodes,
    getDrivers,
    getUserByEmail
}

//getStoreLocations();


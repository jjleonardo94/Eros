import config from "./config.util";
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = config.env.SUPABASE_CLIENT_URL;
const supabaseAnonKey = config.env.SUPABASE_CLIENT_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = {
  supabase,
};

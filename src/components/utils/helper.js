
// data parser
export const parseData = (data) => {
  return JSON?.parse(data);
};

// supabase config keys
export const supabaseUrl = "https://kcahqydrmeduuxuzssha.supabase.co";
export const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjYWhxeWRybWVkdXV4dXpzc2hhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMzMTM4MzcsImV4cCI6MjAxODg4OTgzN30._-N0kiG7I1kVtGzOIeE_3uOMixv5M6DBkAFtz_6QZes";
export const supabaseJwtKey =
  "kXnVPMNf6ehFc/Hn7MZxkJdFuhGwfLh+n+BMKprCRN0Ll9Vs+EcUX/7CeZlEM51DpR3jmWxDOV80TGNoCWCUXA==";

  // check if value is object
  export const isObject = (value) => {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
  


import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://xayukmxdnsfwqcdklwal.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhheXVrbXhkbnNmd3FjZGtsd2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMTg1MzUsImV4cCI6MjA2OTY5NDUzNX0.lMkWYtLZoKfKbaVMJZK5BUrnCDvhDfMjft5Iof_Gg6M";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

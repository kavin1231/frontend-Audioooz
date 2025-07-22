import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://unlrjpvwapckhljhjvdt.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVubHJqcHZ3YXBja2hsamhqdmR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwOTQxNTAsImV4cCI6MjA2ODY3MDE1MH0.ntyBNTw4XYyuXiLcoXd-FRkAxzup2Azohqtl2AT3K8k";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function mediaUpload(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
    }

    const timestamp = new Date().getTime();
    const fileName = timestamp + file.name;

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
          .data.publicUrl;
        resolve(publicUrl);
      })
      .catch(() => {
        reject("Error uploading file");
      });
  });
}

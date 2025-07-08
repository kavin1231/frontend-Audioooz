import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://prsfajotobvhhdmrnxoe.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByc2Zham90b2J2aGhkbXJueG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MDE4MDcsImV4cCI6MjA2NzI3NzgwN30.uGcteb6lF-I8y2dCsMAW5hkOiGNt-FWCK-77NKe5gyQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function mediaUpload(file) {
	return new Promise((resolve, reject) => {
        if(file == null){
            reject("No file selected")
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
			}).catch(()=>{
                reject("Error uploading file")
            })
	});
}
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bahndpmkfvqvhgsucmnq.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhaG5kcG1rZnZxdmhnc3VjbW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5NTYxNTUsImV4cCI6MjA2NzUzMjE1NX0.mTcfsEDnUIokVI7l1a4zK64vApYHwI9rq_Fra9KGo38";

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
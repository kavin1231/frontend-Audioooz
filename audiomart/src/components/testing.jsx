import { useState } from "react";

export default function Testing() {
const [count,setCount]= useState(0)
const [name,setName]=useState("Coconut")

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">Testing Page</h1>
            <p className="text-lg text-gray-700">This is a placeholder for testing purposes.</p>
            <p className="text-sm text-gray-500 mt-2">You can add your testing components here.</p>
            <button
                onClick={() => {const newCount = count +1
                setCount(newCount)}}
                className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                >Count</button>
                <h1>{count}</h1>
        </div>
    );
}
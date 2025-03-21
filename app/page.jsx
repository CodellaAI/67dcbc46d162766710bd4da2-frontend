
"use client";

import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleButtonClick = async () => {
    setLoading(true);
    setStatus('Sending request...');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/log-click`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(`Success! Entry created with ID: ${data.id}`);
      } else {
        setStatus(`Error: ${data.message}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <main className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Simple Click Logger</h1>
        
        <div className="flex flex-col items-center">
          <button
            onClick={handleButtonClick}
            disabled={loading}
            className={`px-6 py-3 rounded-lg text-white font-semibold
              ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}
              transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300`}
          >
            {loading ? 'Processing...' : 'Log Click to Database'}
          </button>
          
          {status && (
            <div className={`mt-6 p-4 rounded-md w-full max-w-md text-center
              ${status.includes('Success') ? 'bg-green-100 text-green-800' : 
                status.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
              {status}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

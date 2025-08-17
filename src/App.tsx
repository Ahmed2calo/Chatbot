import React from 'react';
import Chatbot from './Chatbot'; // Import the Chatbot component

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gradient-to-r from-indigo-500 to-pink-500 p-6 text-center text-white">
          <h1 className="text-3xl font-semibold">Chatbot Assistant</h1>
        </header>
        <main className="p-6">
          <Chatbot />
        </main>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';

export const Conversation = ({ index, title, editTitle, deleteConversation }: any) => {
  const [newTitle, setNewTitle] = useState(title);

  const handleTitleChange = () => {
    editTitle(index, newTitle);
  };

  return (
    <div className="flex justify-between items-center">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="border p-2 rounded w-1/2"
      />
      <button onClick={handleTitleChange} className="bg-blue-500 text-white p-2 rounded">Save</button>
      <button onClick={() => deleteConversation(index)} className="bg-red-500 text-white p-2 rounded">Delete</button>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Conversation } from './Conversation';

const ConversationList = () => {
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    const storedConversations = JSON.parse(localStorage.getItem('conversations') || '[]');
    setConversations(storedConversations);
  }, []);

  const addConversation = (title: string) => {
    const newConversations = [...conversations, { title }];
    setConversations(newConversations);
    localStorage.setItem('conversations', JSON.stringify(newConversations));
  };

  const editConversationTitle = (index: number, newTitle: string) => {
    const updatedConversations = [...conversations];
    updatedConversations[index].title = newTitle;
    setConversations(updatedConversations);
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));
  };

  const deleteConversation = (index: number) => {
    const updatedConversations = conversations.filter((_, i) => i !== index);
    setConversations(updatedConversations);
    localStorage.setItem('conversations', JSON.stringify(updatedConversations));
  };

  return (
    <div className="space-y-2">
      <button onClick={() => addConversation('New Conversation')} className="bg-green-500 text-white p-2 rounded">Add Conversation</button>
      {conversations.map((conv, index) => (
        <Conversation
          key={index}
          index={index}
          title={conv.title}
          editTitle={editConversationTitle}
          deleteConversation={deleteConversation}
        />
      ))}
    </div>
  );
};

export default ConversationList;

export const getChatbotResponse = async (question: string) => {
  try {
    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',  // Updated endpoint
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-...Nk8A`,  // Replace with your actual API key
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',  // GPT-3.5 or GPT-4 models work here
          messages: [
            { role: 'user', content: question }
          ],
        }),
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();  // Corrected response format

  } catch (error) {
    console.error('Error fetching response from chatbot:', error);
    return 'Sorry, I couldn’t fetch a response at the moment.';
  }
};

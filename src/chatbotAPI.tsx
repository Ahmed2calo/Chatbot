// src/ChatbotAPI.ts
import axios from 'axios';

// Vite uses import.meta.env instead of process.env
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const getChatbotResponse = async (question: string): Promise<string> => {
  // Debug: Check if API key is available
  console.log('API Key available:', !!API_KEY);
  
  if (!API_KEY) {
    console.error('OpenAI API key is missing. Check your .env file');
    return '❌ API key not configured. Please check environment settings.';
  }

  try {
    // Validate question
    if (!question || question.trim().length === 0) {
      return 'Please provide a valid question.';
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question.trim() }],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        timeout: 10000,
        withCredentials: false,
      }
    );

    const responseText = response.data.choices?.[0]?.message?.content?.trim();
    
    if (!responseText) {
      console.warn('Empty response from OpenAI:', response.data);
      return 'I received an empty response. Please try again.';
    }

    return responseText;

  } catch (error: any) {
    console.error('OpenAI API Error:', error);

    if (error.response) {
      switch (error.response.status) {
        case 401:
          return '❌ Authentication failed. Please check your API key.';
        case 429:
          return '❌ Rate limit exceeded. Please try again in a moment.';
        case 403:
          return '❌ Access forbidden. Please check your API permissions.';
        default:
          return `❌ API error (${error.response.status}). Please try again.`;
      }
    } else if (error.request) {
      return '❌ Network error. Please check your connection.';
    } else if (error.code === 'ECONNABORTED') {
      return '❌ Request timeout. Please try again.';
    } else {
      return '❌ Sorry, I encountered an unexpected error.';
    }
  }
};

// Utility function to verify API connectivity
export const verifyApiConnection = async (): Promise<boolean> => {
  try {
    if (!API_KEY) {
      console.error('API key not found');
      return false;
    }

    const response = await axios.get('https://api.openai.com/v1/models', {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      timeout: 5000,
    });

    return response.status === 200;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
};

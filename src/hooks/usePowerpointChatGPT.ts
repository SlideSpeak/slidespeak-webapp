import { useState } from 'react';
import { streamQuestion } from '@/services/aiService';
import { decodeStreamToJson } from '@/utils/decode';
import crypto from 'crypto';

export type ChatHistory = Record<
  string,
  {
    sender: 'user' | 'bot';
    message: string;
  }
>;

export const usePowerpointChatGPT = (
  appendMessageToChatHistory: (
    message: ChatHistory[number],
    id?: string,
  ) => void,
  documentId: string,
) => {
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = async (inputValue: string) => {
    if (inputValue.trim() === '' || isLoading) return;
    setIsLoading(true);

    await streamAIAnswer(inputValue);
  };

  const streamAIAnswer = async (inputValue: string) => {
    const id = crypto.randomBytes(20).toString('hex');
    const response = await streamQuestion(inputValue, documentId);

    if (response) {
      for await (const decodedMessage of decodeStreamToJson(response)) {
        appendMessageToChatHistory(
          { message: decodedMessage, sender: 'bot' },
          id,
        );
      }
    } else {
      appendMessageToChatHistory(
        { message: 'No response from AI', sender: 'bot' },
        id,
      );
    }

    setIsLoading(false);
  };

  return { isLoading, askQuestion };
};

'use client';

import { FC, FormEvent, useEffect, useState } from 'react';
import SendIcon from '@/icons/SendIcon';
import LoadingBubbles from '@/components/LoadingBubbles';
import { streamQuestion } from '@/services/aiService';
import { decodeStreamToJson } from '@/utils/decode';
import crypto from 'crypto';
import { Inter } from 'next/font/google';
import classNames from 'classnames';
import { usePowerpointChatGPT } from '@/hooks/usePowerpointChatGPT';
import useChatStream from '@magicul/react-chat-stream';

const font = Inter({ subsets: ['latin'] });

export type ChatHistory = Record<
  string,
  {
    sender: 'user' | 'bot';
    message: string;
  }
>;

type ChatDialogInputProps = {
  onMessagesChange: (
    messages: ReturnType<typeof useChatStream>['messages'],
  ) => void;
  selectedDocumentId?: string;
};

const ChatDialogInput: FC<ChatDialogInputProps> = ({
  selectedDocumentId,
  onMessagesChange,
}) => {
  const { input, messages, isLoading, handleSubmit, handleInputChange } =
    useChatStream({
      options: {
        url: `${process.env.NEXT_PUBLIC_API_URL}/stream`,
        method: 'GET',
        query: {
          uuid: selectedDocumentId ?? '',
        },
      },
      method: {
        type: 'query',
        key: 'text',
      },
    });

  useEffect(() => {
    onMessagesChange(messages);
  }, [messages, onMessagesChange]);

  const inputIsEmpty = input.trim() === '';

  if (!selectedDocumentId) {
    return (
      <p className="text-sm text-gray-500 mb-2">
        To start a conversation you first need to upload a document.
      </p>
    );
  }

  return (
    <form
      className={classNames('w-full relative', font.className)}
      onSubmit={(e) => {
        if (inputIsEmpty) return;
        handleSubmit(e);
      }}
    >
      <input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        className="w-full rounded-md border border-gray-200 p-2 text-sm text-gray-900 transition-all outline-none focus:border-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
        type="text"
        placeholder="Ask me anything..."
      />
      <div className="absolute right-3 top-[50%] translate-y-[-50%] h-full flex flex-row justify-center items-center">
        {isLoading ? (
          <LoadingBubbles />
        ) : (
          <button
            type="submit"
            disabled={inputIsEmpty}
            className={classNames('cursor-pointer', {
              'cursor-not-allowed opacity-50': inputIsEmpty,
            })}
          >
            <SendIcon />
          </button>
        )}
      </div>
    </form>
  );
};

export default ChatDialogInput;

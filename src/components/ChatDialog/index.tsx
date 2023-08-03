import Heading from '@/components/Heading';
import ChatDialogInput, {
  ChatHistory,
} from '@/components/ChatDialog/ChatDialogInput';
import { FC, useCallback, useEffect, useState } from 'react';
import ChatMessageView from '@/components/ChatDialog/ChatMessage';
import { SlidespeakDocument } from '@/components/Upload';
import crypto from 'crypto';
import useChatStream from '@magicul/react-chat-stream/src/hooks/useChatStream';

type ChatDialogProps = {
  activeDocument?: SlidespeakDocument;
};

const ChatDialog: FC<ChatDialogProps> = ({ activeDocument }) => {
  const [chatHistory, setChatHistory] = useState<
    ReturnType<typeof useChatStream>['messages']
  >([]);

  useEffect(() => {
    setChatHistory([]);
  }, [activeDocument]);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="p-6 pb-0">
        <Heading as="h3" className="mb-4">
          Chat
        </Heading>
        <hr className="mb-4" />
      </div>

      <div className="overflow-y-auto flex flex-col-reverse">
        {chatHistory
          .slice(0)
          .reverse()
          .map(message => (
            <ChatMessageView
              message={message.content}
              sender={message.role}
              key={message.id}
            />
          ))}
      </div>

      <div className="lg:mt-auto mt-10 p-6">
        <ChatDialogInput
          onMessagesChange={setChatHistory}
          selectedDocumentId={activeDocument?.id}
        />
      </div>
    </div>
  );
};

export default ChatDialog;

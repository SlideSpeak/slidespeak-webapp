import { ChatHistory } from '@/components/ChatDialog/ChatDialogInput';
import classNames from 'classnames';
import AiIcon from '@/icons/AiIcon';
import UserIcon from '@/icons/UserIcon';
import { Inter } from 'next/font/google';

const font = Inter({ subsets: ['latin'] });

const ChatMessageView = ({ message, sender }: ChatHistory[number]) => (
  <div
    key={message}
    className={classNames(
      'px-12 py-4 flex gap-4 items-center',
      font.className,
      { 'bg-blue-900/10': sender === 'user' },
    )}
  >
    <div className="self-start w-7 h-7 shrink-0 rounded-full bg-blue-900 grid place-items-center">
      {sender === 'bot' ? <AiIcon /> : <UserIcon />}
    </div>
    <p className="text-sm leading-5 text-gray-800">{message}</p>
  </div>
);

export default ChatMessageView;

'use client';

import Logo from '@/components/Logo';
import Upload, { SlidespeakDocument } from '@/components/Upload';
import ChatIcon from '@/icons/ChatIcon';
import Heading from '@/components/Heading';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [documents, setDocuments] = useLocalStorage<SlidespeakDocument[]>(
    'documents',
    [],
  );

  const router = useRouter();

  useEffect(() => {
    if (documents && documents.length > 0) {
      router.push('/dashboard');
    }
  }, [documents, router]);

  return (
    <main className="flex lg:flex-row flex-col h-screen items-stretch justify-between">
      <div className="p-6 w-full box-border flex flex-col items-center">
        <div className="self-start">
          <Logo />
        </div>
        <div className="flex-grow flex items-center justify-center w-full p-0 pt-10 md:p-10 lg:p-0 lg:max-w-[624px]">
          <Upload documents={documents ?? []} setDocuments={setDocuments} />
        </div>
      </div>
      <div className="bg-canvas-100 flex-grow flex items-center justify-center w-full p-6 lg:max-w-[627px] py-20 lg:py-0">
        <div className="lg:max-w-[467px] flex flex-col">
          <div className="mb-5 flex justify-center w-full">
            <ChatIcon />
          </div>
          <Heading as="h1" className="mb-4">
            Welcome to SlideSpeak
          </Heading>
          <div className="text-gray-800/70">
            <p className="mb-2">
              Upload your <b>PowerPoint</b> file and ask questions about the
              file.
            </p>
            <p className="mb-2">You can ask questions like:</p>
            <ol className="list-disc ml-6">
              <li>What is this document about?</li>
              <li>What is the revenue in year 2020?</li>
              <li>Is there any actions items defined for Chris?</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

'use client';

import Logo from '@/components/Logo';
import DocumentList from '@/components/DocumentList';
import DocumentSlides from '@/components/DocumentSlides';
import { useState } from 'react';
import Upload, { SlidespeakDocument } from '@/components/Upload';
import SmallUpload from '@/components/SmallUpload';
import toast, { Toaster } from 'react-hot-toast';
import useLocalStorage from '@/hooks/useLocalStorage';
import classNames from 'classnames';
import ChatDialog from '../../components/ChatDialog';

const Home = () => {
  const [activeDocument, setActiveDocument] = useState<SlidespeakDocument>();
  const [documents, setDocuments] = useLocalStorage<SlidespeakDocument[]>(
    'documents',
    [],
  );
  const [uploadedFile, setUploadedFile] = useState<File>();

  const documentIsAlreadyAdded = (file: File) =>
    documents?.some(doc => doc.name === file.name && doc.size === file.size);

  return (
    <main className="flex lg:flex-row flex-col h-screen lg:items-stretch lg:justify-between">
      <div className="lg:max-w-[300px] w-full bg-gray-100 p-6 flex flex-col gap-6">
        <Logo />
        <SmallUpload
          onFileUpload={file => {
            if (documentIsAlreadyAdded(file)) {
              toast.error('You cannot upload the same file twice.');
            } else {
              setUploadedFile(file);
            }
          }}
        />
        <DocumentList
          documents={documents ?? []}
          onDocumentSelect={setActiveDocument}
          activeDocument={activeDocument}
        />
      </div>
      {uploadedFile ? (
        <div className="grid w-full place-items-center">
          <div className="max-w-[624px] w-full lg:py-0 py-10">
            <Upload
              file={uploadedFile}
              onFileUploaded={() => {
                setUploadedFile(undefined);
              }}
              documents={documents ?? []}
              setDocuments={setDocuments}
            />
          </div>
        </div>
      ) : (
        <div className="w-full flex items-stretch lg:flex-row flex-col-reverse lg:h-full">
          <div
            className={classNames(
              'lg:w-[50%] h-full max-h-full overflow-y-auto',
              {
                'p-6': !!activeDocument,
              },
            )}
          >
            <DocumentSlides
              activeDocumentId={activeDocument?.id}
              documents={documents}
            />
          </div>
          <div className="lg:w-[50%] bg-gray-100 lg:h-full lg:max-h-full sm:max-h-96">
            <ChatDialog activeDocument={activeDocument} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;

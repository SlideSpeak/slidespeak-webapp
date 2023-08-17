'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import Heading from '@/components/Heading';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '@/icons/UploadIcon';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import PercentageLoader from '../PercentageLoader';

const FILE_LIMIT_MB = 50;

export type SlidespeakDocument = {
  id: string;
  name: string;
  size: number;
  previewUrls?: string[];
};

type UploadProps = {
  file?: File;
  onFileUploaded?: () => void;
  documents: SlidespeakDocument[];
  setDocuments: (documents: SlidespeakDocument[]) => void;
};

const Upload: FC<UploadProps> = ({
  file,
  onFileUploaded,
  documents,
  setDocuments,
}) => {
  const [uploadInProgress, setUploadInProgress] = useState<boolean>(false);
  const [filename, setFilename] = useState<string | null>(null);
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const router = useRouter();

  const addDocumentToLocalStorage = useCallback(
    (document: SlidespeakDocument) => {
      if (documents?.find(doc => doc.name === document.name)) return;
      setDocuments([...(documents ?? []), document]);
      router.replace('/dashboard');
      toast.success('File uploaded successfully.');
    },
    [documents, router, setDocuments],
  );

  const onDrop = useCallback(
    async (files: File[]) => {
      const file = files[0];

      if (file.size > FILE_LIMIT_MB * 1024 * 1024) {
        toast.error('The presentation you are trying to upload is too big.');
        return;
      }

      setFilename(file.name);
      setUploadInProgress(true);

      const result = await uploadFile(file);

      const document = {
        id: result.uuid,
        name: file.name,
        size: file.size,
        previewUrls: result.previewUrls || [],
      };

      addDocumentToLocalStorage(document);
      setUploadInProgress(false);
      setUploadPercentage(0);
      onFileUploaded?.();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addDocumentToLocalStorage, onFileUploaded],
  );

  useEffect(() => {
    if (file && !uploadInProgress) {
      onDrop([file]);
    }
  }, [file, onDrop, uploadInProgress]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        ['.pptx'],
    },
    maxFiles: 1,
  });

  const uploadFile = async (file: File) => {
    setFilename(file.name);
    setUploadInProgress(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/uploadFile`,
        formData,
        {
          onUploadProgress: progressEvent => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total!,
            );
            setUploadPercentage(percentCompleted);
          },
        },
      );
      return response.data;
    } catch (error) {
      toast.error('Something went wrong uploading your file.');
      onFileUploaded?.();
    }
  };

  return (
    <div className="w-full lg:px-12">
      <div className="mb-8">
        {uploadInProgress ? (
          <Heading as="h2" className="text-center mb-3">
            {uploadPercentage !== 100
              ? 'Uploading your file...'
              : 'Analyzing your file...'}
          </Heading>
        ) : (
          <>
            <Heading as="h2" className="text-center mb-3">
              Upload your PowerPoint file
            </Heading>
            <p className="text-text-primary font-normal text-lg text-center opacity-70">
              Supported file type: .pptx
            </p>
          </>
        )}
      </div>

      <div
        className="flex flex-col items-center py-16 md:py-24 lg:py-36 rounded-xl border-2 border-dashed border-border-primary cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {uploadInProgress ? (
          <div className="flex flex-col gap-3 items-center max-w-full">
            {uploadPercentage !== 100 ? (
              <PercentageLoader percentage={uploadPercentage} />
            ) : (
              <LoadingSpinner />
            )}
            <span className="text-sm text-gray-500 px-4 truncate whitespace-nowrap max-w-full">
              {filename}
            </span>
          </div>
        ) : (
          <>
            <UploadIcon />
            <div className="flex mt-6 flex-col items-center">
              <span className="text-blue-700 text-sm font-semibold">
                {isDragActive
                  ? 'Drop the files here...'
                  : 'Drag your file here'}
              </span>
              {!isDragActive && (
                <span className="text-sm underline text-gray-500">
                  or browse
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;

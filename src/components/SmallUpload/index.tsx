'use client';

import { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '@/icons/UploadIcon';

type SmallUploadProps = { onFileUpload: (file: File) => void };

const SmallUpload: FC<SmallUploadProps> = ({ onFileUpload }) => {
  const onDrop = useCallback(
    async (files: File[]) => {
      onFileUpload(files[0]);
    },
    [onFileUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        ['.pptx'],
    },
    maxFiles: 1,
  });

  return (
    <div
      className="w-full max-h-36 flex flex-col items-center bg-white p-4 rounded-lg border cursor-pointer"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <UploadIcon />
      <div className="flex mt-2 flex-col items-center">
        <span className="text-blue-700 text-sm font-semibold">
          {isDragActive ? 'Drop the files here...' : 'Drag your file here'}
        </span>
        {!isDragActive && (
          <span className="text-xs underline text-gray-500">
            or upload from your device
          </span>
        )}
      </div>
    </div>
  );
};

export default SmallUpload;

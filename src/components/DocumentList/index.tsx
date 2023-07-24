'use client';

import { SlidespeakDocument } from '@/components/Upload';
import { FC, useEffect, useState } from 'react';
import FileIcon from '@/icons/FileIcon';
import classNames from 'classnames';
import ChevronDownIcon from '@/icons/ChevronDownIcon';

type DocumentListProps = {
  onDocumentSelect: (document: SlidespeakDocument) => void;
  documents: SlidespeakDocument[];
  activeDocument?: SlidespeakDocument;
};

const DocumentList: FC<DocumentListProps> = ({
  onDocumentSelect,
  documents,
  activeDocument,
}) => {
  const [documentsToggleOpen, setDocumentsToggleOpen] = useState<boolean>(true);

  useEffect(() => {
    if (!documents || documents?.length === 0) return;
    onDocumentSelect(documents[0]);
  }, [documents, onDocumentSelect]);

  return (
    <div>
      <div
        role="button"
        className="flex justify-between"
        onClick={() => setDocumentsToggleOpen(open => !open)}
      >
        <p className="text-sm text-gray-700 font-medium mb-2">Documents</p>
        <div
          className={classNames(
            'lg:hidden visible align-bottom transition-transform duration-200 grid place-items-center',
            {
              'rotate-180': !documentsToggleOpen,
            },
          )}
        >
          <ChevronDownIcon />
        </div>
      </div>
      <div
        className={classNames('flex flex-col gap-1 sm:block', {
          hidden: !documentsToggleOpen,
        })}
      >
        {documents?.length === 0 && (
          <p className="text-sm text-gray-500 mb-2">
            It looks like you haven't added any documents yet.
          </p>
        )}
        {documents?.map(document => (
          <div
            role="button"
            key={document.id}
            className={classNames(
              'flex items-center gap-3 px-4 py-2 rounded-md w-full transition-all hover:bg-white cursor-pointer',
              { 'bg-white': activeDocument?.id === document.id },
            )}
            onClick={() => onDocumentSelect(document)}
          >
            <div className="min-w-1">
              <FileIcon />
            </div>
            <span className="text-gray-700 font-semibold text-ellipsis overflow-hidden truncate">
              {document.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;

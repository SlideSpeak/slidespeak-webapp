'use client';

import { FC } from 'react';
import { SlidespeakDocument } from '@/components/Upload';
import Heading from '@/components/Heading';

type DocumentSlidesProps = {
  activeDocumentId?: string;
  documents?: SlidespeakDocument[];
};

const DocumentSlides: FC<DocumentSlidesProps> = ({
  activeDocumentId,
  documents,
}) => {
  const activeDocument = documents?.find(doc => doc.id === activeDocumentId);

  // This means we are loading the content from the local storage.
  if (documents === undefined) return null;

  if (!activeDocument) return 'The document could not be found.';

  return (
    <div>
      <Heading as="h3" className="mb-4">
        {activeDocument.name}
      </Heading>
      <hr className="mb-4" />
      {activeDocument.previewUrls?.map(previewUrl => (
        <img
          key={previewUrl}
          className="rounded border mb-3"
          src={previewUrl}
          alt={activeDocument.name}
        />
      ))}
    </div>
  );
};

export default DocumentSlides;

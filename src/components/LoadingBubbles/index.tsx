import React from 'react';

const LoadingBubbles = () => (
  <div className="flex space-x-1 h-2">
    <div className="w-1.5 h-1.5 bg-blue-900 rounded-full animate-bounce200" />
    <div className="w-1.5 h-1.5 bg-blue-900 rounded-full animate-bounce400" />
    <div className="w-1.5 h-1.5 bg-blue-900 rounded-full animate-bounce600" />
  </div>
);

export default LoadingBubbles;

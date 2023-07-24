import React, { FC } from 'react';
import PropTypes from 'prop-types';

type LoaderProps = {
  percentage: number;
};

const PercentageLoader: FC<LoaderProps> = ({ percentage }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="w-20 h-20 text-blue-500" viewBox="0 0 100 100">
      <circle
        className="opacity-25"
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="currentColor"
        strokeWidth="5"
        transform="rotate(-90 50 50)"
      />
      <circle
        className="opacity-75 stroke-current transition-all duration-1000 ease-linear"
        cx="50"
        cy="50"
        r={radius}
        fill="transparent"
        stroke="currentColor"
        strokeWidth="5"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dy=".3em"
        className="text-gray-800"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default PercentageLoader;

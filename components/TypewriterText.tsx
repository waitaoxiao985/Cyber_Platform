'use client';

import React, { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 100, 
  className = '' 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 简单直接显示文本，不使用动画效果
  return (
    <span className={className}>
      {text}
    </span>
  );
};

export default TypewriterText;
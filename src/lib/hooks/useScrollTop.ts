import React, { useCallback, useEffect, useState } from 'react';

export default function useScrollTop(element?: HTMLElement) {
  const [scrollTop, setScrollTop] = useState(0);

  const scrollEvent = useCallback(() => {
    const targetElement = !element ? document.getElementsByTagName('main')[0] : element;
    if (targetElement) {
      setScrollTop(targetElement.scrollTop);
    }
  }, [setScrollTop]);

  useEffect(() => {
    const mainTag = document.getElementsByTagName('main');

    mainTag[0].addEventListener('scroll', scrollEvent);

    return () => {
      mainTag[0].removeEventListener('scroll', scrollEvent);
    };
  }, [scrollEvent]);

  return scrollTop;
}

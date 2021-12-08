import { useCallback, useEffect, useState } from 'react';

export default function useScrollTop(
  element: HTMLElement = document.getElementsByTagName('main')[0],
) {
  const [scrollTop, setScrollTop] = useState(0);

  const scrollEvent = useCallback(() => {
    if (element) {
      setScrollTop(element.scrollTop);
    }
  }, [setScrollTop, element]);

  useEffect(() => {
    element.addEventListener('scroll', scrollEvent);

    return () => {
      element.removeEventListener('scroll', scrollEvent);
    };
  }, [element, scrollEvent]);

  return scrollTop;
}

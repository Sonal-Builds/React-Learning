import React, { useEffect } from 'react';

function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function (...args: any[]) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export default function ThrottledScroll() {
  useEffect(() => {
    const handleScroll = throttle(() => {
      console.log('Scroll position:', window.scrollY);
    }, 500);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ height: '150vh', padding: '20px' }}>
      <h1>Scroll down to see throttling in action</h1>
    </div>
  );
}

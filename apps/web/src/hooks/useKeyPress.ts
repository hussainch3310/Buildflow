import { useState, useEffect } from 'react';

export function useKeyPress(targetKey: string, metaKey: boolean = false): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
      if (e.key === targetKey && (!metaKey || (metaKey && (e.metaKey || e.ctrlKey)))) {
        e.preventDefault();
        setKeyPressed(true);
      }
    };

    const upHandler = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey, metaKey]);

  return keyPressed;
}

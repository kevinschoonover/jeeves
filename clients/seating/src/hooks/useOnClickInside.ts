import { useEffect } from 'react';

export default function useOnClickInside(
  ref: any,
  handler: (event: Event) => void
) {
  useEffect(() => {
    const listener = (event: Event) => {
      // Trigger the handler when the target was the node itself and not a child, ancestor, or sibling
      if (ref && ref.contains(event.target) && ref === event.target) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

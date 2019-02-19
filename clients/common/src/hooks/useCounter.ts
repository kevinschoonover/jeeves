import { useState } from 'react';

export function useCounter({
  initialValue = 0,
  step = 0,
}: {
  initialValue: number;
  step: number;
}) {
  const [count, setCount] = useState(initialValue);

  function increment() {
    setCount((prevCount) => prevCount + step);
  }

  function decrement() {
    setCount((prevCount) => prevCount - step);
  }

  return {
    count,
    increment,
    decrement,
  };
}

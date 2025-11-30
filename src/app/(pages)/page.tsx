"use client";
import { useCount, useDecrement, useIncrement } from "src/store/useCounterStore";

export default function Home() {
  const count = useCount();

  return (
    <div>
      <h1>Count: {count}</h1>
      <div>
        <button onClick={useIncrement()}>Increment</button>
        <button onClick={useDecrement()}>Decrement</button>
      </div>
    </div>
  );
}

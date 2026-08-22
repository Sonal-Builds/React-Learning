import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!intervalRef.current) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const stop = () => {
    if (intervalRef.current) {
      // Increment once more before stopping
      setTime((prev) => prev + 1);

      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsRunning(false);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Stopwatch</h1>
      <h2>{formatTime(time)}</h2>
      <button onClick={start} style={{ margin: "5px" }}>Start</button>
      <button onClick={stop} style={{ margin: "5px" }}>Stop</button>
      <button onClick={reset} style={{ margin: "5px" }}>Reset</button>
    </div>
  );
}

export default Stopwatch;

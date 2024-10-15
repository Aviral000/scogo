import React, { useEffect, useRef, useState } from 'react'

export default function Timer() {
const [timeInSeconds, setTimeInSeconds] = useState(120);
const [isRunning, setIsRunning] = useState(false);
const [lastInputTime, setLastInputTime] = useState(120);
const [inputSeconds, setInputSeconds] = useState(120);
const timerRef = useRef(null);

useEffect(() => {
    if(timeInSeconds === 0) {
        clearInterval(timerRef.current);
        setIsRunning(false);
    }
}, [timeInSeconds]);

const startTimer = () => {
    if(!isRunning) {
        setIsRunning(true);
        timerRef.current = setInterval(() => {
            setTimeInSeconds(prev => Math.max(prev - 1, 0));
        }, 1000)
    }
}

const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
}

const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeInSeconds(lastInputTime);
}

// normalise the 6 digit pattern
// where each pair is being compared with hours mins seconds
// i need to check for every pair from left to right hr to sec
// and i need to get the final or reduce value in sec
// 01 12 21 -> 0
// seconds hours + seconds mins + seconds

const formatTime = (seconds) => {
    // const hrs = Math.floor(seconds / 3600)
    // const mins = Math.floor((seconds % 3600) / 60)
    // const secs = (seconds % 60)

    // value = parameter

    // 6 digit -> first 2 digit / 60 -> 1 + middle 2 digit / 60 -> 1 + last 2 digit
}

const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setInputSeconds(value);
    setTimeInSeconds(value);
    setLastInputTime(value);

}

const hours = Math.floor(timeInSeconds/3600);
const minutes = Math.floor((timeInSeconds % 3600) / 60);
const seconds = timeInSeconds % 60;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: "2rem", marginTop: '2rem' }}>
      <div>
        <label style={{ backgroundColor: '#7e5700', color: 'white', marginRight: '1rem', padding: '1rem', borderRadius: '40%' }}>Total Seconds: </label>
        <input type='number' value={inputSeconds} onChange={handleInputChange} style={{ direction: 'rtl',  borderRadius: '10px', height: '2rem'}} />
      </div>

      <div style={{ fontSize: '1.5rem' }}>
        {String(hours).padStart(2, '0')} : {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "2rem"}}>
        <button onClick={isRunning ? pauseTimer : startTimer} style={{ padding: '1.2rem 2rem', border: '1px solid black', margin: '0', backgroundColor: '#7e5700', color: 'white' }}>{isRunning ? 'Pause' : 'Play'}</button>
        <button onClick={resetTimer} style={{ padding: '1.2rem 2rem', border: '1px solid black', margin: '0', backgroundColor: '#7e5700', color: 'white' }}>RESET</button>
      </div>
    </div>
  )
}

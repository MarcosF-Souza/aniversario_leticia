import { useEffect, useState } from 'react';
import { dates } from '../lib/content';
import './DaysCounter.css';

function daysSince(dateStr) {
  const start = new Date(`${dateStr}T00:00:00`);
  const now = new Date();
  const diff = now.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export default function DaysCounter() {
  const [days, setDays] = useState(() => daysSince(dates.nosConhecemos));

  useEffect(() => {
    // Recalcula à meia-noite e depois uma vez por dia — não precisa de mais que isso.
    const msUntilMidnight =
      new Date().setHours(24, 0, 5, 0) - Date.now();
    const timeout = setTimeout(() => {
      setDays(daysSince(dates.nosConhecemos));
      const interval = setInterval(
        () => setDays(daysSince(dates.nosConhecemos)),
        24 * 60 * 60 * 1000
      );
      return () => clearInterval(interval);
    }, msUntilMidnight);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="days-counter">
      <span className="days-counter__number">{days}</span>
      <span className="days-counter__label">
        {days === 1 ? 'dia desde que nos conhecemos' : 'dias desde que nos conhecemos'}
      </span>
    </div>
  );
}

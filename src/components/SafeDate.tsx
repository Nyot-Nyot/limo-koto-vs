'use client';

import { useEffect, useState } from 'react';

interface SafeDateProps {
  date?: Date | string;
  fallback?: string;
  className?: string;
}

/**
 * Komponen untuk menampilkan tanggal yang safe untuk hydration
 */
export default function SafeDate({ 
  date = new Date(), 
  fallback = '—', 
  className = '' 
}: SafeDateProps) {
  const [mounted, setMounted] = useState(false);
  const [formattedDate, setFormattedDate] = useState<string>(fallback);

  useEffect(() => {
    setMounted(true);
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (!isNaN(dateObj.getTime())) {
        setFormattedDate(dateObj.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }));
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      setFormattedDate('Tanggal tidak valid');
    }
  }, [date]);

  return <span className={className}>{formattedDate}</span>;
}

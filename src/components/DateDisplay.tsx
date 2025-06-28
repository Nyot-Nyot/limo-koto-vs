'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface DateDisplayProps {
  date: string | Date;
  formatString?: string;
  className?: string;
}

export default function DateDisplay({ 
  date, 
  formatString = 'dd MMMM yyyy', 
  className = '' 
}: DateDisplayProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const dateObj = new Date(date);
      if (!isNaN(dateObj.getTime())) {
        setFormattedDate(format(dateObj, formatString, { locale: id }));
      } else {
        setFormattedDate('Tanggal tidak valid');
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      setFormattedDate('Tanggal tidak valid');
    }
  }, [date, formatString]);

  // Render placeholder selama hydration untuk menghindari mismatch
  if (!mounted) {
    return <span className={className}>—</span>;
  }

  return <span className={className}>{formattedDate}</span>;
}

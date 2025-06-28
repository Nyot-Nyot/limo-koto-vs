import { useEffect, useState } from 'react';

/**
 * Hook untuk menangani hydration mismatch warning di development
 * Gunakan dengan hati-hati dan hanya untuk kasus yang sudah dipastikan aman
 */
export function useSuppressHydrationWarning() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const originalError = console.error;
      console.error = (...args) => {
        if (
          typeof args[0] === 'string' &&
          args[0].includes('hydration')
        ) {
          return;
        }
        originalError.apply(console, args);
      };

      return () => {
        console.error = originalError;
      };
    }
  }, []);
}

/**
 * Utility untuk memformat tanggal dengan safe fallback
 */
export function formatDateSafe(
  date: string | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!date) return 'Tanggal tidak tersedia';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
      return 'Tanggal tidak valid';
    }
    
    return dateObj.toLocaleDateString('id-ID', options || {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Tanggal tidak valid';
  }
}

/**
 * Utility untuk mengecek apakah kita sedang di client side
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Hook untuk mengdeteksi hydration completion
 */
export function useHydrationSafe() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

/**
 * Hook untuk mendeteksi apakah komponen sudah dimount di client
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Hook untuk mendeteksi apakah komponen sudah mounted (hydrated)
 */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

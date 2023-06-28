'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <label className="fixed bottom-4 right-4 z-30 inline-flex cursor-pointer items-center rounded-full p-2 hover:bg-gray-400 hover:text-white dark:hover:bg-gray-100 dark:hover:text-black">
      <input
        type="checkbox"
        checked={!!theme && theme === 'light'}
        className="peer sr-only"
        onChange={() => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }}
      />

      {theme === 'light' ? (
        <MoonIcon className="h-6 w-6" />
      ) : (
        <SunIcon className="h-6 w-6" />
      )}
    </label>
  );
}

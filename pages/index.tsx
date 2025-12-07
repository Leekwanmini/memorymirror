import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/questions');
  };

  return (
    <div 
      onClick={handleClick}
      className="min-h-screen flex items-center justify-center bg-neutral-50 cursor-pointer transition-all duration-700"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
      `}</style>

      <div className="text-center px-4">
        <h1 
          className="text-6xl md:text-8xl font-light text-neutral-800 mb-6 transition-all duration-700"
          style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
        >
          Who are you?
        </h1>
        <p className="text-neutral-400 text-xs uppercase tracking-widest">
          Touch anywhere to continue
        </p>
      </div>
    </div>
  );
}
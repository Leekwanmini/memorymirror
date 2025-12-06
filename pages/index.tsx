import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [showClick, setShowClick] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (!showClick) {
      setShowClick(true);
    } else {
      router.push('/questions');
    }
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
          className="text-6xl md:text-8xl font-light text-neutral-800 mb-8 transition-all duration-700"
          style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
        >
          {showClick ? 'Click anywhere to begin' : 'Who are you?'}
        </h1>
        {!showClick && (
          <div className="w-16 h-px bg-neutral-300 mx-auto animate-pulse"></div>
        )}
      </div>
    </div>
  );
}
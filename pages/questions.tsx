import { useState } from 'react';
import { useRouter } from 'next/router';

interface FormData {
  name: string;
  age: string;
  nationality: string;
  location: string;
  siblings: string;
  school: string;
  moved: string;
  movedWhere: string;
  childhood: string;
  goodAtChild: string;
  goodAtNow: string;
  bestFriend: string;
  firstLove: string;
  partnerLookFor: string;
  favoriteMemory: string;
  favoriteTVSeries: string;
  hobby: string;
  cafeOrder: string;
  feltAlone: string;
  personDislike: string;
  personHurt: string;
  forgive: string;
  religion: string;
}

const questions = [
  { key: 'name', question: 'What is your name?', type: 'text', required: true, placeholder: 'e.g., Sarah Johnson' },
  { key: 'age', question: 'How old are you?', type: 'text', required: false, placeholder: 'e.g., 21' },
  { key: 'nationality', question: 'What is your nationality?', type: 'text', required: false, placeholder: 'e.g., Canadian' },
  { key: 'location', question: 'Which city do you live in?', type: 'text', required: false, placeholder: 'e.g., Toronto' },
  { key: 'siblings', question: 'How many siblings do you have?', type: 'text', required: false, placeholder: 'e.g., 2 or None' },
  { key: 'religion', question: 'Do you have religion?', type: 'text', required: false, placeholder: 'e.g., Name of Religion or No' },
  { key: 'school', question: 'What is the most recent school you graduated from?', type: 'text', required: false, placeholder: 'e.g., Georgian College' },
  { key: 'moved', question: 'Have you ever moved to a different city or country?', type: 'text', required: false, placeholder: 'Yes or No' },
  { key: 'movedWhere', question: 'Where was/were the place(s) you moved to?', type: 'text', required: false, placeholder: 'e.g., Montreal to Toronto', conditional: true },
  { key: 'childhood', question: 'What was your childhood like?', type: 'textarea', required: false, placeholder: 'e.g., happy and carefree' },
  { key: 'goodAtChild', question: 'What were you good at when you were a child?', type: 'text', required: false, placeholder: 'e.g., drawing' },
  { key: 'goodAtNow', question: 'What are you good at now?', type: 'text', required: false, placeholder: 'e.g., programming' },
  { key: 'bestFriend', question: 'Who is your best friend?', type: 'text', required: false, placeholder: 'e.g., Alex' },
  { key: 'firstLove', question: 'Who was your first love?', type: 'text', required: false, placeholder: 'e.g., Kathy from high school' },
  { key: 'partnerLookFor', question: 'What do you look for in your partner?', type: 'text', required: false, placeholder: 'e.g., kindness and honesty' },
  { key: 'favoriteMemory', question: "What's your favorite memory?", type: 'textarea', required: false, placeholder: 'e.g., The day I graduated from college with my family watching...' },
  { key: 'favoriteTVSeries', question: 'What was your favourite TV series when you were a child?', type: 'text', required: false, placeholder: 'e.g., SpongeBob SquarePants' },
  { key: 'hobby', question: 'What is your hobby recently?', type: 'text', required: false, placeholder: 'e.g., photography' },
  { key: 'cafeOrder', question: 'What is your favourite order when you go to a cafe?', type: 'text', required: false, placeholder: 'e.g., Coldbrew Black' },
  { key: 'feltAlone', question: 'When was the last time you felt alone and why?', type: 'textarea', required: false, placeholder: 'e.g., Every night on my way back home, I miss my real “home”.' },
  { key: 'personDislike', question: "Who was the person you don't like the most?", type: 'text', required: false, placeholder: 'e.g., My old boss' },
  { key: 'personHurt', question: "Who gave you hurt that you can't forget?", type: 'text', required: false, placeholder: 'e.g., A close friend who betrayed me' },
  { key: 'forgive', question: 'Do you think you could forgive them someday?', type: 'text', required: false, placeholder: 'e.g., Maybe, but not yet' }
];

export default function Questions() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    nationality: '',
    location: '',
    siblings: '',
    school: '',
    moved: '',
    movedWhere: '',
    childhood: '',
    goodAtChild: '',
    goodAtNow: '',
    bestFriend: '',
    firstLove: '',
    partnerLookFor: '',
    favoriteMemory: '',
    favoriteTVSeries: '',
    hobby: '',
    cafeOrder: '',
    feltAlone: '',
    personDislike: '',
    personHurt: '',
    forgive: '',
    religion: '',
  });

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    const updatedData = {
      ...formData,
      [currentQuestion.key]: answer.trim(),
    };
    setFormData(updatedData);
    
    if (currentQuestion.key === 'moved') {
      const movedAnswer = answer.trim().toLowerCase();
      // If they said no, skip
      if (movedAnswer === 'no' || movedAnswer === 'n' || movedAnswer === 'none' || movedAnswer === 'never') {
        // Skip next question
        if (currentQuestionIndex < questions.length - 2) {
          setCurrentQuestionIndex(currentQuestionIndex + 2);
          setAnswer('');
          return;
        }
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer('');
    } else {
      localStorage.setItem('memoryMirrorData', JSON.stringify(updatedData));
      router.push('/results');
    }
  };

  const handleSkip = () => {
    // Special handling for moved
    if (currentQuestion.key === 'moved') {
      if (currentQuestionIndex < questions.length - 2) {
        setCurrentQuestionIndex(currentQuestionIndex + 2);
        setAnswer('');
        return;
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer('');
    } else {
      localStorage.setItem('memoryMirrorData', JSON.stringify(formData));
      router.push('/results');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && currentQuestion.type !== 'textarea') {
      e.preventDefault();
      if (answer.trim()) {
        handleNext();
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
      `}</style>

      <div className="max-w-2xl w-full">
        <div className="mb-12">
          <div className="flex justify-between text-neutral-400 text-xs mb-3 uppercase tracking-widest">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-1">
            <div 
              className="bg-neutral-700 h-1 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="text-center mb-16">
          <h1 
            className="text-4xl md:text-5xl font-light text-neutral-800 mb-12 transition-all duration-500"
            style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}
          >
            {currentQuestion.question}
            {currentQuestion.required && <span className="text-neutral-400 text-2xl ml-2">*</span>}
          </h1>

          {currentQuestion.type === 'textarea' ? (
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-6 py-4 text-lg rounded-none bg-white text-neutral-800 placeholder-neutral-400 border border-neutral-300 focus:outline-none focus:border-neutral-600 transition-all"
              style={{ fontFamily: '"Crimson Text", "Georgia", serif' }}
              placeholder={currentQuestion.placeholder}
              rows={4}
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-6 py-4 text-lg rounded-none bg-white text-neutral-800 placeholder-neutral-400 border border-neutral-300 focus:outline-none focus:border-neutral-600 transition-all"
              style={{ fontFamily: '"Crimson Text", "Georgia", serif' }}
              placeholder={currentQuestion.placeholder}
              autoFocus
            />
          )}

          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              onClick={handleNext}
              disabled={currentQuestion.required && !answer.trim()}
              className="bg-neutral-800 text-white font-light text-sm uppercase tracking-widest px-12 py-4 rounded hover:bg-neutral-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Complete' : 'Continue'}
            </button>

            {!currentQuestion.required && (
              <button
                onClick={handleSkip}
                className="text-neutral-400 font-light text-xs uppercase tracking-widest hover:text-neutral-600 transition-all"
              >
                Skip this question
              </button>
            )}
            
            <p className="text-neutral-400 text-xs uppercase tracking-widest">
              Press Enter to continue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
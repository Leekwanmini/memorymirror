import { useEffect, useState, useRef, LegacyRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import React from 'react';


const HTMLFlipBook = dynamic(() => import('react-pageflip'), {
  ssr: false,
});

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

const Page = React.forwardRef(
    (props: { children: React.ReactNode; number?: string }, ref: LegacyRef<HTMLDivElement>) => {
      return (
        <div ref={ref}>
          <div
            className="w-full h-full p-10 overflow-auto"
            style={{
              background: '#FFFEF9',
              fontFamily: '"Crimson Text", "Georgia", serif',
              position: 'relative',
            }}
          >
            {props.children}
            {props.number && (
              <div className="absolute bottom-8 left-0 right-0 text-center text-gray-400 text-sm font-light">
                {props.number}
              </div>
            )}
          </div>
        </div>
      );
    }
);

Page.displayName = 'Page';

export default function Results() {
    const router = useRouter();
    const [data, setData] = useState<FormData | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedData = localStorage.getItem('memoryMirrorData');
        if (storedData) {
        setData(JSON.parse(storedData));
        } else {
        router.push('/');
        }
    }, [router]);

    if (!mounted || !data) {
        return (
        <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 flex items-center justify-center">
            <p className="text-white text-2xl">Loading your story...</p>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-100 flex flex-col items-center justify-center p-4">
        <div className="mb-8 text-center">
            <h1 className="text-5xl font-light text-neutral-800 mb-3" style={{ fontFamily: '"Playfair Display", "Georgia", serif' }}>
            {data.name}
            </h1>
            <p className="text-neutral-500 text-sm uppercase tracking-widest">A Life in Chapters</p>
        </div>

        <div className="book-container">
            {/* @ts-ignore */}
            <HTMLFlipBook
            width={450}
            height={650}
            size="stretch"
            minWidth={315}
            maxWidth={450}
            minHeight={400}
            maxHeight={650}
            maxShadowOpacity={0.3}
            showCover={true}
            mobileScrollSupport={true}
            className="demo-book"
            >
            {/* Cover */}
            <Page>
                <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="border border-neutral-300 p-12">
                    <h1 className="text-6xl font-light text-neutral-800 mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>
                    {data.name}
                    </h1>
                    <div className="w-16 h-px bg-neutral-400 mx-auto mb-6"></div>
                    <p className="text-sm text-neutral-600 uppercase tracking-widest">A Life Remembered</p>
                </div>
                </div>
            </Page>

            {/* Chapter 1 */}
            <Page number="1">
                <div className="h-full flex flex-col">
                <h2 className="text-2xl font-light text-neutral-800 mb-3 tracking-wide" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Chapter I
                </h2>
                <div className="w-12 h-px bg-neutral-300 mb-6"></div>
                <h3 className="text-lg text-neutral-600 mb-8 italic font-light">The Beginning</h3>
                <div className="text-neutral-700 leading-loose space-y-5 text-justify" style={{ fontSize: '15px' }}>
                    <p>
                    This is the story of <span className="font-medium">{data.name}</span>
                    {data.age && `, a ${data.age}-year-old`} soul
                    {data.nationality && ` from ${data.nationality}`}
                    {data.location && `, now living in ${data.location}`}.
                    </p>
                    {data.siblings && (
                    <p>
                        {data.name}{' '}
                        {data.siblings === '0' || data.siblings.toLowerCase().includes('no')
                        ? 'grew up as an only child'
                        : `grew up with ${data.siblings} sibling${data.siblings === '1' ? '' : 's'}`}
                        , shaping who they would become.
                    </p>
                    )}
                </div>
                </div>
            </Page>
            <Page number="3">
            {data.religion && (
                <p>
                    When it comes to faith and religion, {data.name} follows {data.religion}
                </p>
                )}
            </Page>
            {/* Chapter 2 - Page 1 */}
            <Page number="4">
            <div className="h-full flex flex-col">
                <h2 className="text-2xl font-light text-neutral-800 mb-3 tracking-wide" style={{ fontFamily: '"Playfair Display", serif' }}>
                Chapter II
                </h2>
                <div className="w-12 h-px bg-neutral-300 mb-6"></div>
                <h3 className="text-lg text-neutral-600 mb-8 italic font-light">Growing Up</h3>
                <div className="text-neutral-700 leading-loose space-y-5 text-justify" style={{ fontSize: '15px' }}>
                {data.school && (
                    <p>
                    {data.name}'s journey through education took them to {data.school}, a place that
                    would leave its mark on their story.
                    </p>
                )}
                {data.moved && data.moved.toLowerCase() !== 'no' && data.moved.toLowerCase() !== 'n' && data.moved.toLowerCase() !== 'none' && (
                    <p>
                    Along the way, they moved{data.movedWhere ? ` to ${data.movedWhere}` : ''}. Each place became a chapter, each move a transformation.
                    </p>
                )}
                </div>
            </div>
            </Page>

            {/* Chapter 2 - Page 2 */}
            <Page number="5">
            <div className="text-neutral-700 leading-loose space-y-5 text-justify pt-16" style={{ fontSize: '15px' }}>
                {data.childhood && (
                    <p>
                    Their childhood was{' '}
                    {data.childhood.toLowerCase().startsWith('a') ||
                    data.childhood.toLowerCase().startsWith('an')
                        ? ''
                        : 'described as '}
                    {data.childhood}
                    </p>
                )}
                {data.goodAtChild && (
                <p>
                    As a child, {data.name} discovered a talent for {data.goodAtChild}, a skill that
                    brought joy and confidence to their early years.
                </p>
                )}
            </div>
            </Page>

            {/* chapter 2 page 3 */ }   
            <Page number="6">
                <div className="text-neutral-700 leading-loose space-y-5 text-justify pt-16" style={{ fontSize: '15px' }}>             
                    {data.goodAtNow && (
                        <p>
                        Time passed, and now {data.name} has grown skilled at {data.goodAtNow}. The child
                        evolved, but the spark remained.
                    </p>
                    )}
                </div>
            </Page>


            {/* Chapter 3 - Page 1 */}
            <Page number="7">
            <div className="h-full flex flex-col">
                <h2 className="text-2xl font-light text-neutral-800 mb-3 tracking-wide" style={{ fontFamily: '"Playfair Display", serif' }}>
                Chapter III
                </h2>
                <div className="w-12 h-px bg-neutral-300 mb-6"></div>
                <h3 className="text-lg text-neutral-600 mb-8 italic font-light">The People</h3>
                <div className="text-neutral-700 leading-loose space-y-5 text-justify" style={{ fontSize: '15px' }}>
                {data.bestFriend && (
                    <p>
                    In the tapestry of {data.name}'s life, {data.bestFriend} stands out as their
                    closest companion, a friend who knows them deeply.
                    </p>
                )}
                {data.firstLove && (
                    <p>
                    {data.name}'s heart first opened for {data.firstLove}, a person who taught them
                    what it means to feel deeply.
                    </p>
                )}
                </div>
            </div>
            </Page>

            {/* Chapter 3 - Page 2 */}
            <Page number="8">
            <div className="text-neutral-700 leading-loose space-y-5 text-justify" style={{ fontSize: '15px' }}>
                {data.partnerLookFor && (
                <p>
                    When {data.name} thinks about love, they seek {data.partnerLookFor} — qualities
                    that matter most to their heart.
                </p>
                )}
            </div>
            </Page>

            {/* Chapter 4 - Page 1 */}
            <Page number="9">
            <div className="h-full flex flex-col">
                <h2 className="text-2xl font-light text-neutral-800 mb-3 tracking-wide" style={{ fontFamily: '"Playfair Display", serif' }}>
                Chapter IV
                </h2>
                <div className="w-12 h-px bg-neutral-300 mb-6"></div>
                <h3 className="text-lg text-neutral-600 mb-8 italic font-light">The Shadows</h3>
                <div className="text-neutral-700 leading-loose space-y-5 text-justify" style={{ fontSize: '15px' }}>
                <p>
                    But not all of {data.name}'s story is light. Like all lives, theirs contains shadows
                    too.
                </p>
                {data.feltAlone && (
                    <p className="italic border-l-2 border-neutral-300 pl-4 text-neutral-600">
                    "{data.feltAlone}"
                    </p>
                )}
                </div>
            </div>
            </Page>

            {/* Chapter 4 - Page 2 */}
            <Page number="10">
            <div className="text-neutral-700 leading-loose space-y-5 text-justify" style={{ fontSize: '15px' }}>
                {data.feltAlone && (
                <p>
                    This moment of loneliness lingers in their memory, a reminder that even in
                    connection, we sometimes feel alone.
                </p>
                )}
                {data.personDislike && (
                <p>
                    There is someone {data.name} struggles with — {data.personDislike}. Not all
                    relationships bring joy.
                </p>
                )}
                {data.personHurt && (
                <p>
                    {data.personHurt} left a wound that {data.name} still carries. Some hurts don't fade
                    easily.
                </p>
                )}
            </div>
            </Page>

            {/* Chapter 4 - Page 3 */}
            <Page number="11">
            <div className="text-neutral-700 leading-loose space-y-5 text-justify" style={{ fontSize: '15px' }}>
                {data.forgive && (
                <p>
                    Can {data.name} forgive? {data.forgive}. Forgiveness, like memory, is complex and
                    deeply personal.
                </p>
                )}
            </div>
            </Page>

            {/* Chapter 5 - Page 1 */}
            <Page number="12">
                <div className="h-full flex flex-col">
                <h2 className="text-2xl font-light text-neutral-800 mb-3 tracking-wide" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Chapter V
                </h2>
                <div className="w-12 h-px bg-neutral-300 mb-6"></div>
                <h3 className="text-lg text-neutral-600 mb-8 italic font-light">The Moments</h3>
                <div className="text-neutral-700 leading-loose space-y-5 text-justify" style={{ fontSize: '15px' }}>
                    {data.favoriteMemory && (
                    <>
                        <p className="italic border-l-2 border-neutral-300 pl-4 text-neutral-600">
                        "{data.favoriteMemory}"
                        </p>
                        <p>
                        This memory shines brightest in {data.name}'s collection of moments — a treasure
                        they carry always.
                        </p>
                    </>
                    )}
                </div>
                </div>
            </Page>

            {/* Chapter 5 - Page 2 */}
            <Page number="13">
            <div className="text-neutral-700 leading-loose space-y-5 text-justify" style={{ fontSize: '15px' }}>
                {data.favoriteTVSeries && (
                <p>
                    As a child, {data.name} would eagerly watch {data.favoriteTVSeries}, losing
                    themselves in stories on screen.
                </p>
                )}
                {data.hobby && (
                <p>
                    These days, {data.name} finds joy in {data.hobby}, a hobby that brings peace to
                    their present.
                </p>
                )}
                {data.cafeOrder && (
                <p>
                    At cafes, you'll always find {data.name} ordering {data.cafeOrder} — a small ritual,
                    a familiar comfort.
                </p>
                )}
            </div>
            </Page>


            {/* Final Page - Part 1 */}
            <Page number="14">
            <div className="h-full flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-3xl font-light text-neutral-800 mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
                To Be Continued...
                </h2>
                <div className="text-neutral-700 leading-relaxed space-y-5 max-w-sm" style={{ fontSize: '14px' }}>
                <p className="italic">
                    These pages capture who {data.name} is so far. But their story isn't finished.
                </p>
                <p>
                    Every day, you add new memories, new experiences, new chapters. From these collected moments, 
                    your ego evolves, shaping you into the person called {data.name}.
                </p>
                <p className="font-medium">
                    {data.name} is not a fixed being, but a living story, constantly being written.
                </p>
                </div>
            </div>
            </Page>

            {/*Begin Again button */}
            <Page>
            <div className="h-full flex flex-col justify-center items-center">
                <button
                onClick={() => router.push('/')}
                className="bg-neutral-800 text-white font-light px-12 py-4 rounded hover:bg-neutral-700 transition-all text-sm uppercase tracking-widest"
                >
                Begin Again
                </button>
            </div>
            </Page>

            {/* Back Cover */}
            <Page>
                <div className="h-full flex flex-col items-center justify-center bg-neutral-50">
                <p className="text-neutral-400 text-sm uppercase tracking-widest">Memory Mirror</p>
                </div>
            </Page>
            </HTMLFlipBook>
        </div>

        <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
            
            .demo-book {
            box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.15);
            }
            .book-container {
            perspective: 2000px;
            }`}</style>
        </div>
    );
}
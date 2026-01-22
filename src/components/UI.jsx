import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC02069",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

const AnimatedSpadeacePattern = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    // Calculate grid dimensions based on viewport
    const cardWidth = 75;
    const cardHeight = 100;
    const cols = Math.ceil(dimensions.width / cardWidth) + 2;
    const rows = Math.ceil(dimensions.height / cardHeight) + 2;
    const totalCards = cols * rows;

    // Initialize all cards as visible
    const initialVisible = new Set(Array.from({ length: totalCards }, (_, i) => i));
    setVisibleCards(initialVisible);

    const interval = setInterval(() => {
      setVisibleCards((prev) => {
        const newVisible = new Set(prev);
        // Randomly select 20-40% of cards to toggle
        const toggleCount = Math.floor(totalCards * (0.2 + Math.random() * 0.2));
        const cardsToToggle = new Set();
        
        while (cardsToToggle.size < toggleCount) {
          cardsToToggle.add(Math.floor(Math.random() * totalCards));
        }

        cardsToToggle.forEach((index) => {
          if (newVisible.has(index)) {
            newVisible.delete(index);
          } else {
            newVisible.add(index);
          }
        });

        return newVisible;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [dimensions]);

  const cardWidth = 75;
  const cardHeight = 100;
  const cols = dimensions.width > 0 ? Math.ceil(dimensions.width / cardWidth) + 2 : 0;
  const rows = dimensions.height > 0 ? Math.ceil(dimensions.height / cardHeight) + 2 : 0;

  if (rows === 0 || cols === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => {
          const index = row * cols + col;
          const isVisible = visibleCards.has(index);
          return (
            <div
              key={`${row}-${col}`}
              className="absolute transition-opacity duration-500"
              style={{
                left: `${col * cardWidth}px`,
                top: `${row * cardHeight}px`,
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                opacity: isVisible ? 0.3 : 0,
                backgroundImage: "url('/images/spadeace.png')",
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          );
        })
      )}
    </div>
  );
};

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);

  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <>
      <AnimatedSpadeacePattern />
      <main className=" pointer-events-none select-none z-10 fixed  inset-0  flex justify-between flex-col">
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-1 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300  px-1.5 py-1 rounded-full  text-sm uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300  px-1.5 py-1 rounded-full  text-sm uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 flex items-center -rotate-2 select-none">
        <div className="relative">
          <div className="bg-white/0  animate-horizontal-scroll flex items-center gap-8 w-max px-8">
            <h1 className="shrink-0 text-white text-10xl font-black ">
              
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              Quantitative Developer
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              Bailey Koo
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Programmer
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Mathematics
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">
              Engineer
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
            Quant
            </h2>
          </div>
          <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
            <h1 className="shrink-0 text-white text-10xl font-black ">
              Bailey Koo
            </h1>
            <h2 className="shrink-0 text-white text-8xl italic font-light">
              Mathematics
            </h2>
            <h2 className="shrink-0 text-white text-12xl font-bold">
              Quantitative Developer
            </h2>
            <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
              Algorithmic Trader
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-medium">
              Probability
            </h2>
            <h2 className="shrink-0 text-white text-9xl font-extralight italic">
              Graphics
            </h2>
            <h2 className="shrink-0 text-white text-13xl font-bold">
              2027
            </h2>
            <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
              Quant
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

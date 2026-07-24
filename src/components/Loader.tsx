export function Loader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-[#666666]">
      <div className="relative w-20 h-20 mb-4">
        {/* Speedometer Arc and Ticks */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#2A2A2E] stroke-current">
          <path
            d="M 20 80 A 42.4 42.4 0 1 1 80 80"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path 
            d="M 22 75 L 28 70 
               M 12 50 L 20 50 
               M 22 25 L 28 30 
               M 50 12 L 50 20 
               M 78 25 L 72 30 
               M 88 50 L 80 50 
               M 78 75 L 72 70" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
        </svg>
        
        {/* Speedometer Needle */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full text-[#FF1801] stroke-current absolute inset-0 origin-center animate-f1-rev"
          style={{ transformOrigin: '50% 50%' }}
        >
          <path
            d="M 50 50 L 50 22"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" />
          <circle cx="50" cy="50" r="1.5" fill="#0A0A0B" stroke="none" />
        </svg>
      </div>
      <div className="font-mono text-sm uppercase tracking-widest">{text}</div>
    </div>
  );
}

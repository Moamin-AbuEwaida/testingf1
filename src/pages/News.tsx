import { Newspaper, TrendingUp, AlertCircle, PlayCircle } from 'lucide-react';

export function News() {
  const news = [
    {
      id: 1,
      title: "New floor upgrade delivers 0.2s advantage in wind tunnel",
      category: "Technical",
      time: "2 hours ago",
      icon: TrendingUp,
      color: "text-[#4CAF50]"
    },
    {
      id: 2,
      title: "Weather warning: 80% chance of rain for Q3",
      category: "Weather",
      time: "4 hours ago",
      icon: AlertCircle,
      color: "text-yellow-500"
    },
    {
      id: 3,
      title: "Post-race debrief: Strategy breakdown",
      category: "Analysis",
      time: "5 hours ago",
      icon: PlayCircle,
      color: "text-[#2196F3]"
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-[#2A2A2E] pb-4">
        <div>
          <h1 className="text-3xl font-bold uppercase italic text-[#E0E0E0] tracking-tight">Paddock News</h1>
          <p className="text-[#666666] mt-2 uppercase tracking-widest text-sm font-semibold">Latest updates, technical analysis, and predictions</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {news.map(item => (
            <div key={item.id} className="bg-[#141416] rounded p-6 border border-[#2A2A2E] hover:border-[#FF1801]/50 transition-colors flex gap-6 cursor-pointer">
              <div className="w-12 h-12 rounded bg-[#1C1C1F] border border-[#2A2A2E] flex items-center justify-center shrink-0">
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF1801]">{item.category}</span>
                  <span className="text-[10px] text-[#666666] font-mono">{item.time}</span>
                </div>
                <h2 className="text-lg font-bold text-[#E0E0E0] mb-2">{item.title}</h2>
                <p className="text-sm text-[#666666] line-clamp-2">
                  Detailed analysis and insights from the paddock regarding the latest developments and their potential impact on the upcoming sessions.
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-[#141416] rounded p-6 border border-[#2A2A2E]">
            <h3 className="text-[11px] uppercase tracking-tighter text-[#666666] mb-4">AI Predictions</h3>
            <div className="space-y-3">
              <div className="p-3 bg-[#1C1C1F] rounded border border-[#2A2A2E]">
                <div className="text-[10px] text-[#666666] font-bold uppercase tracking-wider mb-1">Pole Position Probability</div>
                <div className="flex justify-between items-end">
                  <div className="text-sm font-bold text-[#E0E0E0]">VER</div>
                  <div className="text-[#FF1801] font-mono font-bold text-lg">68%</div>
                </div>
              </div>
              <div className="p-3 bg-[#1C1C1F] rounded border border-[#2A2A2E]">
                <div className="text-[10px] text-[#666666] font-bold uppercase tracking-wider mb-1">Safety Car Probability</div>
                <div className="flex justify-between items-end">
                  <div className="text-sm font-bold text-[#E0E0E0]">HIGH</div>
                  <div className="text-orange-500 font-mono font-bold text-lg">82%</div>
                </div>
              </div>
              <div className="p-3 bg-[#1C1C1F] rounded border border-[#2A2A2E]">
                <div className="text-[10px] text-[#666666] font-bold uppercase tracking-wider mb-1">Optimal Pit Strategy</div>
                <div className="flex justify-between items-end">
                  <div className="text-sm font-bold text-[#E0E0E0]">1 STOP</div>
                  <div className="text-[#4CAF50] font-mono font-bold text-lg">LAP 24</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

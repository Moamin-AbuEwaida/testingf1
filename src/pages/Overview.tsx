import { useState, useEffect } from 'react';
import { Users, Trophy, Flag, Timer } from 'lucide-react';
import { useOpenF1 } from '@/hooks/useOpenF1';
import { Driver, ChampionshipDriver, ChampionshipTeam } from '@/types';
import { Loader } from '@/components/Loader';
import { cn } from '@/lib/utils';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export function Overview() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { data: drivers, loading: loadingDrivers } = useOpenF1<Driver[]>('/drivers', { session_key: 'latest' });
  const { data: driverStandings, loading: loadingStandings } = useOpenF1<ChampionshipDriver[]>('/championship_drivers', { session_key: 'latest' });
  const { data: teamStandings, loading: loadingTeams } = useOpenF1<ChampionshipTeam[]>('/championship_teams', { session_key: 'latest' });

  // Mock data for charts
  const mockChartData = Array.from({ length: 20 }).map((_, i) => ({
    lap: i + 1,
    speed: 280 + Math.random() * 40
  }));

  if (loadingDrivers || loadingStandings || loadingTeams) {
    return <Loader text="Loading telemetry..." />;
  }

  // Map drivers to their standings
  const standingsWithDriverInfo = driverStandings?.map(standing => {
    const driverInfo = drivers?.find(d => d.driver_number === standing.driver_number);
    return {
      ...standing,
      full_name: driverInfo?.full_name || `Driver ${standing.driver_number}`,
      team_name: driverInfo?.team_name || 'Unknown',
      name_acronym: driverInfo?.name_acronym || 'UNK'
    };
  }).sort((a, b) => a.position_current - b.position_current) || [];

  const topTeams = teamStandings?.sort((a, b) => a.position_current - b.position_current).slice(0, 3) || [];
  
  // Calculate max points for width percentage
  const maxTeamPoints = topTeams.length > 0 ? topTeams[0].points_current : 1;

  const leader = standingsWithDriverInfo[0];
  const leaderAcronym = leader?.name_acronym || 'ANT';
  const leaderTeam = leader?.team_name || 'Mercedes';

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-[#2A2A2E] pb-4">
        <div>
          <h1 className="text-3xl font-sans font-bold text-[#E0E0E0] tracking-tight uppercase">Championship Overview</h1>
          <p className="text-[#666666] mt-2 uppercase tracking-widest text-sm font-semibold">Latest standings and telemetry</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-[#141416] border border-[#2A2A2E] rounded px-4 py-2 flex items-center gap-2">
             <Timer className="w-4 h-4 text-[#FF1801]" />
            <span className="text-sm text-[#E0E0E0] font-mono">
              {time.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
              })}
            </span>
          </div>
        </div>
      </header>

      {/* Top metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Leader" value={leaderAcronym} subtitle={leaderTeam} icon={Trophy} color="text-teal-500" />
        <MetricCard title="Fastest Lap" value="1:21.344" subtitle="LEC" icon={Timer} color="text-[#FF1801]" />
        <MetricCard title="Track Status" value="Clear" subtitle="Dry" icon={Flag} color="text-[#4CAF50]" />
        <MetricCard title="Active Drivers" value={standingsWithDriverInfo.length.toString()} subtitle="On Track" icon={Users} color="text-[#E0E0E0]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Drivers Ranking */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#141416] border border-[#2A2A2E] rounded p-6">
            <h2 className="text-[11px] uppercase tracking-tighter text-[#666666] mb-4 flex justify-between">
              <span>Driver Standings</span>
              <span className="text-[#FF1801]">S.LATEST</span>
            </h2>
            <div className="space-y-3">
              {standingsWithDriverInfo.slice(0, 8).map((driver, index) => (
                <div key={driver.driver_number} className="flex items-center justify-between p-2 hover:bg-[#1C1C1F] transition-colors rounded">
                  <span className="font-mono text-lg font-bold w-6 text-[#E0E0E0]">
                    {String(driver.position_current).padStart(2, '0')}
                  </span>
                  <div className="w-10 h-10 rounded overflow-hidden shrink-0 bg-[#0A0A0B] border border-[#2A2A2E] ml-2 mr-3">
                    {driver.headshot_url ? (
                      <img src={driver.headshot_url} alt={driver.name_acronym} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#666666] font-mono">{driver.name_acronym}</div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm font-bold text-[#E0E0E0] uppercase">{driver.full_name}</div>
                    <div className="text-[10px] text-[#666666] uppercase">{driver.team_name}</div>
                  </div>
                  <span className="font-mono font-bold text-[#E0E0E0] w-12 text-right">{driver.points_current}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-8">
          <div className="bg-[#141416] border border-[#2A2A2E] rounded p-6">
            <h2 className="text-[11px] uppercase tracking-tighter text-[#666666] mb-4 flex justify-between">
              <span>Team Domination</span>
            </h2>
            <div className="h-40 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF1801" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF1801" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141416', border: '1px solid #2A2A2E', borderRadius: '4px' }}
                    itemStyle={{ color: '#FF1801', fontFamily: 'monospace' }}
                  />
                  <Area type="monotone" dataKey="speed" stroke="#FF1801" strokeWidth={2} fillOpacity={1} fill="url(#colorSpeed)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#141416] border border-[#2A2A2E] rounded p-6">
            <h2 className="text-[11px] uppercase tracking-tighter text-[#666666] mb-4 flex justify-between">
              <span>Constructor Top 3</span>
            </h2>
            <div className="space-y-4">
               {topTeams.map((item, index) => {
                 const colors = ['bg-[#FF1801]', 'bg-blue-800', 'bg-teal-500', 'bg-orange-500'];
                 const color = colors[index % colors.length];
                 const width = `${(item.points_current / maxTeamPoints) * 100}%`;
                 return (
                 <div key={item.team_name} className="relative">
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-[#E0E0E0]">{item.team_name}</span>
                     <span className="font-mono text-[#E0E0E0]">{item.points_current}</span>
                   </div>
                   <div className="h-1 bg-[#2A2A2E] w-full rounded-none">
                     <div className={`h-full ${color}`} style={{ width }} />
                   </div>
                 </div>
                 );
               })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle, icon: Icon, color }: any) {
  return (
    <div className="bg-[#141416] border border-[#2A2A2E] rounded p-5 hover:bg-[#1C1C1F] transition-colors">
      <div className="flex justify-between items-start mb-4">
        <p className="text-[#666666] text-[10px] uppercase tracking-wider font-medium">{title}</p>
        <Icon className={cn("w-4 h-4", color)} />
      </div>
      <h3 className="text-2xl font-mono font-bold text-[#E0E0E0] mb-1">{value}</h3>
      <p className="text-[10px] text-[#666666] uppercase">{subtitle}</p>
    </div>
  );
}

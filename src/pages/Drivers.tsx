import { useState } from 'react';
import { useOpenF1 } from '@/hooks/useOpenF1';
import { Driver, CarData } from '@/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Gauge, Flame, Zap, Trophy, Flag, Star, Hash } from 'lucide-react';
import { Loader } from '@/components/Loader';
import { cn } from '@/lib/utils';

const driverStats: Record<number, any> = {
  1: { dob: "30/09/1997", podiums: 106, points: 2841.5, championships: 3, grandsPrix: 196 },
  11: { dob: "26/01/1990", podiums: 39, points: 1618, championships: 0, grandsPrix: 275 },
  44: { dob: "07/01/1985", podiums: 199, points: 4749.5, championships: 7, grandsPrix: 343 },
  63: { dob: "15/02/1998", podiums: 14, points: 588, championships: 0, grandsPrix: 115 },
  16: { dob: "16/10/1997", podiums: 36, points: 1251, championships: 0, grandsPrix: 136 },
  55: { dob: "01/09/1994", podiums: 23, points: 1118.5, championships: 0, grandsPrix: 194 },
  4: { dob: "13/11/1999", podiums: 21, points: 830, championships: 0, grandsPrix: 115 },
  81: { dob: "06/04/2001", podiums: 5, points: 208, championships: 0, grandsPrix: 33 },
  14: { dob: "29/07/1981", podiums: 106, points: 2305, championships: 2, grandsPrix: 390 },
  18: { dob: "29/10/1998", podiums: 3, points: 286, championships: 0, grandsPrix: 154 },
  10: { dob: "07/02/1996", podiums: 4, points: 432, championships: 0, grandsPrix: 141 },
  31: { dob: "17/09/1996", podiums: 3, points: 425, championships: 0, grandsPrix: 144 },
  23: { dob: "23/03/1996", podiums: 2, points: 242, championships: 0, grandsPrix: 92 },
  2: { dob: "31/12/2000", podiums: 0, points: 1, championships: 0, grandsPrix: 32 },
  22: { dob: "11/05/2000", podiums: 0, points: 80, championships: 0, grandsPrix: 75 },
  3: { dob: "01/07/1989", podiums: 32, points: 1326, championships: 0, grandsPrix: 250 },
  77: { dob: "28/08/1989", podiums: 67, points: 1797, championships: 0, grandsPrix: 233 },
  24: { dob: "30/05/1999", podiums: 0, points: 12, championships: 0, grandsPrix: 55 },
  20: { dob: "05/10/1992", podiums: 1, points: 191, championships: 0, grandsPrix: 174 },
  27: { dob: "19/08/1987", podiums: 0, points: 544, championships: 0, grandsPrix: 215 },
  38: { dob: "08/05/2005", podiums: 0, points: 6, championships: 0, grandsPrix: 1 },
};

export function Drivers() {
  const [selectedDriver, setSelectedDriver] = useState<number>(1);
  const { data: drivers, loading: loadingDrivers } = useOpenF1<Driver[]>('/drivers', { session_key: 'latest' });
  const { data: telemetry, loading: loadingTelemetry } = useOpenF1<CarData[]>('/car_data', { 
    driver_number: selectedDriver, 
    session_key: 'latest',
  });

  if (loadingDrivers) {
    return <Loader text="Loading drivers..." />;
  }

  const uniqueDrivers = drivers?.reduce((acc, curr) => {
    if (!acc.find(d => d.driver_number === curr.driver_number)) {
      acc.push(curr);
    }
    return acc;
  }, [] as Driver[]) || [];

  const activeDriver = uniqueDrivers.find(d => d.driver_number === selectedDriver);

  // Sample telemetry data down for performance (take every 10th data point if large)
  const chartData = telemetry?.slice(-100).map((d, i) => ({
    time: i,
    speed: d.speed,
    rpm: d.rpm,
    throttle: d.throttle,
    brake: d.brake
  })) || [];

  const avgSpeed = chartData.length > 0 
    ? Math.round(chartData.reduce((acc, curr) => acc + curr.speed, 0) / chartData.length) 
    : 0;

  // Deriving pseudo-realistic values that vary per driver and telemetry to avoid fixed data
  const simulatedHeartRate = 130 + (activeDriver?.driver_number || 0) % 30 + Math.floor(avgSpeed / 30);
  const simulatedTireTemp = 85 + (activeDriver?.driver_number || 0) % 20 + Math.floor(avgSpeed / 20);
  const maxThrottle = chartData.length > 0 ? Math.max(...chartData.map(d => d.throttle)) : 0;

  const currentStats = activeDriver ? (driverStats[activeDriver.driver_number] || { dob: "N/A", podiums: 0, points: 0, championships: 0, grandsPrix: 0 }) : null;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-[#2A2A2E] pb-4">
        <div>
          <h1 className="text-3xl font-bold uppercase italic text-[#E0E0E0] tracking-tight">Driver Profile</h1>
          <p className="text-[#666666] mt-2 uppercase tracking-widest text-sm font-semibold">Real-time stats and analysis</p>
        </div>
      </header>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
        {uniqueDrivers.map(driver => (
          <button
            key={driver.driver_number}
            onClick={() => setSelectedDriver(driver.driver_number)}
            className={`flex-shrink-0 px-6 py-3 rounded border transition-all ${
              selectedDriver === driver.driver_number 
                ? 'bg-[#1C1C1F] border-[#FF1801] text-[#E0E0E0]' 
                : 'bg-[#141416] border-[#2A2A2E] text-[#666666] hover:border-[#FF1801]/50'
            }`}
          >
            <div className="font-bold text-lg flex items-center gap-2">
              {driver.name_acronym}
            </div>
            <div className="text-[10px] opacity-70 uppercase">{driver.driver_number}</div>
          </button>
        ))}
      </div>

      {activeDriver && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Driver Profile */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#141416] rounded p-6 border border-[#2A2A2E] relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 w-full h-1"
                style={{ backgroundColor: `#${activeDriver.team_colour || 'fff'}` }}
              />
              <div className="pt-2 flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-[#E0E0E0] uppercase">{activeDriver.first_name}</h2>
                  <h3 className="text-3xl font-black text-[#E0E0E0] uppercase tracking-tight">{activeDriver.last_name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-[#FF1801] text-xs font-bold uppercase">{activeDriver.team_name}</p>
                    <span className="text-[#666666] text-xs font-bold px-2 py-0.5 border border-[#2A2A2E] rounded bg-[#0A0A0B]">{activeDriver.country_code}</span>
                  </div>
                </div>
                {activeDriver.headshot_url && (
                  <div className="w-24 h-24 rounded overflow-hidden shrink-0 bg-[#0A0A0B] border border-[#2A2A2E] z-10">
                    <img src={activeDriver.headshot_url} alt={activeDriver.name_acronym} className="w-full h-full object-cover object-top" />
                  </div>
                )}
              </div>
              <div className="text-6xl font-black text-[#2A2A2E] absolute -bottom-4 -right-2 z-0">
                {String(activeDriver.driver_number).padStart(2, '0')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StatBox icon={Hash} label="Grands Prix" value={currentStats?.grandsPrix} unit="Entered" color="text-[#E0E0E0]" />
              <StatBox icon={Trophy} label="Podiums" value={currentStats?.podiums} unit="Total" color="text-yellow-500" />
              <StatBox icon={Star} label="Points" value={currentStats?.points} unit="Career" color="text-blue-500" />
              <StatBox icon={Flag} label="World Ch." value={currentStats?.championships} unit="Titles" color="text-[#FF1801]" />
            </div>

            <div className="bg-[#141416] p-4 border border-[#2A2A2E] rounded">
              <div className="text-[#666666] text-[9px] font-bold uppercase mb-1">Date of Birth</div>
              <div className="text-lg font-bold text-[#E0E0E0]">{currentStats?.dob}</div>
            </div>
          </div>

          {/* Telemetry Charts */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-[#141416] rounded p-6 border border-[#2A2A2E]">
              <h3 className="text-[11px] uppercase tracking-tighter text-[#666666] mb-6 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#FF1801]" />
                Speed Profile
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2E" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis stroke="#666666" tick={{fontFamily: 'Titillium Web, sans-serif', fontSize: 10}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#141416', border: '1px solid #2A2A2E', borderRadius: '4px' }}
                      itemStyle={{ color: '#FF1801', fontFamily: 'Titillium Web, sans-serif' }}
                    />
                    <Line type="monotone" dataKey="speed" stroke="#FF1801" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#141416] rounded p-6 border border-[#2A2A2E]">
                <h3 className="text-[11px] uppercase tracking-tighter text-[#666666] mb-6">Throttle %</h3>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <YAxis domain={[0, 100]} hide />
                      <Tooltip contentStyle={{ backgroundColor: '#141416', border: 'none' }} itemStyle={{ fontFamily: 'Titillium Web, sans-serif', color: '#4CAF50' }} />
                      <Line type="stepAfter" dataKey="throttle" stroke="#4CAF50" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-[#141416] rounded p-6 border border-[#2A2A2E]">
                <h3 className="text-[11px] uppercase tracking-tighter text-[#666666] mb-6">RPM</h3>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <YAxis domain={['auto', 'auto']} hide />
                      <Tooltip contentStyle={{ backgroundColor: '#141416', border: 'none' }} itemStyle={{ fontFamily: 'Titillium Web, sans-serif', color: '#2196F3' }} />
                      <Line type="monotone" dataKey="rpm" stroke="#2196F3" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatBox({ icon: Icon, label, value, unit, color = "text-[#FF1801]" }: any) {
  return (
    <div className="bg-[#141416] border border-[#2A2A2E] p-4 rounded">
      <Icon className={cn("w-4 h-4 mb-2", color)} />
      <div className="text-[#666666] text-[9px] font-bold uppercase mb-1">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-[#E0E0E0]">{value}</span>
        <span className="text-[10px] text-[#666666]">{unit}</span>
      </div>
    </div>
  );
}

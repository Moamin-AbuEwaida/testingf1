import { useOpenF1 } from '@/hooks/useOpenF1';
import { Driver } from '@/types';
import { Shield, Zap, Wind, Settings, Trophy, User, MapPin } from 'lucide-react';
import { Loader } from '@/components/Loader';

const teamInfo: Record<string, any> = {
  "Red Bull Racing": { chassis: "RB20", powerUnit: "Honda RBPT", chief: "Christian Horner", base: "Milton Keynes, UK", championships: 6 },
  "Mercedes": { chassis: "W15", powerUnit: "Mercedes", chief: "Toto Wolff", base: "Brackley, UK", championships: 8 },
  "Ferrari": { chassis: "SF-24", powerUnit: "Ferrari", chief: "Frédéric Vasseur", base: "Maranello, Italy", championships: 16 },
  "McLaren": { chassis: "MCL38", powerUnit: "Mercedes", chief: "Andrea Stella", base: "Woking, UK", championships: 8 },
  "Aston Martin": { chassis: "AMR24", powerUnit: "Mercedes", chief: "Mike Krack", base: "Silverstone, UK", championships: 0 },
  "Alpine": { chassis: "A524", powerUnit: "Renault", chief: "Bruno Famin", base: "Enstone, UK", championships: 2 },
  "Williams": { chassis: "FW46", powerUnit: "Mercedes", chief: "James Vowles", base: "Grove, UK", championships: 9 },
  "RB": { chassis: "VCARB 01", powerUnit: "Honda RBPT", chief: "Laurent Mekies", base: "Faenza, Italy", championships: 0 },
  "Kick Sauber": { chassis: "C44", powerUnit: "Ferrari", chief: "Alessandro Alunni Bravi", base: "Hinwil, Switzerland", championships: 0 },
  "Haas F1 Team": { chassis: "VF-24", powerUnit: "Ferrari", chief: "Ayao Komatsu", base: "Kannapolis, USA", championships: 0 },
};

export function Teams() {
  const { data: drivers, loading } = useOpenF1<Driver[]>('/drivers', { session_key: 'latest' });

  if (loading) {
    return <Loader text="Loading constructors..." />;
  }

  const teamsMap = drivers?.reduce((acc, curr) => {
    if (!acc[curr.team_name]) {
      acc[curr.team_name] = {
        name: curr.team_name,
        color: curr.team_colour,
        drivers: []
      };
    }
    if (!acc[curr.team_name].drivers.find((d: any) => d.driver_number === curr.driver_number)) {
      acc[curr.team_name].drivers.push(curr);
    }
    return acc;
  }, {} as Record<string, any>) || {};

  const teams = Object.values(teamsMap);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-[#2A2A2E] pb-4">
        <div>
          <h1 className="text-3xl font-bold uppercase italic text-[#E0E0E0] tracking-tight">Constructors</h1>
          <p className="text-[#666666] mt-2 uppercase tracking-widest text-sm font-semibold">Team profiles and car specifications</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teams.map((team: any) => {
          const info = teamInfo[team.name] || { chassis: "N/A", powerUnit: "N/A", chief: "N/A", base: "N/A", championships: 0 };
          const teamId = team.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          return (
            <div key={team.name} className="bg-[#141416] rounded border border-[#2A2A2E] overflow-hidden group hover:border-[#FF1801]/50 transition-colors">
              <div 
                className="h-1 w-full"
                style={{ backgroundColor: `#${team.color || 'fff'}` }}
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-[#E0E0E0] uppercase tracking-wider">{team.name}</h2>
                  <div className="bg-[#1C1C1F] border border-[#2A2A2E] px-3 py-1 rounded flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-[#E0E0E0] font-bold text-sm">{info.championships} Titles</span>
                  </div>
                </div>
                
                <div className="h-40 w-full mb-6 relative bg-[#0A0A0B] rounded border border-[#2A2A2E] overflow-hidden flex items-center justify-center p-4">
                  <img 
                    src={`https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/d_common:f1:2026:fallback:car:2026fallbackcarright.webp/v1740000001/common/f1/2026/${teamId}/2026${teamId}carright.webp`}
                    alt={`${team.name} car`}
                    className="w-full h-full object-contain filter drop-shadow-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://media.formula1.com/image/upload/c_lfill,h_224/q_auto/v1740000001/common/f1/2026/fallback/car/2026fallbackcarright.webp';
                    }}
                  />
                  <div className="absolute bottom-2 left-3 flex gap-2">
                    <div className="bg-[#141416]/80 backdrop-blur text-[#E0E0E0] text-[10px] uppercase font-bold px-2 py-1 rounded border border-[#2A2A2E]">
                      {info.chassis}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#1C1C1F] rounded p-3 border border-[#2A2A2E]">
                    <div className="text-[#666666] text-[10px] uppercase font-bold mb-1 flex items-center gap-1">
                      <Settings className="w-3 h-3" /> Power Unit
                    </div>
                    <div className="text-sm font-bold text-[#E0E0E0]">{info.powerUnit}</div>
                  </div>
                  <div className="bg-[#1C1C1F] rounded p-3 border border-[#2A2A2E]">
                    <div className="text-[#666666] text-[10px] uppercase font-bold mb-1 flex items-center gap-1">
                      <User className="w-3 h-3" /> Team Chief
                    </div>
                    <div className="text-sm font-bold text-[#E0E0E0]">{info.chief}</div>
                  </div>
                  <div className="bg-[#1C1C1F] rounded p-3 border border-[#2A2A2E] col-span-2">
                    <div className="text-[#666666] text-[10px] uppercase font-bold mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Base
                    </div>
                    <div className="text-sm font-bold text-[#E0E0E0]">{info.base}</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {team.drivers.map((d: any) => (
                    <div key={d.driver_number} className="flex-1 bg-[#0A0A0B] rounded p-3 border border-[#2A2A2E] flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden shrink-0 bg-[#141416] border border-[#2A2A2E]">
                        {d.headshot_url ? (
                          <img src={d.headshot_url} alt={d.name_acronym} className="w-full h-full object-cover object-top" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-[#666666] font-mono">{d.name_acronym}</div>
                        )}
                      </div>
                      <div>
                        <div className="text-[10px] text-[#666666] mb-0.5 font-bold">{String(d.driver_number).padStart(2, '0')}</div>
                        <div className="text-sm font-bold text-[#E0E0E0] uppercase">{d.name_acronym}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


import { useOpenF1 } from '@/hooks/useOpenF1';
import { Session, Meeting } from '@/types';
import { MapPin, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { Loader } from '@/components/Loader';

export function Tracks() {
  const currentYear = new Date().getFullYear();
  const { data: sessions, loading: loadingSessions } = useOpenF1<Session[]>('/sessions', { year: currentYear });
  const { data: meetings, loading: loadingMeetings } = useOpenF1<Meeting[]>('/meetings', { year: currentYear });

  if (loadingSessions || loadingMeetings) {
    return <Loader text="Loading circuits..." />;
  }

  // Group sessions by meeting (circuit)
  const circuitsMap = sessions?.reduce((acc, curr) => {
    if (!acc[curr.meeting_key]) {
      const meetingInfo = meetings?.find(m => m.meeting_key === curr.meeting_key);
      acc[curr.meeting_key] = {
        name: curr.circuit_short_name,
        country: curr.country_name,
        location: curr.location,
        country_flag: meetingInfo?.country_flag,
        circuit_image: meetingInfo?.circuit_image,
        sessions: []
      };
    }
    acc[curr.meeting_key].sessions.push(curr);
    return acc;
  }, {} as Record<number, any>) || {};

  const circuits = Object.values(circuitsMap);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-[#2A2A2E] pb-4">
        <div>
          <h1 className="text-3xl font-bold uppercase italic text-[#E0E0E0] tracking-tight">Circuits & Calendar</h1>
          <p className="text-[#666666] mt-2 uppercase tracking-widest text-sm font-semibold">Track information and session schedules</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {circuits.map((circuit: any, index: number) => (
          <div key={index} className="bg-[#141416] rounded border border-[#2A2A2E] overflow-hidden hover:border-[#FF1801]/50 transition-colors">
            
            {/* Circuit Image */}
            <div className="h-40 bg-[#1C1C1F] relative flex items-center justify-center p-6 border-b border-[#2A2A2E]">
              {circuit.circuit_image ? (
                <img src={circuit.circuit_image} alt={`${circuit.name} map`} className="w-full h-full object-contain filter grayscale brightness-0 invert drop-shadow-md opacity-90" />
              ) : (
                <MapPin className="w-12 h-12 text-[#2A2A2E]" />
              )}
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-6 border-b border-[#2A2A2E] pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {circuit.country_flag && (
                      <img src={circuit.country_flag} alt={circuit.country} className="w-5 h-auto rounded-sm" />
                    )}
                    <h2 className="text-lg font-bold text-[#E0E0E0] uppercase tracking-wider leading-none">{circuit.name}</h2>
                  </div>
                  <div className="flex items-center gap-2 text-[#666666] text-xs uppercase font-bold mt-2">
                    <MapPin className="w-3 h-3 text-[#FF1801]" />
                    {circuit.location}, {circuit.country}
                  </div>
                </div>
                <div className="bg-[#1C1C1F] px-2 py-1 rounded text-[#E0E0E0] font-mono text-[10px] border border-[#2A2A2E]">
                  R{String(index + 1).padStart(2, '0')}
                </div>
              </div>

              <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-[#666666] uppercase tracking-wider mb-2">Sessions</h3>
              {circuit.sessions.slice(0, 3).map((session: any) => (
                <div key={session.session_key} className="flex justify-between items-center bg-[#1C1C1F] p-2 rounded border border-[#2A2A2E]">
                  <div className="flex items-center gap-2">
                    <Flag className="w-3 h-3 text-[#FF1801]" />
                    <span className="text-[#E0E0E0] text-xs font-bold uppercase tracking-wider">{session.session_name}</span>
                  </div>
                  <div className="text-[10px] text-[#666666] font-mono">
                    {format(new Date(session.date_start), 'MMM dd, HH:mm')}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

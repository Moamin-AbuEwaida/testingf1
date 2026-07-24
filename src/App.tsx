/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { MobileNav } from '@/components/MobileNav';
import { Overview } from '@/pages/Overview';
import { Drivers } from '@/pages/Drivers';
import { Teams } from '@/pages/Teams';
import { Tracks } from '@/pages/Tracks';
import { News } from '@/pages/News';

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#0A0A0B] text-[#E0E0E0] selection:bg-[#FF1801]/30 font-sans">
        <Sidebar />
        <main className="flex-1 md:ml-64 min-h-screen overflow-x-hidden pb-24 md:pb-0">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </main>
        <MobileNav />
      </div>
    </Router>
  );
}

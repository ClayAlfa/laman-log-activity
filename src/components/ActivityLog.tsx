import { useState, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { ExportMenu } from './ExportMenu';
import { FilterBar } from './FilterBar';
import { Top10Grid } from './Top10Grid';
import { ActivityTable } from './ActivityTable';
import { DetailModal } from './DetailModal';

export interface Activity {
  date: string;
  user: string;
  type: 'borrow' | 'return' | 'queue' | 'read' | 'expired';
  book: string;
  status: string;
  id: string;
}

const activities: Activity[] = [
  { date: '2025-03-21 10:32', user: 'bud_s', type: 'borrow', book: 'Lukisan Senja', status: 'Borrowed', id: 'TRX-001' },
  { date: '2025-03-20 09:15', user: 'aril_01', type: 'read', book: 'Dasar Basis Data', status: 'Reading', id: 'TRX-002' },
  { date: '2025-03-18 16:05', user: 'cinta_n', type: 'queue', book: 'Dragon Ball Ultimate 02', status: 'In Queue', id: 'TRX-003' },
  { date: '2025-03-17 08:50', user: 'rina', type: 'borrow', book: 'Dasar Basis Data', status: 'Borrowed', id: 'TRX-004' },
  { date: '2025-03-16 11:30', user: 'rina', type: 'return', book: 'Pemrograman Berbasis Web', status: 'Returned', id: 'TRX-005' },
  { date: '2025-03-10 19:20', user: 'bud_s', type: 'return', book: 'Pengantar Algoritma', status: 'Returned', id: 'TRX-006' },
  { date: '2025-03-08 13:40', user: 'joko_w', type: 'expired', book: 'Pemrograman Berbasis Web', status: 'Expired', id: 'TRX-007' },
  { date: '2025-03-05 08:01', user: 'cahya_d', type: 'borrow', book: 'Lukisan Senja', status: 'Borrowed', id: 'TRX-008' },
  { date: '2025-03-02 10:10', user: 'kunti', type: 'borrow', book: 'Dragon Ball Ultimate 02', status: 'Borrowed', id: 'TRX-009' },
  { date: '2025-02-28 09:12', user: 'bud_s', type: 'read', book: 'Dasar Basis Data', status: 'Reading', id: 'TRX-010' },
  { date: '2025-02-25 11:11', user: 'rina', type: 'borrow', book: 'Pemrograman Berbasis Web', status: 'Borrowed', id: 'TRX-011' },
  { date: '2025-02-20 14:20', user: 'aril_01', type: 'borrow', book: 'Lukisan Senja', status: 'Borrowed', id: 'TRX-012' },
];

interface ActivityLogProps {
  onShowToast: (message: string) => void;
}

export function ActivityLog({ onShowToast }: ActivityLogProps) {
  const [period, setPeriod] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['borrow', 'return', 'queue', 'read', 'expired']);
  const [userSearch, setUserSearch] = useState('');
  const [bookSearch, setBookSearch] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const filteredData = useMemo(() => {
    const now = new Date();
    
    return activities.filter((a) => {
      const adate = new Date(a.date.replace(' ', 'T'));
      
      // Filter periode
      if (period === '7' || period === '30') {
        const diffMs = now.getTime() - adate.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        if (diffDays > Number(period)) return false;
      } else if (period === 'custom') {
        if (startDate) {
          const start = new Date(startDate + 'T00:00');
          if (adate < start) return false;
        }
        if (endDate) {
          const end = new Date(endDate + 'T23:59');
          if (adate > end) return false;
        }
      }

      // Filter aktivitas type
      if (selectedTypes.length > 0 && !selectedTypes.includes(a.type)) return false;

      // Filter user
      if (userSearch && !a.user.toLowerCase().includes(userSearch.toLowerCase())) return false;

      // Filter book
      if (bookSearch && !a.book.toLowerCase().includes(bookSearch.toLowerCase())) return false;

      return true;
    });
  }, [period, startDate, endDate, selectedTypes, userSearch, bookSearch]);

  const stats = useMemo(() => {
    const counts = {
      total: filteredData.length,
      borrow: 0,
      return: 0,
      queue: 0,
      read: 0,
      expired: 0,
    };
    filteredData.forEach((a) => {
      if (counts[a.type] !== undefined) counts[a.type]++;
    });
    return counts;
  }, [filteredData]);

  const handleRefresh = () => {
    onShowToast('Data disegarkan (demo).');
  };

  return (
    <main className="p-5 md:p-6 flex flex-col gap-4">
      {/* Header */}
      <header className="flex items-center justify-between gap-3 max-md:flex-col max-md:items-start">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl">Activity Log & Laporan</h1>
          <p className="text-[13px] text-[#6b7280]">
            Pantau aktivitas perpustakaan digital, lihat statistik, dan ekspor laporan berdasarkan filter yang dipilih.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] px-2.5 py-1.5 rounded-full bg-[#ecf3ff] text-[#1d4ed8] border border-[rgba(59,130,246,0.15)]">
            Realtime snapshot • 10s ago
          </span>
          <button
            onClick={handleRefresh}
            className="rounded-full border border-[#e5e7eb] px-3 py-1.5 text-xs bg-white text-[#111827] flex items-center gap-1.5 hover:bg-gray-50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>
      </header>

      {/* Panel */}
      <section className="bg-white rounded-[20px] shadow-[0_14px_40px_rgba(15,23,42,0.12)] p-4 md:p-5 flex flex-col gap-3">
        {/* Panel Header */}
        <div className="flex items-center justify-between gap-3 max-md:flex-col max-md:items-start">
          <div className="flex flex-col gap-1">
            <h2 className="text-base">Laporan Aktivitas Pustaka</h2>
            <p className="text-xs text-[#6b7280]">
              Laporan ekspor akan mengikuti data yang saat ini tampil di tabel <em>Activity Log</em>, termasuk filter & sort yang aktif.
            </p>
          </div>
          <ExportMenu data={filteredData} onShowToast={onShowToast} />
        </div>

        {/* Definition */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_1.1fr] gap-4">
          <div className="p-3 rounded-2xl bg-[#f9fafb] border border-dashed border-[#d1d5db] text-xs text-[#6b7280]">
            <strong className="block mb-1 text-[#111827] text-xs">Definisi Laporan Aktivitas</strong>
            Laporan ini merangkum aktivitas perpustakaan digital berdasarkan data yang tampil pada tabel di bawah.
            <ul className="pl-4 mt-1 space-y-0.5">
              <li><b>Kolom:</b> Tanggal & waktu, user, jenis aktivitas, judul buku, status.</li>
              <li><b>Aktivitas:</b> peminjaman (borrow), pengembalian (return), antrean (queue), membaca (read), dan status kadaluarsa (expired).</li>
              <li><b>Statistik ringkas:</b> 10 buku paling sering dipinjam & 10 pengguna paling aktif dalam periode filter.</li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-3 text-[11px]">
              <div className="rounded-full px-2.5 py-1.5 bg-[#f9fafb] border border-[#e5e7eb] flex items-center gap-1 text-[#6b7280]">
                <span className="text-[#111827]">Total Aktivitas:</span>
                <span>{stats.total}</span>
              </div>
              <div className="rounded-full px-2.5 py-1.5 bg-[#f9fafb] border border-[#e5e7eb] flex items-center gap-1 text-[#6b7280]">
                <span className="text-[#111827]">Borrow:</span>
                <span>{stats.borrow}</span>
              </div>
              <div className="rounded-full px-2.5 py-1.5 bg-[#f9fafb] border border-[#e5e7eb] flex items-center gap-1 text-[#6b7280]">
                <span className="text-[#111827]">Return:</span>
                <span>{stats.return}</span>
              </div>
              <div className="rounded-full px-2.5 py-1.5 bg-[#f9fafb] border border-[#e5e7eb] flex items-center gap-1 text-[#6b7280]">
                <span className="text-[#111827]">Queue:</span>
                <span>{stats.queue}</span>
              </div>
              <div className="rounded-full px-2.5 py-1.5 bg-[#f9fafb] border border-[#e5e7eb] flex items-center gap-1 text-[#6b7280]">
                <span className="text-[#111827]">Read:</span>
                <span>{stats.read}</span>
              </div>
              <div className="rounded-full px-2.5 py-1.5 bg-[#f9fafb] border border-[#e5e7eb] flex items-center gap-1 text-[#6b7280]">
                <span className="text-[#111827]">Expired:</span>
                <span>{stats.expired}</span>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-[#fef3c7] border border-[#fde68a] text-[11px] text-[#92400e]">
            <strong className="block mb-1 text-xs">Periode & Cakupan Data</strong>
            Periode laporan mengikuti filter tanggal dan jenis aktivitas yang dipilih. Jika rentang tanggal tidak ditentukan, laporan mencakup seluruh aktivitas yang tersedia pada sistem untuk filter tersebut.
          </div>
        </div>

        {/* Filters */}
        <FilterBar
          period={period}
          setPeriod={setPeriod}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          userSearch={userSearch}
          setUserSearch={setUserSearch}
          bookSearch={bookSearch}
          setBookSearch={setBookSearch}
        />

        {/* Top 10 */}
        <Top10Grid data={filteredData} />

        {/* Table */}
        <ActivityTable
          data={filteredData}
          onRowClick={setSelectedActivity}
        />
      </section>

      {/* Modal */}
      {selectedActivity && (
        <DetailModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}
    </main>
  );
}

import { useMemo } from 'react';
import type { Activity } from './ActivityLog';

interface Top10GridProps {
  data: Activity[];
}

export function Top10Grid({ data }: Top10GridProps) {
  const topBooks = useMemo(() => {
    const bookMap = new Map<string, number>();
    data.forEach((a) => {
      if (a.type !== 'borrow') return;
      bookMap.set(a.book, (bookMap.get(a.book) || 0) + 1);
    });
    return [...bookMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [data]);

  const topUsers = useMemo(() => {
    const userMap = new Map<string, number>();
    data.forEach((a) => {
      if (a.type !== 'borrow') return;
      userMap.set(a.user, (userMap.get(a.user) || 0) + 1);
    });
    return [...userMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [data]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
      <div className="p-3 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] text-xs">
        <div className="flex justify-between items-center mb-1.5">
          <span>Top 10 Buku Terbanyak Dipinjam</span>
          <span className="text-[11px] text-[#6b7280]">Berdasarkan aktivitas Borrow</span>
        </div>
        <ul className="list-none m-0 p-0 max-h-[160px] overflow-auto">
          {topBooks.length > 0 ? (
            topBooks.map(([name, count], idx) => (
              <li key={idx} className="flex justify-between gap-2 py-0.5 text-[11px] text-[#6b7280]">
                <span>{idx + 1}.</span>
                <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{name}</span>
                <span className="text-[#111827]">{count}x</span>
              </li>
            ))
          ) : (
            <li className="text-[11px] text-[#6b7280]">Tidak ada data.</li>
          )}
        </ul>
      </div>

      <div className="p-3 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] text-xs">
        <div className="flex justify-between items-center mb-1.5">
          <span>Top 10 User Paling Aktif Meminjam</span>
          <span className="text-[11px] text-[#6b7280]">Berdasarkan aktivitas Borrow</span>
        </div>
        <ul className="list-none m-0 p-0 max-h-[160px] overflow-auto">
          {topUsers.length > 0 ? (
            topUsers.map(([name, count], idx) => (
              <li key={idx} className="flex justify-between gap-2 py-0.5 text-[11px] text-[#6b7280]">
                <span>{idx + 1}.</span>
                <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{name}</span>
                <span className="text-[#111827]">{count}x</span>
              </li>
            ))
          ) : (
            <li className="text-[11px] text-[#6b7280]">Tidak ada data.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

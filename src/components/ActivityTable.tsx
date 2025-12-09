import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Activity } from './ActivityLog';

interface ActivityTableProps {
  data: Activity[];
  onRowClick: (activity: Activity) => void;
}

type SortColumn = 'date' | 'user' | 'type' | 'book' | 'status';
type SortDirection = 'asc' | 'desc';

export function ActivityTable({ data, onRowClick }: ActivityTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const pageSize = 6;

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let va: any, vb: any;
      if (sortColumn === 'date') {
        va = new Date(a.date.replace(' ', 'T')).getTime();
        vb = new Date(b.date.replace(' ', 'T')).getTime();
      } else {
        va = String(a[sortColumn]).toLowerCase();
        vb = String(b[sortColumn]).toLowerCase();
      }
      if (va < vb) return sortDirection === 'asc' ? -1 : 1;
      if (va > vb) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const startIdx = (currentPage - 1) * pageSize;
  const pageItems = sortedData.slice(startIdx, startIdx + pageSize);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection(column === 'date' ? 'desc' : 'asc');
    }
  };

  const getSortIndicator = (column: SortColumn) => {
    if (sortColumn !== column) return '⇅';
    return sortDirection === 'asc' ? '▲' : '▼';
  };

  const getStatusBadge = (type: string) => {
    const styles = {
      borrow: 'bg-[#ecfdf5] text-[#16a34a]',
      return: 'bg-[#eff6ff] text-[#1d4ed8]',
      queue: 'bg-[#fef3c7] text-[#92400e]',
      read: 'bg-[#f3e8ff] text-[#7e22ce]',
      expired: 'bg-[#fef2f2] text-[#b91c1c]',
    };
    const labels = {
      borrow: 'Borrow',
      return: 'Return',
      queue: 'Queue',
      read: 'Read',
      expired: 'Expired',
    };
    const style = styles[type as keyof typeof styles] || styles.borrow;
    const label = labels[type as keyof typeof labels] || type;
    return (
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide ${style}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="mt-1.5 rounded-2xl border border-[#e5e7eb] bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs">
          <thead className="bg-[#f9fafb]">
            <tr>
              <th
                onClick={() => handleSort('date')}
                className="px-2.5 py-2 text-left text-[11px] uppercase tracking-wider text-[#6b7280] cursor-pointer select-none hover:bg-gray-100"
              >
                Tanggal & Waktu <span className="ml-1 opacity-45">{getSortIndicator('date')}</span>
              </th>
              <th
                onClick={() => handleSort('user')}
                className="px-2.5 py-2 text-left text-[11px] uppercase tracking-wider text-[#6b7280] cursor-pointer select-none hover:bg-gray-100"
              >
                User <span className="ml-1 opacity-45">{getSortIndicator('user')}</span>
              </th>
              <th
                onClick={() => handleSort('type')}
                className="px-2.5 py-2 text-left text-[11px] uppercase tracking-wider text-[#6b7280] cursor-pointer select-none hover:bg-gray-100"
              >
                Aktivitas <span className="ml-1 opacity-45">{getSortIndicator('type')}</span>
              </th>
              <th
                onClick={() => handleSort('book')}
                className="px-2.5 py-2 text-left text-[11px] uppercase tracking-wider text-[#6b7280] cursor-pointer select-none hover:bg-gray-100"
              >
                Judul Buku <span className="ml-1 opacity-45">{getSortIndicator('book')}</span>
              </th>
              <th
                onClick={() => handleSort('status')}
                className="px-2.5 py-2 text-left text-[11px] uppercase tracking-wider text-[#6b7280] cursor-pointer select-none hover:bg-gray-100"
              >
                Status <span className="ml-1 opacity-45">{getSortIndicator('status')}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {pageItems.length > 0 ? (
              pageItems.map((activity, idx) => (
                <tr
                  key={idx}
                  onClick={() => onRowClick(activity)}
                  className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] cursor-pointer"
                >
                  <td className="px-2.5 py-2">{activity.date}</td>
                  <td className="px-2.5 py-2">{activity.user}</td>
                  <td className="px-2.5 py-2">{activity.type}</td>
                  <td className="px-2.5 py-2">{activity.book}</td>
                  <td className="px-2.5 py-2">{getStatusBadge(activity.type)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-2.5 py-2 text-center text-[#6b7280]">
                  Tidak ada aktivitas untuk filter ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center px-2.5 py-2 text-[11px] text-[#6b7280] border-t border-[#f3f4f6]">
        <span>{sortedData.length} aktivitas ditampilkan (filtered)</span>
        <div className="flex gap-1 items-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-full border border-[#e5e7eb] bg-white text-[11px] px-2 py-1 cursor-pointer text-[#111827] disabled:opacity-40 disabled:cursor-default hover:bg-gray-50 flex items-center gap-1"
          >
            <ChevronLeft className="w-3 h-3" />
            Prev
          </button>
          <span className="px-2">Page {currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-full border border-[#e5e7eb] bg-white text-[11px] px-2 py-1 cursor-pointer text-[#111827] disabled:opacity-40 disabled:cursor-default hover:bg-gray-50 flex items-center gap-1"
          >
            Next
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

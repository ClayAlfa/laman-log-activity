import { useState, useRef, useEffect } from 'react';
import { Download } from 'lucide-react';
import type { Activity } from './ActivityLog';

interface ExportMenuProps {
  data: Activity[];
  onShowToast: (message: string) => void;
}

export function ExportMenu({ data, onShowToast }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        exportAsPDF();
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        exportAsCSV();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyboard);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyboard);
    };
  }, [data]);

  const exportAsCSV = () => {
    const header = ['Tanggal & Waktu', 'User', 'Aktivitas', 'Judul Buku', 'Status', 'ID Transaksi'];
    const csvLines = [header.join(',')];
    data.forEach((a) => {
      csvLines.push([
        a.date,
        a.user,
        a.type.toUpperCase(),
        `"${a.book.replace(/"/g, '""')}"`,
        a.status,
        a.id,
      ].join(','));
    });
    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'laporan-aktivitas-pustaka.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast('Laporan Excel (.csv) berhasil diunduh.');
    setIsOpen(false);
  };

  const exportAsPDF = () => {
    const win = window.open('', '_blank');
    if (!win) return;
    
    const html = `
      <html>
        <head>
          <title>Laporan Aktivitas Pustaka – PDF</title>
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              margin: 20px;
              font-size: 12px;
            }
            h1 { font-size: 18px; }
            h2 { font-size: 14px; margin-top: 18px; }
            table {
              border-collapse: collapse;
              width: 100%;
              margin-top: 8px;
            }
            th, td {
              border: 1px solid #d1d5db;
              padding: 6px 8px;
              text-align: left;
            }
            th { background: #f3f4f6; }
            .meta {
              font-size: 11px;
              color: #4b5563;
            }
          </style>
        </head>
        <body>
          <h1>Laporan Aktivitas Pustaka</h1>
          <div class="meta">
            Dibangkitkan dari halaman Activity Log.<br/>
            Total aktivitas: ${data.length}
          </div>
          <h2>Ringkasan Aktivitas</h2>
          <table>
            <thead>
              <tr>
                <th>Tanggal & Waktu</th>
                <th>User</th>
                <th>Aktivitas</th>
                <th>Judul Buku</th>
                <th>Status</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              ${data.map((a) => `
                <tr>
                  <td>${a.date}</td>
                  <td>${a.user}</td>
                  <td>${a.type.toUpperCase()}</td>
                  <td>${a.book}</td>
                  <td>${a.status}</td>
                  <td>${a.id}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    win.document.open();
    win.document.write(html);
    win.document.close();
    onShowToast('Laporan PDF siap. Gunakan Print / Save as PDF di jendela baru.');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full border border-[#e5e7eb] px-3 py-1.5 text-xs bg-white flex items-center gap-1.5 hover:bg-gray-50"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Export</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+6px)] bg-white rounded-xl border border-[#e5e7eb] shadow-[0_16px_38px_rgba(15,23,42,0.16)] p-1 min-w-[180px] z-20">
          <div
            onClick={exportAsPDF}
            className="text-[13px] px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer text-[#111827] hover:bg-[#f3f4ff]"
          >
            <span>Export sebagai PDF</span>
            <span className="ml-auto text-[11px] text-[#6b7280]">Ctrl + Shift + P</span>
          </div>
          <div
            onClick={exportAsCSV}
            className="text-[13px] px-2.5 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer text-[#111827] hover:bg-[#f3f4ff]"
          >
            <span>Export sebagai Excel (.csv)</span>
            <span className="ml-auto text-[11px] text-[#6b7280]">Ctrl + Shift + X</span>
          </div>
        </div>
      )}
    </div>
  );
}

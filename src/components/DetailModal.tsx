import { X } from 'lucide-react';
import type { Activity } from './ActivityLog';

interface DetailModalProps {
  activity: Activity;
  onClose: () => void;
}

export function DetailModal({ activity, onClose }: DetailModalProps) {
  return (
    <div
      className="fixed inset-0 bg-[rgba(15,23,42,0.45)] flex items-center justify-center z-[70]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[18px] shadow-[0_22px_60px_rgba(15,23,42,0.5)] max-w-[420px] w-full p-4 md:p-5 text-[13px] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-1.5">
          <h3 className="text-[15px]">Detail Aktivitas</h3>
          <button
            onClick={onClose}
            className="border-none bg-transparent cursor-pointer text-lg leading-none text-[#6b7280] hover:text-[#111827]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>
          <dl className="m-0">
            <dt className="text-[11px] uppercase tracking-wider text-[#6b7280] mt-1.5">
              Tanggal & Waktu
            </dt>
            <dd className="m-0 text-[13px] text-[#111827]">{activity.date}</dd>

            <dt className="text-[11px] uppercase tracking-wider text-[#6b7280] mt-1.5">
              User
            </dt>
            <dd className="m-0 text-[13px] text-[#111827]">{activity.user}</dd>

            <dt className="text-[11px] uppercase tracking-wider text-[#6b7280] mt-1.5">
              Aktivitas
            </dt>
            <dd className="m-0 text-[13px] text-[#111827]">{activity.type.toUpperCase()}</dd>

            <dt className="text-[11px] uppercase tracking-wider text-[#6b7280] mt-1.5">
              Judul Buku
            </dt>
            <dd className="m-0 text-[13px] text-[#111827]">{activity.book}</dd>

            <dt className="text-[11px] uppercase tracking-wider text-[#6b7280] mt-1.5">
              Status
            </dt>
            <dd className="m-0 text-[13px] text-[#111827]">{activity.status}</dd>

            <dt className="text-[11px] uppercase tracking-wider text-[#6b7280] mt-1.5">
              ID Transaksi (dummy)
            </dt>
            <dd className="m-0 text-[13px] text-[#111827]">{activity.id}</dd>
          </dl>
        </div>
        <div className="mt-2.5 text-right text-[11px] text-[#6b7280]">
          Data ini diambil dari Activity Log berdasarkan filter saat ini.
        </div>
      </div>
    </div>
  );
}

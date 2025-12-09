import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
}

export function Toast({ message, show }: ToastProps) {
  return (
    <div
      className={`fixed left-1/2 bottom-[22px] -translate-x-1/2 bg-[#111827] text-[#f9fafb] text-xs px-3.5 py-2 rounded-full flex items-center gap-2 shadow-[0_18px_40px_rgba(15,23,42,0.55)] z-[80] transition-all duration-[220ms] ease-out ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[120%]'
      }`}
    >
      <CheckCircle className="w-3.5 h-3.5" />
      <span>{message}</span>
    </div>
  );
}

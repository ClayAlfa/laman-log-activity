import { Home, BookOpen, User, FileText, Settings } from 'lucide-react';

export function Sidebar() {
  const navItems = [
    { icon: Home, label: 'Dashboard', active: false },
    { icon: BookOpen, label: 'Books', active: false },
    { icon: User, label: 'Users', active: false },
    { icon: FileText, label: 'Activity Log', active: true },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <aside className="bg-gradient-to-b from-[#1d4ed8] to-[#1e3a8a] text-[#e5e7eb] p-5 flex flex-col gap-5 max-md:hidden">
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-[10px] bg-white flex items-center justify-center text-[#2563eb]">
            <span className="text-sm">P</span>
          </div>
          <div className="flex flex-col text-[13px] leading-tight md:max-lg:hidden">
            <span>Pustaka Nusa</span>
            <span className="text-[11px] opacity-80">Admin Dashboard</span>
          </div>
        </div>

        <nav className="mt-4 flex flex-col gap-1 text-sm">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`px-2.5 py-2 rounded-full flex items-center gap-2.5 cursor-pointer ${
                item.active
                  ? 'bg-white/20 text-white'
                  : 'text-[#d1d5db] hover:bg-white/10'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="flex-1 md:max-lg:hidden">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto text-[11px] opacity-80 md:max-lg:hidden">
        © 2025 Pustaka Nusa
      </div>
    </aside>
  );
}

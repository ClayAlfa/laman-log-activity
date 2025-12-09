interface FilterBarProps {
  period: string;
  setPeriod: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  selectedTypes: string[];
  setSelectedTypes: (value: string[]) => void;
  userSearch: string;
  setUserSearch: (value: string) => void;
  bookSearch: string;
  setBookSearch: (value: string) => void;
}

export function FilterBar({
  period,
  setPeriod,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedTypes,
  setSelectedTypes,
  userSearch,
  setUserSearch,
  bookSearch,
  setBookSearch,
}: FilterBarProps) {
  const types = [
    { value: 'borrow', label: 'Borrow' },
    { value: 'return', label: 'Return' },
    { value: 'queue', label: 'Queue' },
    { value: 'read', label: 'Read' },
    { value: 'expired', label: 'Expired' },
  ];

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2.5 items-center text-xs mt-1">
      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-[#6b7280] mr-1">Periode:</span>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-2 py-1.5 rounded-full border border-[#e5e7eb] bg-white text-xs text-[#111827] outline-none min-w-[140px]"
        >
          <option value="all">Semua periode</option>
          <option value="7">7 hari terakhir</option>
          <option value="30">30 hari terakhir</option>
          <option value="custom">Custom range</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setPeriod('custom');
          }}
          className="px-2 py-1.5 rounded-full border border-[#e5e7eb] bg-white text-xs text-[#111827] outline-none"
        />
        <span>–</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndDate(e.target.value);
            setPeriod('custom');
          }}
          className="px-2 py-1.5 rounded-full border border-[#e5e7eb] bg-white text-xs text-[#111827] outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-[#6b7280] mr-1">Aktivitas:</span>
        <div className="flex flex-wrap gap-1.5">
          {types.map((type) => (
            <label key={type.value} className="rounded-full border border-[#e5e7eb] px-2 py-1 flex items-center gap-1 text-[11px] bg-white cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                value={type.value}
                checked={selectedTypes.includes(type.value)}
                onChange={() => handleTypeToggle(type.value)}
                className="m-0"
              />
              {type.label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-[#6b7280] mr-1">Cari:</span>
        <input
          type="text"
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          placeholder="User..."
          className="px-2 py-1.5 rounded-full border border-[#e5e7eb] bg-white text-xs text-[#111827] outline-none min-w-[150px]"
        />
        <input
          type="text"
          value={bookSearch}
          onChange={(e) => setBookSearch(e.target.value)}
          placeholder="Judul buku..."
          className="px-2 py-1.5 rounded-full border border-[#e5e7eb] bg-white text-xs text-[#111827] outline-none min-w-[150px]"
        />
      </div>
    </div>
  );
}

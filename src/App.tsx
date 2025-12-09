import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ActivityLog } from './components/ActivityLog';
import { Toast } from './components/Toast';

export default function App() {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2600);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f8] grid grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr] md:grid-cols-[72px_1fr] max-md:grid-cols-1">
      <Sidebar />
      <ActivityLog onShowToast={handleShowToast} />
      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}

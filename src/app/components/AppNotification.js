import { useEffect } from 'react';

function AppNotification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);  // hides the notification after 5 seconds

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="flex fixed top-0 right-0 bg-green-500 text-white p-4 rounded-bl-lg shadow-lg">
      {message}
      <button className="ml-4 hover:bg-red-600 rounded-full" onClick={onClose}>X</button>
    </div>
  );
}

export default AppNotification;
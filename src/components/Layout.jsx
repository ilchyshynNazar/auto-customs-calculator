export default function Layout({ children }) {
  const status = import.meta.env.VITE_APP_STATUS || 'unknown';

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-7xl text-white shadow-lg relative">
        <header className="text-center mb-4">
          <h1 className="text-2xl font-bold">Калькулятор митних платежів</h1>
          <div className="text-sm text-gray-400 mt-1">
            Режим: {status}
          </div>
        </header>
        {children}
        <footer className="text-center mt-8 text-sm text-gray-500">
          © 2026 Auto Customs Calculator
        </footer>
      </div>
    </div>
  );
}
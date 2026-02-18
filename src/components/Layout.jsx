export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-7xl text-white shadow-lg">
        {children}
      </div>
    </div>
  );
}
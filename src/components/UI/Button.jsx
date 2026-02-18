export default function Button({ children, active, onClick }) {
  return (
    <button
      className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300
                  ${active ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"}
                  hover:bg-purple-500 hover:-translate-y-1 hover:scale-105 active:scale-95`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

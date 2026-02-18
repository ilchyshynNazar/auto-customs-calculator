export default function Button({ children, active, onClick }) {
  return (
    <button
      className={`flex flex-col items-center p-3 rounded-xl transition-all
                  ${active ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"}
                  hover:bg-purple-500`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

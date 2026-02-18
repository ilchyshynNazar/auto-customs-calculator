export default function Button({ children, active, onClick }) {
  return (
    <button
      className={`flex flex-col items-center p-3 rounded-xl transition-all
                  ${active ? "bg-green-600 text-white" : "bg-gray-800 text-gray-400"}
                  hover:bg-green-500`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
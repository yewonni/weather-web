export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-300 rounded-full animate-spin" />
    </div>
  );
}

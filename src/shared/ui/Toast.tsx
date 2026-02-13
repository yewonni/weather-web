import { useToastStore } from "@/shared/store/toastStore";

export default function Toast() {
  const message = useToastStore((s) => s.message);

  if (!message) return null;

  return (
    <div className="fixed bottom-8 left-0 right-0 z-[9999] flex justify-center pointer-events-none">
      <div className="bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}

interface ErrorMessageProps {
  title?: string;
  message: string;
}

export default function ErrorMessage({
  title = "오류가 발생했습니다",
  message,
}: ErrorMessageProps) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-800 font-medium mb-1">{title}</p>
      <p className="text-red-600 text-sm">{message}</p>
    </div>
  );
}

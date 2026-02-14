import { useNavigate } from "@tanstack/react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-5">404</h1>
          <p className="text-sub-title text-sub mb-2">
            페이지를 찾을 수 없습니다
          </p>
          <p className="text-body text-sub">
            요청하신 페이지가 존재하지 않거나 삭제되었습니다.
          </p>
        </div>

        <button
          onClick={() => navigate({ to: "/" })}
          className="px-6 py-3 bg-point text-white rounded-lg hover:bg-blue-500 transition"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

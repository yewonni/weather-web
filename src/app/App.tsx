import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import FavoriteNicknameModal from "@/features/favorites/components/FavoriteNicknameModal";
import Toast from "@/shared/ui/Toast";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen px-4 md:px-10 lg:px-30 py-10 lg:pb-12 max-w-[1200px] mx-auto">
        <Outlet />
      </main>
      <FavoriteNicknameModal />
      <Toast />
    </QueryClientProvider>
  );
}

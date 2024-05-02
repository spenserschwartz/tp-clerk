import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter as useBaseRouter } from "next/navigation";
import NProgress from "nprogress";

export default function useProgressRouter(): AppRouterInstance {
  const router: AppRouterInstance = useBaseRouter();

  const push = (...args: Parameters<typeof router.push>) => {
    NProgress.start();
    return router.push(...args);
  };

  return { ...router, push };
}

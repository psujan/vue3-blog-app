import { useSpinner as loadingSpinner } from "@/plugins/spinner";

export default function useSpinner() {
  const { loadSpinner } = loadingSpinner();
  const isLoading = (isLoading: boolean) => {
    loadSpinner(isLoading);
  };

  return {
    isLoading,
  };
}

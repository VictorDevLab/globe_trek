import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  //useSearchParams is a custom hook
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("long");
  return [lat, lng];
}

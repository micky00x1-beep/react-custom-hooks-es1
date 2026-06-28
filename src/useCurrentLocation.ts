import { useState } from "react";

interface Position {
  latitude: number;
  longitude: number;
}

export function useCurrentLocation() {
  const [position, setPosition] =
    useState<Position | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  function getCurrentPosition() {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });

        setLoading(false);
      },
      () => {
        setError("Posizione non disponibile");

        setLoading(false);
      }
    );
  }

  return {
    position,
    loading,
    error,
    getCurrentPosition,
  };
}
import { useState } from "react";

interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
}

export function useGithubUser() {
  const [user, setUser] = useState<GithubUser | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function fetchUser(username: string) {
    try {
      setLoading(true);

      setError("");

      const response = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!response.ok) {
        throw new Error("Utente non trovato");
      }

      const data = await response.json();

      setUser(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    loading,
    error,
    fetchUser,
  };
}
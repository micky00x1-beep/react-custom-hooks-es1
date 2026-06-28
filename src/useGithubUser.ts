import { useQuery } from "@tanstack/react-query";

interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
}

export function useGithubUser(username: string) {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery<GithubUser>({
    queryKey: ["githubUser", username],

    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!response.ok) {
        throw new Error("Utente non trovato");
      }

      return response.json();
    },

    enabled: false,
  });

  return {
    user: data,
    loading: isLoading,
    error: error ? (error as Error).message : "",
    refetch,
  };
}
import { useState } from "react";
import { useCounter } from "./useCounter";
import { useLogin } from "./useLogin";
import { useGithubUser } from "./useGithubUser";
import { useCurrentLocation } from "./useCurrentLocation";

function App() {
  const { count, increment, decrement, reset } = useCounter();

  const { values, handleChange } = useLogin();

  const [username, setUsername] = useState("");

  const {
    user,
    loading,
    error,
    refetch,
  } = useGithubUser(username);

  const {
    position,
    loading: loadingLocation,
    error: locationError,
    getCurrentPosition,
  } = useCurrentLocation();

  return (
    <div>
      <h1>Custom Hooks</h1>

      <hr />

      <h2>Counter</h2>

      <p>{count}</p>

      <button onClick={increment}>+</button>

      <button onClick={decrement}>-</button>

      <button onClick={reset}>Reset</button>

      <hr />

      <h2>Login</h2>

      <input
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder="Username"
      />

      <input
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
      />

      <hr />

      <h2>Github User</h2>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Github username"
      />

      <button onClick={() => refetch()}>
        Cerca
      </button>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {user && (
        <>
          <h3>{user.name}</h3>

          <p>{user.login}</p>

          <img
            src={user.avatar_url}
            width={150}
            alt={user.login}
          />
        </>
      )}

      <hr />

      <h2>Current Location</h2>

      <button onClick={getCurrentPosition}>
        Ottieni posizione
      </button>

      {loadingLocation && <p>Loading...</p>}

      {locationError && <p>{locationError}</p>}

      {position && (
        <>
          <p>Latitudine: {position.latitude}</p>

          <p>Longitudine: {position.longitude}</p>
        </>
      )}
    </div>
  );
}

export default App;       
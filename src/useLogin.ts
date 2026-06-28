import { useState } from "react";

export function useLogin() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  return {
    values,
    handleChange,
  };
}
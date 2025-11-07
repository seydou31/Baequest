import { useState } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  const [errors, setErrors] = useState({});
  let newErrors = {};

  function validate(data) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!emailPattern.test(data.email)) {
      return (newErrors.email =
        "Please provide a valid email (e.g., user@example.com");
    }
  
    if (!passwordPattern.test(data.password)) {
      return (newErrors.password =
        "password requires at least 8 characters, one uppercase, one lowercase, one number, and one special character:");
    }
    return "";
  }

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues((prevValues) => {
      const newValues = {
        ...prevValues,
        [name]: value,
      };

      validate(newValues);

      return newValues;
    });

    setErrors(newErrors);
  };

  const handleReset = () => {
    setValues(defaultValues);
  };

  return { errors, values, handleChange, handleReset, setValues };
}

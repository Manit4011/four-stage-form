"use client";
import { createContext, useContext, useState, useEffect } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
  // Initial empty state
  const [formData, setFormData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount (Hydration Guard) [cite: 25]
  useEffect(() => {
    const savedData = localStorage.getItem("enrollmentFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("enrollmentFormData", JSON.stringify(formData));
    }
  }, [formData, isLoaded]);

  // Helper to update specific fields
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, isLoaded }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  return useContext(FormContext);
}
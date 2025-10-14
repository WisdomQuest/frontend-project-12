import { useRef, useCallback } from 'react';

export const useFormFocus = (fieldNames) => {
  const refs = useRef({});

  const registerRef = (fieldName) => (el) => {
    refs.current[fieldName] = el;
  };

  const createKeyDownHandler = useCallback(
    (fieldName, onSubmit) => (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        const currentIndex = fieldNames.indexOf(fieldName);
        const nextIndex = currentIndex + 1;

        if (nextIndex < fieldNames.length) {
          const nextFieldName = fieldNames[nextIndex];
          refs.current[nextFieldName]?.focus();
        } else if (onSubmit) {
          onSubmit();
        }
      }
    },
    [fieldNames]
  );

  return {
    registerRef,
    createKeyDownHandler,
  };
};

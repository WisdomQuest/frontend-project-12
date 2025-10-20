import { useRef, useCallback } from 'react';

export const useFormFocus = (fieldNames) => {
  const fieldRefs = useRef({});

  const registerRef = useCallback((fieldName) => (element) => {
    if (element) {
      fieldRefs.current[fieldName] = element;
    }
  }, []);

  const focusNextField = useCallback((currentFieldName) => {
    const currentIndex = fieldNames.indexOf(currentFieldName);
    const nextIndex = currentIndex + 1;

    if (nextIndex < fieldNames.length) {
      const nextFieldName = fieldNames[nextIndex];
      fieldRefs.current[nextFieldName]?.focus();
      return true;
    }
    return false;
  }, [fieldNames]);

  const createKeyDownHandler = useCallback(
    (fieldName, onSubmit) => (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();

        const hasNextField = focusNextField(fieldName);
        
        if (!hasNextField && onSubmit) {
          onSubmit();
        }
      }
    },
    [focusNextField]
  );

  return {
    registerRef,
    createKeyDownHandler,
  };
};

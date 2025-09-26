import { useRef, useCallback } from 'react';
import _ from 'lodash';

export const useFormFocus = (fieldNames) => {
  const fieldRefs = useRef({});

  const registerFieldRef = useCallback((fieldName, ref) => {
    fieldRefs.current[fieldName] = ref;
  }, []);

  const handleKeyPress = useCallback((e, currentFieldName) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const fields = fieldNames || _.keys(fieldRefs.current);
      const currentIndex = _.indexOf(fields, currentFieldName);
      
      // Находим следующее незаполненное поле используя Lodash
      const nextEmptyField = _.find(fields, (fieldName, index) => {
        if (index <= currentIndex) return false;
        const fieldRef = _.get(fieldRefs.current, fieldName);
        return fieldRef && _.isEmpty(_.trim(fieldRef.value));
      });
      
      if (nextEmptyField) {
        const fieldRef = fieldRefs.current[nextEmptyField];
        fieldRef?.focus();
        return;
      }
      
      const form = e.target.form;
      const submitButton = form?.querySelector('button[type="submit"]');
      if (submitButton && !submitButton.disabled) {
        submitButton.click();
      }
    }
  }, [fieldNames]);

  const areAllFieldsFilled = useCallback(() => {
    return _.every(fieldRefs.current, ref => 
      ref && !_.isEmpty(_.trim(ref.value))
    );
  }, []);

  return {
    registerFieldRef,
    handleKeyPress,
    areAllFieldsFilled,
    fieldRefs: fieldRefs.current
  };
};
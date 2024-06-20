/**
 * custom hook to validate form
 */

import {useState, useCallback} from 'react';
import {useValidation} from './useValidation';
import {TextInputType} from 'components/commons';

type Validation<T> = {
  [key in keyof T]: TextInputType;
};

type Error<T> = {
  [key in keyof T]: string | null;
};

interface UseFormProps<T> {
  defaultValues?: T | null;
  validationRule?: Validation<T>;
}

type FormParams<T> = {
  value: string | string[];
  name: keyof T;
};

export const useForm = <T>({defaultValues, validationRule}: UseFormProps<T> = {}) => {
  const [values, setValues] = useState<T | null | undefined>(defaultValues);
  const [errors, setErrors] = useState<Error<T> | null>(null);
  const {validate} = useValidation();

  const register = useCallback(({value, name}: FormParams<T>) => {
    //@ts-ignore
    setValues(prevValues => ({...prevValues, [name]: value}));
    runValidations({value, name});
  }, []);

  const runValidations = ({name, value}: FormParams<T>) => {
    const rule = !!validationRule ? validationRule[name] : 'text';
    let error = null;
    error = validate({value, fieldType: rule});
    //@ts-ignore
    setErrors(prevErrors => ({...prevErrors, [name]: error}));
  };

  const handleSubmit = useCallback(
    (onSubmit: (v: T) => void) => {
      if (errors == null) {
        // @ts-ignore
        const newErrors = Object.keys(values).reduce((acc, key) => {
          // @ts-ignore
          return {...acc, [key]: 'Required'};
        }, {} as Error<T>);
        setErrors(newErrors);
        return;
      }
      if (Object.values(errors as Error<T>).every(error => error == null)) {
        onSubmit(values as T);
      }
    },
    [values],
  );

  return {values, errors, register, handleSubmit};
};

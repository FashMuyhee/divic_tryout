import {TextInputType} from 'components/types';

export type FieldValidationParams = {
  value: string | string[];
  fieldType: TextInputType;
};

export type FieldError<T> = {
  [key in keyof T]: string | null;
};

export interface FieldValidation {
  validate: ({value, fieldType}: FieldValidationParams) => string | null;
}

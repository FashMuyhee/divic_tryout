import {FieldValidation, FieldValidationParams} from './type';

/**
 * validate email string
 * @param email
 */
const isValidEmail = (email: string) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

const isValidUrl = (url: string) => {
  const regex = /^((http|https):\/\/)?([a-zA-Z0-9]+[.])+[a-zA-Z]{2,}(?:[:\/][^\s?]*)?$/;

  return regex.test(url);
};

export const useValidation = (): FieldValidation => {
  const validate = ({value, fieldType}: FieldValidationParams) => {
    let error = null;
    if (!value) {
      error = 'Required';
      return error;
    }
    switch (fieldType) {
      case 'email':
        if (isValidEmail(String(value))) {
          error = null;
        } else error = 'Invalid email';
        break;
      case 'password':
        if (value.length < 8) {
          error = '8 Character required';
        }
        break;
      case 'url':
        if (isValidUrl(String(value))) {
          error = null;
        } else error = 'Invalid url';
        break;
      default:
        error = null;
        break;
    }
    return error;
  };

  return {validate};
};

import { inputErrorMessage } from '../../../@types';

function InputError({ inputError, inputName }: { inputError?: inputErrorMessage[]; inputName: string }) {
  const error = inputError?.find((error) => error.inputName === inputName);

  return error?.isValid === false && <p className='text-brand-red-primary text-xs md:text-sm mt-2'>{error.errorMessage}</p>;
}

export default InputError;

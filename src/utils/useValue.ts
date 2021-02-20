/* eslint-disable no-unused-vars */
import { ChangeEvent, useState } from 'react';

export type IUseValue = [string, (event: ChangeEvent<HTMLInputElement> |
  ChangeEvent<HTMLSelectElement>) => void];

const useValue = (initialValue = ''): IUseValue => {
  const [value, setValue] = useState(initialValue);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return [value, handleOnChange];
};

export default useValue;

import { KeyboardEvent } from 'react';

export default function typeOnlyNumbers(e: KeyboardEvent<HTMLInputElement>):void {
  const regex = /[0-9]/;
  const { key } = e;

  if (key.length < 2 && !regex.test(key)) { e.preventDefault(); }
}

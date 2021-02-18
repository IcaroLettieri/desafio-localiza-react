import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

/* Example of use
 * const date = new Date();
 * formatDate(date, "dd'/'MM'/'yyyy'") -> return 01/12/2021
 * formatDate(date, "yyyy'-'MM'-'dd'") -> return 2021-12-01
 *
 * formatDate(date, "dd'/'MM'/'yyyy'", 10) -> return 11/12/2021
 * formatDate(date, "yyyy'-'MM'-'dd'", 10) -> return 2021-12-11
 */

const formatDate = (date: Date|string, toFormat: string, daysToIncrement?: number) => {
  const dateParse = new Date(date);

  if (daysToIncrement) {
    dateParse.setDate(dateParse.getDate() + daysToIncrement);
  }

  const formattedDate = format(
    dateParse,
    toFormat,
    { locale: pt },
  );
  return formattedDate;
};

export default formatDate;

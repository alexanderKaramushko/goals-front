/**
 * @param num
 * @param declinations – пример: [дней, день, дня]
 * @returns
 */
export const decline = (num: number, declinations: [string, string, string]) => {
  const absDays = Math.abs(num);
  const lastDigit = absDays % 10;
  const lastTwoDigits = absDays % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return declinations[0];
  if (lastDigit === 1) return declinations[1];
  if (lastDigit >= 2 && lastDigit <= 4) return declinations[2];

  return declinations[0];
};


export function isValidCPF(cpf: string): boolean {
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const calcDigit = (slice: string, weight: number) => {
    const sum = slice
      .split("")
      .reduce((acc, num, i) => acc + Number(num) * (weight - i), 0);
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  const firstDigit = calcDigit(cpf.slice(0, 9), 10);
  const secondDigit = calcDigit(cpf.slice(0, 10), 11);

  return firstDigit === Number(cpf[9]) && secondDigit === Number(cpf[10]);
}

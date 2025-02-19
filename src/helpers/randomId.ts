export function randomDigit() {
  return Math.floor(Math.random() * 10);
}

export function digitCalculation(cpfArray: any[]) {
  let sum = 0;
  for (let i = 0; i < cpfArray.length; i++) {
    sum += cpfArray[i] * (cpfArray.length + 1 - i);
  }
  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

export function generateCPF() {
  const cpf = [];
  for (let i = 0; i < 9; i++) {
    cpf.push(randomDigit());
  }
  cpf.push(digitCalculation(cpf));
  cpf.push(digitCalculation(cpf));

  return cpf.join("");
}

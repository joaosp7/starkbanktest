import { generateCPF } from "../src/helpers/randomId";
import { isValidCPF } from "../src/helpers/validateId";

describe("CPF randomly generated", () => {
  test("CPF 22222222222 should be invalid", () => {
    expect(isValidCPF("22222222222")).toBeFalsy();
  });
  test("random cpf should be valid", () => {
    expect(isValidCPF(generateCPF())).toBeTruthy();
  });
});

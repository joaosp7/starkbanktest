import starkbank from "starkbank";
import { faker } from "@faker-js/faker";
import { env } from "./env/env";
import { generateCPF } from "./helpers/randomId";
import { Request } from "express";

export async function generateInvoice(invoiceList: any[]) {
  await setupStarkbank();
  try {
    const invoices = await starkbank.invoice.create(invoiceList);
    console.log(invoices);
  } catch (e: any) {
    console.error(e);
  }
}

export async function setupStarkbank() {
  const project = new starkbank.Project({
    environment: "sandbox",
    id: env.PROJECT_ID,
    privateKey: env.PRIVATE_KEY,
  });

  starkbank.user = project;
}

export function generateData(n: number) {
  const data = [];
  for (let i = 0; i < n; i++) {
    const invoiceData = {
      amount: Math.floor(Math.random() * 1000),
      taxId: String(generateCPF()),
      name: faker.person.fullName(),
    };
    data.push(invoiceData);
  }
  return data;
}
export async function transfer(req: Request) {
  const { event } = req.body;
  if (!event?.log?.invoice || event?.log?.type !== "paid") return null;
  const invoice = event.log.invoice;
  const amount = invoice.amount;
  if (amount === 0) return null;
  const transaction: any = createTransactionObject(amount);
  await setupStarkbank();
  try {
    const transfer = await starkbank.transfer.create([transaction]);
    console.log(transfer);
  } catch (e: any) {
    console.error(e);
  }
}

export function createTransactionObject(amount: number | string) {
  const date = new Date();
  const today = date.toISOString().split("T")[0];
  return {
    amount: amount,
    bankCode: env.BANK_CODE,
    branchCode: env.BANK_BRANCH_CODE,
    accountNumber: env.BANK_ACCOUNT_NUMBER,
    accountType: "payment",
    taxId: env.BANK_TAXID,
    name: env.BANK_NAME,
    scheduled: today,
  };
}

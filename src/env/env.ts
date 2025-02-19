import z from "zod";
import dotevn from "dotenv";

dotevn.config();
const myEnvSchema = z.object({
  PROJECT_ID: z.string(),
  PRIVATE_KEY: z.string(),
  BANK_NAME: z.string(),
  BANK_TAXID: z.string(),
  BANK_CODE: z.string(),
  BANK_BRANCH_CODE: z.string(),
  BANK_ACCOUNT_NUMBER: z.string(),
});

const envParse = myEnvSchema.safeParse(process.env);

if (!envParse.success) throw new Error("Invalid env configuration files");

export const env = envParse.data;

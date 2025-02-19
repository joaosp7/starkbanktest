import express, { Request } from "express";
import { generateData, generateInvoice, transfer } from "./service";

const app = express();
app.use(express.json());

app.get("/check", (req, res) => {
  res.json({ message: "Server ok!" });
});

app.get("/invoice", async (req, res) => {
  const n = Math.floor(Math.random() * (12 - 8) + 8);
  const data = generateData(n);
  await generateInvoice(data);
  res.json({ message: "ok" });
});

app.post("/webhook", async (req: Request, res) => {
  console.log(req.body);
  console.log(req.body.event.log.invoice);
  await transfer(req);

  res.json({ message: "Message received." });
});

app.listen(8080, () => {
  console.log("Server up and running on port 8080!");
});

import express from "express";
import cors from "cors";
import "dotenv/config";
// import petsRouter from ".src/v1/routes/pets.js";
import petsRouter from "./src/v1/routes/pets.js";
import medicationsRouter from "./src/v1/routes/medications.js";
import logsRouter from "./src/v1/routes/logs.js";
import prescriptionsRouter from "./src/v1/routes/prescriptions.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(petsRouter);
app.use(medicationsRouter);
app.use(logsRouter);
app.use(prescriptionsRouter);

app.use((req, res) => {
  return res.status(404).json({ response: "Endpoint not exist" });
});

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`App started on port ${process.env.PORT}`);
});

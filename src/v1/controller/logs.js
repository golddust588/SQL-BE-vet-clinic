import db from "../../../db.js";

const GET_ALL_LOGS_BY_ID = async (req, res) => {
  const pet_id = req.params.id;
  try {
    const logs = await db.query(
      `SELECT * 
      from "Logs" LEFT JOIN "Pets" 
      ON "Pets".id = "Logs"."pet_id" 
      WHERE "Pets".id=${pet_id}`
    );
    console.log(logs);
    if (!logs.rowCount) {
      return res.status(404).json({ response: "Log not found" });
    }
    return res.json({ logs: logs.rows });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

const ADD_LOG_BY_ID = async (req, res) => {
  const pet_id = req.params.id;
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ response: "Invalid input data" });
  }

  try {
    const log = await db.query(`
      INSERT INTO public."Logs"(pet_id, description)
      VALUES (${pet_id}, '${description}')
    `);

    return res.status(201).json({ response: "Log was added", log });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

export { GET_ALL_LOGS_BY_ID, ADD_LOG_BY_ID };

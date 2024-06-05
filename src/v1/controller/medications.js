import db from "../../../db.js";

const GET_ALL_MEDICATIONS = async (req, res) => {
  try {
    const medications = await db.query('SELECT * from "Medications"');
    return res.json({ medications: medications.rows });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

const ADD_MEDICATION = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ response: "Invalid input data" });
  }

  try {
    const medication = await db.query(`
      INSERT INTO public."Medications"(name, description)
      VALUES ('${name}', '${description}')
    `);

    return res
      .status(201)
      .json({ response: "Medication was added", medication });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

export { GET_ALL_MEDICATIONS, ADD_MEDICATION };

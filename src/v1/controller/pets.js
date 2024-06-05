import db from "../../../db.js";

const GET_ALL_PETS = async (req, res) => {
  try {
    const pets = await db.query('SELECT * from "Pets"');
    return res.json({ pets: pets.rows });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

const ADD_PET = async (req, res) => {
  const { name, dob, client_email } = req.body;

  if (!name || !dob || !client_email) {
    return res.status(400).json({ response: "Invalid input data" });
  }

  try {
    const pet = await db.query(`
      INSERT INTO public."Pets"(name, dob, client_email)
      VALUES ('${name}', '${dob}', '${client_email}')
    `);

    return res.status(201).json({ response: "Pet was added", pet });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

const DELETE_PET = async (req, res) => {
  try {
    const pet = await db.query(
      `UPDATE "Pets" SET "isArchived" = 1 WHERE id=${req.params.id} `
    );
    if (!pet.rowCount) {
      return res.status(404).json({ response: pet, status: "Pet not found" });
    }
    return res.json({ response: pet, status: "Pet was deleted" });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ status: "Something went wrong" });
  }
};

export { GET_ALL_PETS, ADD_PET, DELETE_PET };

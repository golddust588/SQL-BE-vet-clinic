import db from "../../../db.js";

const GET_ALL_PRESCRIPTIONS_BY_ID = async (req, res) => {
  //by pet_id
  const pet_id = req.params.id;
  try {
    // reikia INNER JOIN NAUDOTI kad nemestu fieldu kur yra pets bet nera prescription
    const prescriptions = await db.query(`SELECT * 
    FROM "Prescriptions" FULL JOIN "Pets"
    ON "Prescriptions"."pet_id" = "Pets".id
    FULL JOIN "Medications"
    ON "Prescriptions"."medication_id" = "Medications".id   
    WHERE "Pets".id = ${pet_id}`);
    console.log(prescriptions);
    // if (!prescriptions.rows[0]) {
    //   return res.status(404).json({ response: "prescription not found" });
    // }
    return res.json({ prescriptions: prescriptions.rows });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

const ADD_PRESCRIPTION_BY_ID = async (req, res) => {
  const pet_id = req.params.id;
  const { medication_id, comment } = req.body;

  if (!medication_id || !comment) {
    return res.status(400).json({ response: "Invalid input data" });
  }

  try {
    const prescription = await db.query(`
      INSERT INTO public."Prescriptions"(medication_id, pet_id, comment)
      VALUES (${medication_id}, ${pet_id}, '${comment}')
    `);

    return res
      .status(201)
      .json({ response: "Prescription was added", prescription });
  } catch (err) {
    console.log("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong" });
  }
};

export { GET_ALL_PRESCRIPTIONS_BY_ID, ADD_PRESCRIPTION_BY_ID };

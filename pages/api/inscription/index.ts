import type { NextApiRequest, NextApiResponse } from "next";
import Inscription from "../../../interfaces/inscription";
import db from "../../../config/db";
import { getSession } from "next-auth/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const request: Inscription = req.body;

      const data: Inscription = {
        nom: request.nom.replace(/'/g, "''"),
        prenom: request.prenom.replace(/'/g, "''"),
        email: request.email.replace(/'/g, "''"),
        phone: request.phone.replace(/'/g, "''"),
        cin: request.cin.replace(/'/g, "''"),
        date_naissance: request.date_naissance,
        site: request.site.replace(/'/g, "''"),
        formation: request.formation.replace(/'/g, "''"),
        diplome: request.diplome.replace(/'/g, "''"),
        specialite: request.specialite?.replace(/'/g, "''"),
        etablissment: request.etablissment?.replace(/'/g, "''"),
        mention: request.mention?.replace(/'/g, "''"),
        adresse: request.adresse?.replace(/'/g, "''"),
        deposition: request.deposition,
      };

      const sql = `INSERT INTO Inscriptions 
      VALUES(
            ${null},
            '${data.nom}',
            '${data.prenom}',
            '${data.email}',
            '${data.phone}',
            '${data.cin}',
            '${data.date_naissance}',
            '${data.site}',
            '${data.formation}',
            '${data.diplome}',
            '${data.specialite}',
            '${data.etablissment}',
            '${data.mention}',
            '${data.adresse}',
            '${data.deposition}'
        )`;

      const [result, _] = await db.execute(sql);
      return res.status(201).json({ result });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  }
  if (req.method === "GET") {
    const session = await getSession({ req });

    try {
      const sql = "SELECT * FROM Inscriptions;";

      const [result, _] = await db.execute(sql);
      // console.log(result);
      return res.status(200).json(result);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
  if (req.method === "DELETE") {
    const session = await getSession({ req });

    if (session) {
      try {
        const { id } = req.query;

        const sql1 = `DELETE FROM Inscriptions WHERE id=${id}`;
        const [result1, __] = await db.execute(sql1);

        return res.status(201).json({ success: "You are done!" });
      } catch (error) {
        res.status(500).json({ error: "Server Error" });
      }
    } else {
      return res.status(401).json({ message: "Not authenticated" });
    }
  }
}

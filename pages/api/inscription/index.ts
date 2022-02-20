import type { NextApiRequest, NextApiResponse } from "next";
import Inscription from "../../../interfaces/inscription";
import db from "../../../config/db";

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
            '${data.adresse}'
        )`;

      const [result, _] = await db.execute(sql);
        return res.status(201).json({ result });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  }
  if (req.method === "GET") {
    try {
      const sql = "SELECT * FROM Inscriptions;";

      const [result, _] = await db.execute(sql);
      return res.status(200).json(result);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
}

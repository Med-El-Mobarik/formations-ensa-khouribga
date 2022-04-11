import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../config/db";
import { getSession } from "next-auth/react";
// import formidable from "formidable";
import Formation from "../../../interfaces/fullFormation";
// import fs from "fs";
// import path from "path";
// import axios from "../../../axios/axios";

// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (session) {
      try {
        const body: Formation = {
          ...req.body,
        };

        const data: Formation = {
          type: body.type,
          name: body.name.replace(/'/g, "''"),
          pole: body.pole,
          frais_formation: body.frais_formation.replace(/'/g, "''"),
          objectif: body.objectif.replace(/'/g, "''"),
          frais_entretien: body.frais_entretien.replace(/'/g, "''"),
          admission: body.admission.replace(/'/g, "''"),
          domaine: body.domaine.replace(/'/g, "''"),
          type_formation: body.type_formation.replace(/'/g, "''"),
          duree: body.duree.replace(/'/g, "''"),
          organisation: body.organisation.replace(/'/g, "''"),
          deposition: body.deposition.replace(/'/g, "''"),
          entretien: body.entretien.replace(/'/g, "''"),
          debouches: body.debouches.replace(/'/g, "''"),
          image_name: body.image_name?.replace(/'/g, "''"),
          icons_name: body.icons_name?.replace(/'/g, "''"),
        };

        const sql = `INSERT INTO Formations VALUES(
                    ${null},
                    '${data.type}',
                    '${data.name}',
                    ${data.pole},
                    '${data.objectif}',
                    '${data.frais_formation}',
                    '${data.frais_entretien}',
                    '${data.admission}',
                    '${data.domaine}',
                    '${data.type_formation}',
                    '${data.duree}',
                    '${data.organisation}',
                    '${data.deposition}',
                    '${data.entretien}',
                    '${data.debouches}',
                    '${data.image_name}',
                    '${data.icons_name}'
                )`;

        try {
          const [result, _] = await db.execute(sql);
          return res.status(201).json({ result });
        } catch (error) {
          console.log(error);
          return res.status(500);
        }
      } catch (error) {
        return res.status(500);
      }
    } else {
      return res.status(401).json({ message: "Not authenticated" });
    }
  }
  if (req.method === "DELETE") {
    const session = await getSession({ req });

    if (session) {
      try {
        const { id } = req.query;

        const sql1 = `DELETE FROM Modules WHERE formation=${id}`;
        const [result1, __] = await db.execute(sql1);

        const sql = `DELETE FROM Formations WHERE id=${id}`;
        const [result, _] = await db.execute(sql);

        res.status(200).json({ message: "success" });
      } catch (error: any) {
        console.log(error.message);
        return res.status(500).json({ error: "Server Error" });
      }
    } else {
      return res.status(401).json({ message: "Not authenticated" });
    }
  }
}

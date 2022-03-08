import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../config/db";
import { getSession } from "next-auth/client";
import formidable from "formidable";
import Formation from "../../../interfaces/fullFormation";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (session) {
      console.log(req.cookies);
      try {
        const globData: any = await new Promise(function (resolve, reject) {
          const form = new formidable.IncomingForm({
            // uploadDir: "./public/img/formations",
            uploadDir: "./files",
            keepExtensions: true,
            filename: function (name, ext) {
              return `${new Date().getDate()}${new Date().getHours()}${name}${ext}`;
            },
          });
          form.parse(req, function (err, fields, files) {
            if (err) return reject(err);
            resolve({ fields, files });
          });
        });

        const temp = `${new Date().getDate()}${new Date().getHours()}${
          globData.files.file.originalFilename
        }`;
        const img_nom = temp.replace(/'/g, "''");

        const body: Formation = {
          ...globData.fields,
          pole: parseInt(globData.fields.pole),
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
          image_name: img_nom,
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
                    '${data.image_name}'

                )`;

        const [result, _] = await db.execute(sql);

        return res.status(201).json({ result });
      } catch (error) {
        res.status(500);
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
        res.status(500).json({ error: "Server Error" });
        console.log(error.message);
      }
    } else {
      return res.status(401).json({ message: "Not authenticated" });
    }
  }
}

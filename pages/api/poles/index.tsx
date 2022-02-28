import type { NextApiRequest, NextApiResponse } from "next";
import Inscription from "../../../interfaces/inscription";
import db from "../../../config/db";
import { getSession } from "next-auth/client";

interface Req {
  name: string;
  type: string;
  formationsIds: number[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (session) {
      try {
        const request: Req = req.body;

        const data = {
          name: request.name.replace(/'/g, "''"),
          type: request.type,
        };

        let sql = `INSERT INTO Poles 
      VALUES(
            ${null},
            '${data.name}',
            '${data.type}'
        )`;

        const [result, _] = await db.execute(sql);

        const poleId = result.insertId;

        let list = "(";

        request.formationsIds.map((formation, id) => {
          if (id === 0) {
            list = list + `${formation}`;
          } else {
            list = list + `,${formation}`;
          }
        });

        list = list + ")";

        sql = `UPDATE Formations SET pole=${poleId} WHERE id IN ${list}`;

        const [result_1, __] = await db.execute(sql);

        return res.status(201).json({ success: true });
      } catch (error: any) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
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

        const sql1 = `DELETE FROM Poles WHERE id=${id}`;
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

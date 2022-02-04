import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../config/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sql = `SELECT * FROM Formations WHERE id=${req.query.id} ;`;
    const sql1 = `SELECT id, name, semestre FROM Modules WHERE formation=${req.query.id}`;

    const [result, _] = await db.execute(sql);
    const [result1, __] = await db.execute(sql1);

    return res.status(200).json({ formation: result, modules: result1 });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: true });
  }
}

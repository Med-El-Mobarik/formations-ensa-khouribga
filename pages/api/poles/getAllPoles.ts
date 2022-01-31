import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../config/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sql = "SELECT * FROM Poles;";

    const [result, _] = await db.execute(sql);
    return res.status(200).json(result);
  } catch (error:any) {
    console.log(error.message);
    return res.status(500).json({ error: true });
  }
}

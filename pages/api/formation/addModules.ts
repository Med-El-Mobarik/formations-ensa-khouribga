import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../config/db";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getSession({ req });

    if (session) {
      try {
        const { sem1, sem2, sem3, id } = req.body;

        console.log(sem1);
        console.log(sem2);
        console.log(sem3);

        let sql = "INSERT INTO Modules Values ";

        if (sem1.length !== 0) {
          sem1.map(async (e: string, idd: number) => {
            if (idd === 0) {
              sql = sql + `(${null},'${e}',${1},${id})`;
            } else {
              sql = sql + `,(${null},'${e}',${1},${id})`;
            }
          });
        }
        if (sem2.length !== 0) {
          sem2.map(async (e: string) => {
            sql = sql + `,(${null},'${e}',${2},${id})`;
          });
        }
        if (sem3.length !== 0) {
          sem3.map(async (e: string) => {
            sql = sql + `,(${null},'${e}',${3},${id})`;
          });
        }

        // console.log(sql);
        const [result, fields] = await db.execute(sql);
        console.log(result);
        console.log(fields);

        return res.status(201).json({ success: "You are done!" });
      } catch (error) {
        res.status(500).json({ error: "Server Error" });
      }
    } else {
      return res.status(401).json({ message: "Not authenticated" });
    }
  }
}

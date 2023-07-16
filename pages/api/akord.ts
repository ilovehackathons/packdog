import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  email?: string,
  password?: string

};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    email: process.env.AKORD_EMAIL,
    password: process.env.AKORD_PASSWORD,
  }
  );
}

// curl localhost:9933/api/akord
// curl https://packdog.vercel.app/api/akord

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

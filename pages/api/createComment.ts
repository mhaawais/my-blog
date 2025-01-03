import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(`Received ${req.method} request to /api/createComment`);
  
    if (req.method === "POST") {
      try {
        const { name, email, comment, _id } = req.body;
        console.log("New comment:", { _id, name, email, comment });
  
        res.status(200).json({ message: "Comment submitted successfully!" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to submit comment." });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  

  
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { mongodb } from "../../../src/library/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(400).json({ error: "Must be a get" });

  // if there is no session send that user back to homepage
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session)
    return res.status(401).end("You do not have permission to do this.");

  const db = await mongodb();
  const recipesToTry = await db
    .collection("recipes")
    .find({ author: "aviantechtrades@gmail.com" })
    .limit(3)
    .toArray();
  if (!recipesToTry)
    return res.status(400).json({ error: "No sample recipes" });

  return res.status(200).json({ success: recipesToTry });
}

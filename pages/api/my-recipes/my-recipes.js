import { mongodb } from "../../../src/library/mongodb";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

export default async function handler(req, res) {
  console.log("UHHHHHH");
  //check if button was clicked on client
  if (req.method !== "GET") return res.json({ error: "Must be get" });
  //check if there is a session
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session)
    return res.json({ error: "You need to be signed in to do that." });
  //get recipes from mongo
  //get recipes for logged in user
  const db = await mongodb();
  const recipes = await db
    .collection("recipes")
    .find({ author: session.user.email })
    .limit(6)
    .toArray();
  if (!recipes || recipes.length == 0)
    return res.json({ error: "No recipes have been created yet." });
  return res.status(200).json({ success: recipes });
}

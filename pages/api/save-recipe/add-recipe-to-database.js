import { authOptions } from "../auth/[...nextAuth]";
import { unstable_getServerSession } from "next-auth";
import { mongodb } from "../../../src/library/mongodb";

export default async function handler(req, res) {
  //check if button was clicked on client
  if (req.method !== "POST") return res.json({ error: "Must be post" });
  //check if there is a session
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session)
    return res.json({ error: "You need to be signed in to do that." });
  //handle body && body errors
  const { ingredients, introduction, recipeName, directions } = JSON.parse(
    req.body
  );
  if (!ingredients.length)
    return res.json({ error: "You seem to be missing ingredients." });
  if (!recipeName)
    return res.json({ error: "Oops. You forgot to name your recipe." });
  if (!directions)
    return res.json({ error: "Make sure to add some directions!" });
  //get rid of ingredients in object that are undefined
  const ingredientsFormattedNicely = ingredients.reduce(
    (myCustomArr, iterator) => {
      let obj = {};
      for (const key in iterator) {
        if (iterator[key] !== "" && key !== "id") {
          obj[key] = iterator[key];
        }
      }

      myCustomArr.push(obj);

      return myCustomArr;
    },
    []
  );
  // connect to mongo and update the user with
  const db = await mongodb();
  const save = await db.collection("recipes").insertOne({
    author: session.user.email,
    title: recipeName,
    introduction: introduction || null,
    ingredients: ingredientsFormattedNicely,
    directions,
  });

  if (!save)
    return res.json({
      error: "Something went wrong. Please try saving agian.",
    });

  res.json({ success: true });
}

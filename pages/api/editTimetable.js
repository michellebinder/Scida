// //THIS IS AN EXAMPLE OF HOW TO SECURE AN API BY ACOUNT ROLES
// import { getSession } from "next-auth/react";

// export default async (req, res) => {
//   const session = await getSession({ req });

//   //Check if a session exists
//   if (session) {
//     //Try to recieve correct user role
//     var role;
//     try {
//       //Try ldap, if not existent do catch with local accounts
//       role = session.user.attributes.UniColognePersonStatus;
//     } catch {
//       role = session.user.account_role;
//     }

//     //Check if users role is allowed to contact api, here role A (Admin i.e. Dekanat) and B (Beschäftigte i.e Sekretariat) is allowed
//     // if (role === "scidaDekanat" || role === "scidaSekretariat") {
//       const body = req.body;
//       const data = body.transferData;
//       console.log(transferData);
//     }
//     //Return unAUTHORIZED if wrong role
//     else {
//       res.status(401).json({ error: "Unauthorized user -> Wrong role" });
//     }
//   }
//   //Return unAUTHENTICATED if not logged in
//   else {
//     res.status(401).json({ error: "Unauthenticated user -> Not logged in" });
//   }
// };

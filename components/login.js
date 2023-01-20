// import Head from "next/head";
// import Navbar from "./navbar";
// import Link from "next/link";
// import { useState } from "react";
// import { sendEtagResponse } from "next/dist/server/send-payload";
// import { signIn } from "next-auth/react";

// //TODO: Refactor code in component / use state to only change neccessary texts
// export default function Login({ type = "" }) {
//   const [toggleState, setToggleState] = useState(1);

//   const toggleTab = (index) => {
//     setToggleState(index);
//   };

//   //Variables that are manipulated by the html below
//   const [email, createEmail] = useState("");
//   const [password, createPassword] = useState("");

//   const handleSubmitCredentials = async (event) => {
//     event.preventDefault();
//     await signIn("credentials", { email: email, password: password });
//   };
//   const handleSubmitLDAP = async (event) => {
//     event.preventDefault();
//     await signIn("LDAP", { email: email, password: password });
//   };

//   return (
//     <div>
//       <div className="tabs tabs-boxed rounded-none rounded-t-lg max-sm:bg-base-100 dark:bg-neutral">
//         <button
//           className={toggleState === 1 ? "tab tab-active" : "tab"}
//           onClick={() => toggleTab(1)}
//         >
//           Studierende
//         </button>
//         <button
//           className={toggleState === 2 ? "tab tab-active" : "tab "}
//           onClick={() => toggleTab(2)}
//         >
//           Dozierende
//         </button>
//         <button
//           className={toggleState === 3 ? "tab tab-active" : "tab "}
//           onClick={() => toggleTab(3)}
//         >
//           Mitarbeitende
//         </button>
//       </div>

//       <div
//         className={
//           toggleState === 1
//             ? "card rounded-none rounded-b-lg flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-neutral"
//             : "hidden card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-neutral"
//         }
//       >
//         <div className="card-body">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <input
//               type="text"
//               value={email}
//               placeholder="Studierenden-Email"
//               className="input input-bordered"
//               onChange={(e) => createEmail(e.target.value)}
//             />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Passwort</span>
//             </label>
//             <input
//               type="password"
//               value={password}
//               placeholder="Passwort"
//               className="input input-bordered"
//               onChange={(e) => createPassword(e.target.value)}
//             />
//             <label className="label">
//               <a href="#" className="label-text-alt link link-hover">
//                 Passwort vergessen?
//               </a>
//             </label>
//           </div>
//           <div className="form-control mt-6">
//             <button
//               onClick={handleSubmitCredentials}
//               className="btn btn-primary"
//             >
//               Einloggen mit Credentials
//             </button>
//             <button onClick={handleSubmitLDAP} className="btn btn-primary mt-3">
//               Einloggen mit LDAP
//             </button>
//           </div>
//         </div>
//       </div>

//       <div
//         className={
//           toggleState === 2
//             ? "card rounded-none rounded-b-lg flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-neutral"
//             : "hidden card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-neutral"
//         }
//       >
//         <div className="card-body">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <input
//               type="text"
//               value={email}
//               placeholder="Dozierenden-Email"
//               className="input input-bordered"
//               onChange={(e) => createEmail(e.target.value)}
//             />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Passwort</span>
//             </label>
//             <input
//               type="password"
//               value={password}
//               placeholder="Passwort"
//               className="input input-bordered"
//               onChange={(e) => createPassword(e.target.value)}
//             />
//             <label className="label">
//               <a href="#" className="label-text-alt link link-hover">
//                 Passwort vergessen?
//               </a>
//             </label>
//           </div>
//           <div className="form-control mt-6">
//             <button
//               onClick={handleSubmitCredentials}
//               className="btn btn-primary"
//             >
//               Einloggen mit Credentials
//             </button>
//             <button onClick={handleSubmitLDAP} className="btn btn-primary mt-3">
//               Einloggen mit LDAP
//             </button>
//           </div>
//         </div>
//       </div>

//       <div
//         className={
//           toggleState === 3
//             ? "card rounded-none rounded-b-lg flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-neutral"
//             : "hidden card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-neutral"
//         }
//       >
//         <div className="card-body">
//           <div className="form-control">
//             <label htmlFor="email" className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="text"
//               onChange={(e) => createEmail(e.target.value)}
//               placeholder="Mitarbeitenden-Email"
//               className="input input-bordered"
//             />
//           </div>
//           <div className="form-control">
//             <label htmlFor="password" className="label">
//               <span className="label-text">Passwort</span>
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               onChange={(e) => createPassword(e.target.value)}
//               placeholder="Passwort"
//               className="input input-bordered"
//             />
//             <label className="label">
//               <a href="#" className="label-text-alt link link-hover">
//                 Passwort vergessen?
//               </a>
//             </label>
//           </div>
//           <div className="form-control mt-6">
//             <button
//               onClick={handleSubmitCredentials}
//               className="btn btn-primary"
//             >
//               Einloggen mit Credentials
//             </button>
//             <button onClick={handleSubmitLDAP} className="btn btn-primary mt-3">
//               Einloggen mit LDAP
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//ALTERNATE LOGIN
import Head from "next/head";
import Navbar from "./navbar";
import Link from "next/link";
import { useState } from "react";
import { sendEtagResponse } from "next/dist/server/send-payload";
import { signIn } from "next-auth/react";
const CryptoJS = require("crypto-js");

export default function Login({ type = "" }) {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  //Constants that are manipulated by the html below
  const [email, createEmail] = useState("");
  const [password, createPassword] = useState("");
  //Constant to display the error message from next-auth
  const [error, setError] = useState("");
  //Constant to prevent users from clicking the login button multiple times
  const [busy, setBusy] = useState(false);
  //Constants to set the visibility of the error alert
  const [alertVisibility, setAlertVisibility] = useState(true);

  const handleSubmitCombined = async (event) => {
    event.preventDefault();
    //Disabling the login button for the time of processing
    setBusy(true);
    try {
      //LDAP PROVIDER
      //The LDAP signIn function is a PROMISE, therefore we need to handle errors slightly different
      await signIn("LDAP", {
        email: email,
        password: password,
        redirect: false, //This is needed to prevent nextauth from redirecting us to a dedicated error page
      });
    } catch (err) {
      console.error("LDAP failed, now trying local accounts...");
      //LOCAL ACCOUNTS PROVIDER
      const hashHex = CryptoJS.SHA256(password).toString();
      const res = await signIn("credentials", {
        email: email,
        password: hashHex,
        redirect: false, //This is needed to prevent nextauth from redirecting us to a dedicated error page
      });
      //Finally, if the last credential provider throws an error -> Display Error Message
      if (err) {
        setError("Zugangsdaten falsch");
        //Setting the fake alert to hidden and the real alert to visible
        setAlertVisibility(false);
      }
    }
    //Making the login button clickable again
    setBusy(false);
  };

  // const handleSubmitCredentials = async (event) => {
  //   event.preventDefault();
  //   setBusy(true);
  //   const res = await signIn("credentials", {
  //     email: email,
  //     password: password,
  //     redirect: false, //This is needed to prevent nextauth from redirecting us to a dedicated error page
  //   });
  //   setError(res.error);
  //   //Setting the fake alert to hidden and the real alert to visible
  //   setAlertVisibility1("hidden");
  //   setAlertVisibility2("visible");
  //   setBusy(false);
  // };
  // const handleSubmitLDAP = async (event) => {
  //   event.preventDefault();
  //   setBusy(true);
  //   //The LDAP signIn function is a PROMISE, therefore we need to handle errors slightly different
  //   await signIn("LDAP", {
  //     email: email,
  //     password: password,
  //     redirect: false, //This is needed to prevent nextauth from redirecting us to a dedicated error page
  //   })
  //     //Maybe change this in the future
  //     .then((response) => response.json())
  //     .catch((err) => setError("Zugangsdaten falsch"));
  //   //Setting the fake alert to hidden and the real alert to visible
  //   setAlertVisibility1("hidden");
  //   setAlertVisibility2("visible");
  //   setBusy(false);
  // };

  return (
    <div>
      <div className="card rounded-lg flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-neutral">
        <div className="card-body pb-1">
          <p className="text-primary text-center text-2xl font-bold dark:text-white">
            Login
          </p>
          {/* Adding a html form element to allow keyboard event to click "Einloggen" button */}
          <form onSubmit={handleSubmitCombined}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Benutzername / Email
                </span>
              </label>
              <input
                value={email}
                placeholder="mmuster1 / mmuster1@test.de "
                className="input input-bordered"
                onChange={(e) => createEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Passwort</span>
              </label>
              <input
                value={password}
                type="password"
                placeholder="Passwort"
                className="input input-bordered"
                onChange={(e) => createPassword(e.target.value)}
              />

              {/* The button to open modal */}
              <div>
                <label htmlFor="my-modal" className="label-text">
                  <span className="hover:underline">Passwort vergessen?</span>
                </label>
              </div>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="my-modal" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box relative max-w-2xl">
                  <div className="flex w-full">
                    <div className="flex flex-col w-full lg:flex-row">
                      <div className="grid flex-grow card lg:w-1/2 place-items-center">
                        <h3 className="font-bold text-lg">Uni-Accounts:</h3>
                        <p>
                          Sie sind <u>Student:in</u> oder <u>Dozent:in</u> und
                          besitzen einen Uni-Account und haben Ihr Passwort
                          vergessen? Kein Problem! <br></br>Unter nachfolgendem
                          Link können Sie Ihr Passwort zurücksetzen:
                        </p>
                        <br></br>
                        <Link
                          href="https://kim.uni-koeln.de"
                          className="link link-primary"
                        >
                          Identitätsmanagement der Universität zu Köln (uniKIM)
                        </Link>
                        <br></br>

                        <p className="italic">
                          Für weitere Informationen, wenden Sie sich bitte an
                          das RRZK.
                        </p>
                      </div>
                      <div className="divider lg:divider-horizontal p-10">
                        Oder
                      </div>
                      <div className="grid flex-grow card lg:w-1/2 place-items-center">
                        <h3 className="font-bold text-lg">
                          Alle anderen Accounts:
                        </h3>
                        <p>
                          Sie besitzen <u>keinen</u> Uni-Account, haben
                          allerdings vom Scida-Support einen Account zur
                          Verfügung gestellt bekommen und haben Ihr Passwort
                          vergessen? Kein Problem! Bitte kontaktieren Sie den
                          Scida-Support unter nachfolgender eMail-Adresse, um
                          ein neues Passwort zu erhalten:
                        </p>
                        <br></br>
                        <span className="italic">
                          scida[at]smail.uni-koeln.de
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="modal-action">
                    <label
                      htmlFor="my-modal"
                      className="btn btn-secondary text-background border-none"
                    >
                      Schließen
                    </label>
                  </div>
                </div>
              </div>
              {/* <label className="label">
                <a
                  href="https://kim.uni-koeln.de"
                  className="label-text-alt link link-hover"
                >
                  Passwort vergessen?
                </a>
              </label> */}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" disabled={busy}>
                Einloggen
              </button>
              {/* Invisible alert to prevent the login form to wobble arround */}
              {alertVisibility ? (
                <div className="invisible">
                  <div className="alert alert-error shadow-lg h-1 mt-5 mb-5 rounded-md">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="alert alert-error shadow-lg h-1 mt-5 mb-5 rounded-md">
                    <div className="h-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

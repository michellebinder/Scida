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

//TODO: Refactor code in component / use state to only change neccessary texts
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

  const handleSubmitCredentials = async (event) => {
    event.preventDefault();
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false, //This is needed to prevent nextauth from redirecting us to a dedicated error page
    });
    setError(res.error);
    setBusy(false);
  };
  const handleSubmitLDAP = async (event) => {
    event.preventDefault();
    const res = await signIn("LDAP", {
      email: email,
      password: password,
      redirect: false, //This is needed to prevent nextauth from redirecting us to a dedicated error page
    });
    setError(res.error);
    setBusy(false);
  };

  return (
    <div>
      <div className="tabs tabs-boxed rounded-none rounded-t-lg max-sm:bg-base-100 dark:bg-neutral">
        <button
          className={toggleState === 1 ? "tab tab-active" : "tab"}
          onClick={() => toggleTab(1)}
        >
          Uni-Accounts
        </button>
        <button
          className={toggleState === 2 ? "tab tab-active" : "tab "}
          onClick={() => toggleTab(2)}
        >
          Lokale Accounts
        </button>
      </div>

      <div
        className={
          toggleState === 1
            ? "card rounded-none rounded-b-lg flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-neutral"
            : "hidden card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-neutral"
        }
      >
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              value={email}
              placeholder="Uni-Email"
              className="input input-bordered"
              onChange={(e) => createEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Passwort</span>
            </label>
            <input
              type="password"
              value={password}
              placeholder="Passwort"
              className="input input-bordered"
              onChange={(e) => createPassword(e.target.value)}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Passwort vergessen?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button onClick={handleSubmitLDAP} className="btn btn-primary">
              Einloggen
            </button>
            <p>{error}</p>
          </div>
        </div>
      </div>

      <div
        className={
          toggleState === 2
            ? "card rounded-none rounded-b-lg flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-neutral"
            : "hidden card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-neutral"
        }
      >
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              value={email}
              placeholder="Account-Email"
              className="input input-bordered"
              onChange={(e) => createEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Passwort</span>
            </label>
            <input
              type="password"
              value={password}
              placeholder="Passwort"
              className="input input-bordered"
              onChange={(e) => createPassword(e.target.value)}
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Passwort vergessen?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button
              onClick={handleSubmitCredentials}
              className="btn btn-primary"
            >
              Einloggen
            </button>
            <p>{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

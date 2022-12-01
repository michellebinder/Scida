import Head from "next/head";
import Navbar from "./navbar";
import Link from "next/link";
import { useState } from "react";
import { sendEtagResponse } from "next/dist/server/send-payload";

export default function Login({ type = "" }) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };



  //Variables that are manipulated by the html below
  const [email, createEmail] = useState("");
  const [password, createPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState(""); //Saving the response string from the API in a variable for later use in HTML

  //
  //
  //Basic Structure to make API POST/GET Requests from FRONTEND!!!
  //
  //
  const postCredentials = async () => {
    //POSTING the credentials
    const response = await fetch("/api/login", { //Insert API you want to call
      method: "POST",
      body: JSON.stringify({ password, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Saving the RESPONSE in the responseMessage variable
    const data = await response.json();
    setResponseMessage(data);
    console.log(responseMessage);
  };
  //
  //
  //Basic Structure to make API POST/GET Requests from FRONTEND!!!
  //
  //
  
  return (
    <div>
      <div className="tabs tabs-boxed rounded-none rounded-t-lg">
        <button
          className={toggleState === 1 ? "tab tab-active" : "tab"}
          onClick={() => toggleTab(1)}
        >
          Studierende
        </button>
        <button
          className={toggleState === 2 ? "tab tab-active" : "tab "}
          onClick={() => toggleTab(2)}
        >
          Dozierende
        </button>
        <button
          className={toggleState === 3 ? "tab tab-active" : "tab "}
          onClick={() => toggleTab(3)}
        >
          Mitarbeitende
        </button>
      </div>

      <div
        className={
          toggleState === 1
            ? "card rounded-none rounded-b-lg flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
            : "hidden card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        }
      >
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Studierenden-Email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Passwort</span>
            </label>
            <input
              type="password"
              placeholder="Passwort"
              className="input input-bordered"
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Passwort vergessen?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <Link href="/dashboardStudent">
              <button className="btn btn-primary">Einloggen</button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={
          toggleState === 2
            ? "card rounded-none rounded-b-lg flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
            : "hidden card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
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
              placeholder="Dozierenden-Email"
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
            {/* <Link href="/dashboardLecturer"> */}
            <button onClick={postCredentials} className="btn btn-primary">
              Einloggen
            </button>
            <div>Rückgabe von API-----{responseMessage}</div>
            {/* </Link> */}
          </div>
        </div>
      </div>

      <div
        className={
          toggleState === 3
            ? "card rounded-none rounded-b-lg flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
            : "hidden card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        }
      >
        <form action="/api/login" method="post">
          <div className="card-body">
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Mitarbeitenden-Email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text">Passwort</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Passwort"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Passwort vergessen?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <Link href="/dashboardAdmin">
                <button type="sumbit" className="btn btn-primary">
                  Einloggen
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

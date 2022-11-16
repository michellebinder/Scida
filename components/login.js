import Head from "next/head";
import Navbar from "./navbar";
import Link from "next/link";
import { useState } from "react";

export default function Login({ type = "" }) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
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
          Admin
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
              type="text"
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
              <button
                className="btn btn-primary"
              >
                Login
              </button>
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
              placeholder="Dozierenden-Email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Passwort</span>
            </label>
            <input
              type="text"
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
          <Link href="/dashboardLecturer">
            <button
              className="btn btn-primary"
            >
              Login
            </button>
            </Link>
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
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Admin-Email"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Passwort</span>
            </label>
            <input
              type="text"
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
            <Link href="dashboardAdmin">
            <button
              className="btn btn-primary"
              onClick={() => (window.location.href = "/dashboardAdmin")}
            >
              Login
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

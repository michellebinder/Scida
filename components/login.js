import Head from "next/head";
import Navbar from "./header";

export default function Login() {
  return (
    <div
      className="border-b border-grey-500 p-1 md:p-10 bg-grey-500 border rounded-3xl text-lg md:text-2xl md:text-justify" //custom design 
    >
      <div className="flex justify-center pb-16">
        <div className="flex flex-col justify-center">
          <h1 className="font-bold text-2xl md:text-4xl text-center">
            Login
          </h1>
        </div>
      </div>
    </div>
  );
}

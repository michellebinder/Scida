import Head from "next/head";
import React from "react";
import Navbar from "../components/navbar";
import Login from "../components/login";
import Footer from "../components/footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { data } from "autoprefixer";

function Home() {
  const { data: session, status, loading } = useSession();
  //Dev Logs on console
  console.log({ session, status, loading });

  if (status === "authenticated") {
    const router = useRouter();
    //Check which user type authenticated to redirect to correct page
    if (
      session.user.account_role === "Studierende" ||
      session.user.attributes.description === "s1234567"
    ) {
      router.push("/dashboardStudent");
    }
    if (session.user.account_role === "Dozierende") {
      router.push("/dashboardLecturer");
    }
    if (
      session.user.account_role === "Studiendekanat" ||
      session.user.account_role === "Sekretariat"
    ) {
      router.push("/dashboardAdmin");
    }
  }

  //if not signed display login
  if (status === "unauthenticated") {
    return (
      <div>
        <Head>
          <title>Scida</title>
          <meta charSet="utf-8" />
        </Head>
        {/* div that stretches from the very top to the very bottom */}
        <div className="flex flex-col h-screen justify-between bg-background">
          {/* basic navbar without navigation items */}
          <Navbar type="basic"></Navbar>
          {/* div that stretches from below the navbar to the bottom, scrolling "disabled" */}
          <div className="grid justify-center">
            {/* div with bubble animation */}
            {/* TODO: fix bubble animation on small screens */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-primary rounded-full filter blur-xl opacity-70 max-sm:opacity-0 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-accent rounded-full filter blur-xl opacity-70 max-sm:opacity-0 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary rounded-full filter blur-xl opacity-70 max-sm:opacity-0 animate-blob animation-delay-4000"></div>
                <div className="m-8 relative space-y-4">
                  {/* motion div to create morph in animation on page loading*/}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {
                        scale: 0.8,
                        opacity: 0,
                      },
                      visible: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                          delay: 0.4,
                        },
                      },
                    }}
                  >
                    <Login></Login>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
export default Home;

// const LoginPage = () => {
//   return (
//     <div>
//       <h1>Login</h1>
//       <LoginForm/>
//     </div>
//   );
// }

import "../styles/style.css";
import { motion } from 'framer-motion';
import { SessionProvider } from "next-auth/react"

function App({ Component, pageProps, session, router }) {
  return (
    <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
      
  )
}

export default App;

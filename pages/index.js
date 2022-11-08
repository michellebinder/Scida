import Head from "next/head";
import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Login from "../components/login";
import Content from "../components/content";
import Link from "next/link";
import Layout from "../pages/layout";
/*
function to create structure for our website
*/
function Home() {
  return (
    <div>
      <Head>
        <title>Scida</title>
        <meta charSet="utf-8" />
      </Head>
      {/* 
      <BrowserRouter>      
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            {/* <Route path="*" element={<NoPage />} /> */}
      {/* </Route>
        </Routes>
      </BrowserRouter> */}
      <div id="start" className="fixed z-10">
        <Header></Header>
      </div>
      <div className="bg-white flex flex-col h-screen justify-center"> {/*main div for content (the one between header and footer)*/}
        <div className="font-arial font-family:Arial md:pl-20 md:pr-20 grid grid-cols-3 gap-10 p-5 z-0"> {/*div for the three login types*/}
          <Content title="Studierende" imageSrc="user-2.png"></Content>
          <Content title="Dozierende" imageSrc="user-2.png"></Content>
          <Content title="Admin" imageSrc="user-2.png"></Content>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}
// ReactDOM.render(<Home />, document.getElementById("root"));
export default Home;

// import dynamic from 'next/dynamic'

// const DynamicComponentWithNoSSR = dynamic(() => import('../components/List'), {
//   ssr: false
// })

// export default () => <DynamicComponentWithNoSSR />

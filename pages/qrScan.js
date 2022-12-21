import Head from "next/head";
import React, {useRef, useEffect} from "react";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import QrReader from 'qrcode-reader';
import QrScanner from 'qr-scanner';

export default function Home(){
  // create a reference to the <video> element
  const videoElem = useRef(null);

  // // create a new QR code reader instance
  // const qrScanner = new QrScanner(
  //   videoElem.current,
  //   result => console.log('decoded qr code:', result),
  //   { /* your options or returnDetailedScanResult: true if you're not specifying any other options */ },
  // );  

  // qrScanner.start();

  // prompt the user for permission to use the webcam

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
      // start the video stream
      videoElem.current.srcObject = stream;

      // create a new QR code scanner
      const qrReader = new QrReader();
      const qrScanner = new QrScanner(qrReader, videoElem.current, result => console.log('decoded qr code:', result));
      qrScanner.start();
      
    });
  }, []);

        
  return (
      <div>
          <Head>
              <title>Scida</title>
              <meta charSet="utf-8" />
          </Head>
          {/* Div that stretches from the very top to the very bottom */}
          <div className="flex flex-col h-screen justify-between bg-base-100">
              {/* Dashboard navbar with navigation items  */}
              <Navbar></Navbar>
              <div className="flex flex-row grow">
              {/* Sidebar only visible on large screens */}
              <Sidebar type="lecturer"></Sidebar>
              <div className="hero grow">
                  {/* Grid for layouting welcome text and card components, already responsive */}
                  <div className="grid hero-content text-center text-neutral-content lg:p-10">
                      <div className="text-secondary dark:text-white">
                          <h1 className="mb-5 text-5xl font-bold text-center">
                          QR-Code scannen
                          </h1>
                          {/* Add <video> element to page */}
                          <video ref={videoElem} autoPlay></video>  
                      </div>
                  </div>
              </div>
          </div>
          <Footer></Footer>
      </div>
  </div>
  );
}

{/* attempt 1: trying out zxing as QR Code Reader (does not detect QR code but at least streams video content) /*}
// import { BrowserMultiFormatReader } from '@zxing/library';


// export default function Home(){

//     // create a reference to the <video> element
//     const videoElement = useRef(null);

//     // prompt user for permission to use webcam
//     navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
//         videoElement.current.srcObject = stream;
//     });

//     // Create a code reader instance
//     const codeReader = new BrowserMultiFormatReader();
    
//     // Start a loop that will continually check for QR codes in the video stream
//     setInterval(() => {
//         console.log('Checking for QR code');
//         codeReader.decodeFromVideoDevice(undefined, 'video', {
//             onDetected: () => {
//               // redirect the user to the /dashboardLecturer page whenever a QR code is detected
//               window.location = '/dashboardLecturer';
//             }
//         })
//         .catch((err) => {
//             console.error(err);
//         });
//     }, 1000); // check for QR codes every 1000 milliseconds (1 second)
      
//     return (
//         <div>
//             <Head>
//                 <title>Scida</title>
//                 <meta charSet="utf-8" />
//             </Head>
//             {/* Div that stretches from the very top to the very bottom */}
//             <div className="flex flex-col h-screen justify-between bg-base-100">
//                 {/* Dashboard navbar with navigation items  */}
//                 <Navbar></Navbar>
//                 <div className="flex flex-row grow">
//                 {/* Sidebar only visible on large screens */}
//                 <Sidebar type="lecturer"></Sidebar>
//                 <div className="hero grow">
//                     {/* Grid for layouting welcome text and card components, already responsive */}
//                     <div className="grid hero-content text-center text-neutral-content lg:p-10">
//                         <div className="text-secondary dark:text-white">
//                             <h1 className="mb-5 text-5xl font-bold text-center">
//                             QR-Code scannen
//                             </h1>
//                             {/* Add <video> element to page */}
//                             <video ref={videoElement} autoPlay></video>       
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer></Footer>
//         </div>
//     </div>
//     );
// }


// attempt 2: trying out qrcode-reader library (does not detect QR code either) 
// export default function Home() {
//     // create a reference to the <video> element
//     const videoElement = useRef(null);
  
//     // create a new QR code reader instance
//     const qrReader = new QrReader();
  
//     // start a loop that will continually check for QR codes in the video stream
//     setInterval(() => {
//       // prompt user for permission to use webcam
//       navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
//         videoElement.current.srcObject = stream;
//       });
  
//         // decode the QR code from the video stream
//         qrReader.decode(videoElement.current)
//         .then((result) => {
//             if (result) {
//             // redirect the user to the /dashboardLecturer page whenever a QR code is detected
//             window.location = '/dashboardLecturer';
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     }, 1000); // check for QR codes every 1000 milliseconds (1 second)
  
//     return (
//       <div>
//         {/* Div that stretches from the very top to the very bottom */}
//         <div className="flex flex-col h-screen justify-between bg-base-100">
//           <div className="flex flex-row grow">
//             <div className="hero grow">
//               {/* Grid for layouting welcome text and card components, already responsive */}
//               <div className="grid hero-content text-center text-neutral-content lg:p-10">
//                 <div className="text-secondary dark:text-white">
//                   <h1 className="mb-5 text-5xl font-bold text-center">
//                     QR-Code scannen
//                   </h1>
//                   {/* Add <video> element to page */}
//                   <video ref={videoElement} autoPlay></video>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

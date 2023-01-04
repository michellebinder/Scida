import Head from "next/head";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import React, {useState, useRef} from 'react';
import QRCode from 'qrcode';
import { QrReader } from 'react-qr-reader';

export default function App() { 
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const qrRef = useRef(null);


  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
          setScanResultFile(result);
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);
    }
   }
  return (
    <div>
      <Head>
          <title>Scida</title>
          <meta charSet="utf-8" />
      </Head>
      <div className="flex flex-col h-screen justify-between bg-base-100">
          <Navbar></Navbar>
          <div className="flex flex-row grow">
            <Sidebar type="lecturer"></Sidebar>
              <div className="hero grow">
                <div className="grid hero-content text-center text-neutral-content lg:p-10">
                  <div className="text-secondary dark:text-white">
                    <div label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
                      <button className="btn border-transparent bg-secondary text-background" onClick={() => generateQrCode()}>Teilnehmerliste</button>
                      {imageUrl ? (
                        <a href={imageUrl} download>
                            <img src={imageUrl} alt="img"/>
                        </a>) : null}    
                    </div>
                  </div>
                  <div className="card-actions flex flex-col justify-center gap-5">
                    <button className="btn border-transparent bg-secondary text-background" onClick={onScanFile}>Scan Qr Code</button>
                    <QrReader
                      ref={qrRef}
                      delay={300}
                      style={{width: '100%'}}
                      onError={handleErrorFile}
                      onScan={handleScanFile}
                      legacyMode
                    />
                    <h3>Scanned Code: {scanResultFile}</h3>
                    <h3>Qr Code Scan by Web Cam</h3>
                    <QrReader
                    delay={300}
                    style={{width: '100%'}}
                    onError={handleErrorWebCam}
                    onScan={handleScanWebCam}
                    />
                    <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
                </div>
              </div>
            <Footer></Footer>
          </div>
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


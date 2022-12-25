import Head from "next/head";
import Navbar from "../components/navbar";
import Link from "next/link";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import React, {useState, useRef} from 'react';
// import QRCode from 'qrcode';
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
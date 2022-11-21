import Head from "next/head";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
    {/* Footer */}
      <footer className="footer footer-center pb-4 m-0 bg-transparent text-primary mt-3 text-sm text-center">
          <ul className="flex flex-justify-center">
          <li>
              <a href="#" className="hover:underline">
              © 2022 Scida.  &nbsp; Alle Rechte vorbehalten.
              </a>
            </li>
            {/* Empty list item for correct spacing (whithout them, the underline would stretch weirdly */}
            <li>
              <a>
              &nbsp;&nbsp; | &nbsp; 
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Support 
              </a>
            </li>
             {/* Empty list item for correct spacing (whithout them, the underline would stretch weirdly */}
            <li>
              <a>
              &nbsp;&nbsp; | &nbsp; 
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Datenschutz 
              </a>
            </li>
             {/* Empty list item for correct spacing (whithout them, the underline would stretch weirdly */}
            <li>
              <a>
              &nbsp;&nbsp; | &nbsp; 
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
               Impressum 
              </a>
            </li>
          </ul>
      </footer>
    </div>
  );
}

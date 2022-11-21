import Head from "next/head";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
    {/* Footer */}
      <footer className="footer footer-center p-4 bg-primary text-base-300 mt-3 text-sm text-center">
          <ul className="flex flex-justify-center">
          <li>
              <a>
              © 2022 Scida.  &nbsp; Alle Rechte vorbehalten.
              </a>
            </li>
            {/* Empty list item for correct spacing (whithout them, the underline would stretch weirdly */}
            <li>
              <a>
              &nbsp;&nbsp; | &nbsp; 
              </a>
            </li>
            <Link href="/support">
            <li>
              <span className="hover:underline">
              Support 
              </span>
            </li>
            </Link>
             {/* Empty list item for correct spacing (whithout them, the underline would stretch weirdly */}
            <li>
              <a>
              &nbsp;&nbsp; | &nbsp; 
              </a>
            </li>
            <Link href="/datenschutz">
            <li>
              <span href="#" className="hover:underline">
                Datenschutz 
              </span>
            </li>
            </Link>
             {/* Empty list item for correct spacing (whithout them, the underline would stretch weirdly */}
            <li>
              <a>
              &nbsp;&nbsp; | &nbsp; 
              </a>
            </li>
            <li>
              <span href="#" className="hover:underline">
               Impressum 
              </span>
            </li>
          </ul>
      </footer>
    </div>
  );
}

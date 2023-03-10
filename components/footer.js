import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="footer footer-center p-4 bg-primary text-white text-sm text-center">
        <ul className="flex flex-justify-center">
          <li>
            <a>© 2023 Scida. &nbsp; Alle Rechte vorbehalten.</a>
          </li>
          {/* Empty list item for correct spacing (whithout them, the underline would stretch weirdly */}
          <li>
            <a>&nbsp;&nbsp; | &nbsp;</a>
          </li>
          <Link href="/support">
            <li>
              <span className="hover:underline">Support</span>
            </li>
          </Link>
          {/* Empty list item for correct spacing (whithout them, the underline would stretch weirdly */}
          <li>
            <a>&nbsp;&nbsp; | &nbsp;</a>
          </li>
          <Link href="/datenschutz">
            <li>
              <span className="hover:underline">Datenschutz</span>
            </li>
          </Link>
          {/* Empty list item for correct spacing (whithout them, the underline would stretch weirdly */}
          <li>
            <a>&nbsp;&nbsp; | &nbsp;</a>
          </li>
          <Link href="/impressum">
            <li>
              <span className="hover:underline">Impressum</span>
            </li>
          </Link>
        </ul>
      </footer>
    </div>
  );
}

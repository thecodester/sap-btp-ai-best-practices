"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    // <nav className="navbar navbar-expand-lg fixed-top" id="localesNav">
    // 	<div className="container">
    // 		<ul className="navbar-nav text-uppercase ms-auto py-lg-0 " style={{ flexDirection: "row" }}>
    // 			<li className="nav-item">
    // 				<Link href="/en" className={`nav-link ${pathname.includes("/en/") ? "active" : ""}`}>
    // 					EN
    // 				</Link>
    // 			</li>
    // 			<li className="nav-item">
    // 				<Link href="/pt" className={`nav-link ${pathname.includes("/pt/") ? "active" : ""}`}>
    // 					PT
    // 				</Link>
    // 			</li>
    // 			<li className="nav-item">
    // 				<Link href="/jp" className={`nav-link ${pathname.includes("/jp/") ? "active" : ""}`}>
    // 					JP
    // 				</Link>
    // 			</li>
    // 		</ul>
    // 	</div>
    // </nav>
    <nav className="navbar navbar-expand-lg navbar-light fixed-top text-bg-dark" id="mainNav">
      <div className="container">
        <Link href="/" className="navbar-brand">
          SAP BTP AI Best Practices
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fas fa-bars ms-1"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className={`nav-link ${pathname === "/about/" ? "active" : ""}`}>
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

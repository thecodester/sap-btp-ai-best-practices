"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BaseLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function BaseLink({ href, className, children }: BaseLinkProps) {
  const pathname = usePathname();
  const basePath = process.env.NODE_ENV === "development" ? "" : "/sap-btp-ai-best-practices";

  // Remove leading slash from href to avoid double slashes
  const cleanHref = href.startsWith("/") ? href.slice(1) : href;
  const fullHref = `${basePath}/${cleanHref}`;

  return (
    <Link href={fullHref} className={className}>
      {children}
    </Link>
  );
}

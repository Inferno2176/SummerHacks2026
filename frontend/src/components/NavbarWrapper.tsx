"use client";

import { usePathname } from "next/navigation";
import HorizontalNavbar from "@/components/HorizontalNavbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar on onboarding route for Focus Mode
  const isFocusMode = pathname === "/onboarding";
  
  if (isFocusMode) return null;
  
  return <HorizontalNavbar />;
}

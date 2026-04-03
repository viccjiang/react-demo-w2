import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/fitness/Navbar";
import Footer from "../components/fitness/Footer";

export default function FrontLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-dark-950 font-body text-white antialiased">
      <Navbar />
      <div className="pt-[72px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

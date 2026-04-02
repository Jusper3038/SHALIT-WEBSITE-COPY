import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingCTA from "./FloatingCTA";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 pt-16 md:pt-20 pb-14 md:pb-0">{children}</main>
    <Footer />
    <FloatingCTA />
  </div>
);

export default Layout;
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function AppLayout() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";

const HeaderFooterLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default HeaderFooterLayout;

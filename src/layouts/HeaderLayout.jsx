import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

const HeaderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default HeaderLayout

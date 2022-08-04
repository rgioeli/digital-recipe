import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const NavContext = createContext();

const OpenNavContext = ({ children }) => {
  //STATE
  const [openNav, setOpenNav] = useState(false);
  //ROUTER
  const router = useRouter();
  //USEFFECT
  useEffect(() => {
    setOpenNav(false);
  }, [router && router.pathname]);
  return (
    <NavContext.Provider value={{ openNav, setOpenNav }}>
      {children}
    </NavContext.Provider>
  );
};

export default OpenNavContext;

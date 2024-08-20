import { Outlet } from "react-router";

import { Header } from "./Header";

export const Layout = () => {
  return (
    <>
      <header>
        <Header></Header>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/actions";
import { Outlet } from "react-router-dom";
import { Header, Footer, PageContent } from "./components";

export const AppLayout = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserData = JSON.parse(sessionStorage.getItem("userData"));

    if (!currentUserData) {
      return;
    }

    dispatch(setUser(currentUserData));
  }, [dispatch]);

  return (
    <>
      <Header />
      <PageContent>
        <Outlet />
      </PageContent>
      <Footer />
    </>
  );
};

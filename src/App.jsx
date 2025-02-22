import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/actions";
import { Routes, Route } from "react-router-dom";
import { Header, Footer, PageContent } from "./components";
import { Authorization, Registration, UsersPage, BlogPost } from "./pages/";
import "./App.css";

export const App = () => {
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
        <Routes>
          <Route path="/" element={<div>Main page</div>} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/post" element={<BlogPost />} />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/post/:id/edit" element={<BlogPost />} />
          <Route path="*" element={<div>Error</div>} />
        </Routes>
      </PageContent>
      <Footer />
    </>
  );
};

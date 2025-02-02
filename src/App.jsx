import { Routes, Route } from "react-router-dom";
import { Header, Footer, PageContent } from "./components";
import { Authorization, Registration } from "./pages/";
import "./App.css";

export const App = () => {
  return (
    <>
      <Header />
      <PageContent>
        <Routes>
          <Route path="/" element={<div>Main page</div>} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/users" element={<div>Users</div>} />
          <Route path="/post" element={<div>New post</div>} />
          <Route path="/post/:postId" element={<div>Post</div>} />
          <Route path="*" element={<div>Error</div>} />
        </Routes>
      </PageContent>
      <Footer />
    </>
  );
};

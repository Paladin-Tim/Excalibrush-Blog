import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { AppLayout } from "./AppLayout.jsx";
import { GlobalError } from "./components";
import {
  Authorization,
  Registration,
  UsersPage,
  BlogPost,
  Main,
} from "./pages";
import { globalErrors } from "./bff/constants";
import "./index.scss";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <GlobalError error={globalErrors.PAGE_NOT_FOUND} />,
    handle: { crumb: () => <Link to="/">Home</Link> },
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/login",
        element: <Authorization />,
        handle: { crumb: () => <Link to="/login">Authorization</Link> },
      },
      {
        path: "/register",
        element: <Registration />,
        handle: { crumb: () => <Link to="/register">Registration</Link> },
      },
      {
        path: "/users",
        element: <UsersPage />,
        handle: { crumb: () => <Link to="/users">Users</Link> },
      },
      {
        path: "/post",
        element: <BlogPost />,
        handle: { crumb: () => <Link to="/post">Add post</Link> },
      },
      {
        path: "/post/:id",
        element: <BlogPost />,
        handle: { crumb: (id) => <Link to={`/post/${id}`}>Post</Link> },
        children: [
          {
            path: "/post/:id/edit",
            element: <BlogPost />,
            handle: {
              crumb: (id) => <Link to={`/post/${id}/edit`}>Edit post</Link>,
            },
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <AppLayout />
    </RouterProvider>
  </Provider>,
);

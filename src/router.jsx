import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "./features/identity/components/login";
import Register, {
  registerAction,
} from "./features/identity/components/register";
import IdentityLayout from "./layouts/identity-layout";
import MainLayout from "./layouts/mainLayout/main-layout";
import Courses, { coursesLoader } from "./pages/courses";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    children: [{
      element: <Courses/>,
      index: true,
      loader: coursesLoader
    }]
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
        errorElement: <Login/>
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        errorElement: <Register />,
      },
    ],
  },
]);

export default router;

export async function postLoader() {
  const response = await fetch('posts url');
  if (!response.ok) {
    throw new Error('Could not fetch posts');
  }
  return response;
}




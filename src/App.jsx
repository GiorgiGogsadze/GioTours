import { Suspense, lazy } from "react";
import ErrorPage from "./ErrorPage";
import Header from "./Header";
import Loader from "./Loader";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const Tour = lazy(() => import("./Tour"));
const SignUpForm = lazy(() => import("./SignUpForm"));
const LoginForm = lazy(() => import("./LoginForm"));
const Contact = lazy(() => import("./Contact"));

export default function App() {
  return (
    <div>
      <Header />
      <main className="main">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours/:id" element={<Tour />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/signUp" element={<SignUpForm />} />
            <Route path="/logIn" element={<LoginForm />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

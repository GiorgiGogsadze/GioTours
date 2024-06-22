import { Suspense, lazy } from "react";
import ErrorPage from "./errorPage/ErrorPage";
import Header from "./header/Header";
import Loader from "./components/Loader";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./home/Home"));
const Tour = lazy(() => import("./tour/Tour"));
const SignUpForm = lazy(() => import("./userPlace/SignUpForm"));
const LoginForm = lazy(() => import("./userPlace/LoginForm"));
const Contact = lazy(() => import("./contact/Contact"));

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

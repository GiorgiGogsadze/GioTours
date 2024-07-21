import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ErrorPage from "./components/ErrorPage";
import AlertProvider from "./Alert/AlertProvider";
import AuthGate from "./userAuthentication/AuthGate";
import AppLayout from "./AppLayout";
import InternetGate from "./components/InternetGate";
import SupabaseSubscribes from "./components/SupabaseSubscribes";
import AlertTop from "./Alert/AlertTop";
import AlertConfirm from "./Alert/AlertConfirm";
import AdminGate from "./admin/AdminGate";
import Spinner from "./components/Spinner";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./home/Home"));
const Tour = lazy(() => import("./tour/Tour"));
const About = lazy(() => import("./about/About"));
const SignUpForm = lazy(() => import("./userAuthentication/SignUpForm"));
const LoginForm = lazy(() => import("./userAuthentication/LoginForm"));
const UserProfile = lazy(() => import("./userPage/UserProfile"));
const EditUser = lazy(() => import("./userAuthentication/EditUser"));
const AdminMain = lazy(() => import("./admin/AdminMain"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchInterval: 5 * 60 * 1000,
      refetchIntervalInBackground: true,
    },
  },
});

export default function App() {
  return (
    // <InternetGate>
    <QueryClientProvider client={queryClient}>
      <div style={{ fontSize: "20px", position: "absolute" }}>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
      <SupabaseSubscribes />
      <BrowserRouter>
        <AlertProvider>
          <AlertTop />
          <AlertConfirm />
          <Suspense fallback={<Spinner />}>
            <ScrollToTop />
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/tours/:tourId" element={<Tour />} />
                <Route path="/about" element={<About />} />
                <Route path="/signUp" element={<SignUpForm />} />
                <Route path="/logIn" element={<LoginForm />} />
                <Route path="/users/:userId" element={<UserProfile />} />
                <Route
                  path="/editUser"
                  element={
                    <AuthGate>
                      <EditUser />
                    </AuthGate>
                  }
                />
                <Route
                  path="*"
                  element={<ErrorPage message="Page not found!" />}
                />
              </Route>
              <Route path="/admin" element={<AdminGate />}>
                <Route index element={<AdminMain />} />
              </Route>
            </Routes>
          </Suspense>
        </AlertProvider>
      </BrowserRouter>
    </QueryClientProvider>
    // </InternetGate>
  );
}

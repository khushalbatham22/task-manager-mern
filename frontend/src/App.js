import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header/Header";
import { PrivateRoute, PublicRoute } from "./utils/routes";
import Snackbar from "./components/Snackbar/CustomSnackbar";
import CustomSnackbar from "./components/Snackbar/CustomSnackbar";

const Home = lazy(() => import("./pages/Home/Home"));
const TaskManager = lazy(() => import("./pages/TaskManager/TaskManager"));
const Login = lazy(() => import("./pages/Login/Login"));
const Registration = lazy(() => import("./pages/Registration/Registration"));
const About = lazy(() => import("./pages/About/About"));
const NoMatch = lazy(() => import("./components/NoMatch/NoMatch"));

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <CustomSnackbar />

        <Suspense fallback={<div className="container">Loading...</div>}>
          <Routes>
            <Route
              path="/login"
              element={<PublicRoute element={<Login />} />}
            />
            <Route
              path="/registration"
              element={<PublicRoute element={<Registration />} />}
            />

            <Route
              path="/task-manager"
              element={<PrivateRoute element={<TaskManager />} />}
            />

            <Route path="/" element={<PrivateRoute element={<Home />} />} />
            <Route path="/about" element={<About />} />

            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Suspense>
      </div>
    </AuthProvider>
  );
}

export default App;

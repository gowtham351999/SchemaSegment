import "bootstrap/scss/bootstrap.scss";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { DashboardWrapper } from "./LayoutWrapper/DashboardWrapper";
import Login from "./pages/Auth/Login/Login";
import Audience from "./pages/Audience/Audience";

function App() {
  const routes = [
    {
      path: '/',
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    
    {
      path: "/home/audience",
      element: (
        <DashboardWrapper>
          <Audience />
        </DashboardWrapper>
      ),
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

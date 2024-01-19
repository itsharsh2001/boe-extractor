import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import SignIn from "./components/SignIn";
import { useState, useEffect } from "react";

function App() {
  const [token, setToken] = useState(null);
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route
            path="/login"
            element={<SignIn />}
            // render={(props) => <SignIn {...props} setToken={setToken} />}
          />
          <Route
            path="/dashboard"
            element={
                <>

                  <Header />

                  <div className="main">
                    <Sidebar />
                    <Main />
                  </div>
                </>
              }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { firebaseApp } from "./services/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);

// Higher order component for public pages
function PrivateRoute({ authenticated, children }) {
  return authenticated ? children : <Navigate to="/login" />;
}

// Higher order component for public pages
function PublicRoute({ authenticated, children }) {
  return !authenticated ? children : <Navigate to="/" />;
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });

    return () => {};
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <PrivateRoute authenticated={authenticated}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute authenticated={authenticated}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute authenticated={authenticated}>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            authenticated={authenticated}
            path="/*"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

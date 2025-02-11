import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import CreateTicket from "./components/CreateTicket";
import ViewTickets from "./components/ViewTickets";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default Route Opens Signup Page */}
        <Route path="/" element={<Signup />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Redirect unknown routes to Signup */}
        <Route path="*" element={<Navigate to="/signup" />} />

        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="/view-tickets" element={<ViewTickets />} />
      </Routes>
    </Router>
  );
};

export default App;

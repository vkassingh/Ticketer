import { auth, signOut } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div>
      <h2>support Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate("/view-tickets")}>View Tickets</button>
    </div>
  );
};

export default Dashboard;

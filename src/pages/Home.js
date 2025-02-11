import { auth, signOut } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
      const navigate = useNavigate();

        const handleLogout = async () => {
                await signOut(auth);
                    navigate("/login");
        };

          return (
                <div>
                      <h2>Welcome, User!</h2>

                            <button onClick={handleLogout}>Logout</button>
                                  <button onClick={() => navigate("/create-ticket")}>Create Ticket</button>
                                        <button onClick={() => navigate("/view-tickets")}>View Tickets</button>
                                            </div>
          );
};

export default Home;

          
        

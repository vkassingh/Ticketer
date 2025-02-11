import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase"; // Import Firebase auth

const ViewTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(""); // Store user role
  const navigate = useNavigate();

  // Fetch the current user's role from Firestore
  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role); // Fetch and set role
        }
      }
    };

    fetchUserRole();
  }, []);

  // Fetch tickets from Firestore
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tickets"));
        const ticketList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTickets(ticketList);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Function to delete a ticket (only for Customers)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      await deleteDoc(doc(db, "tickets", id));
      setTickets(tickets.filter((ticket) => ticket.id !== id)); // Update UI after deletion
      alert("Ticket deleted successfully!");
    } catch (error) {
      console.error("Error deleting ticket:", error);
    }
  };

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div>
      <h2>View Tickets</h2>
      <button onClick={() => navigate("/")}>Back to Home</button>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Category</th>
            <th>Contact Email</th>
            <th>Phone</th>
            <th>Urgent</th>
            <th>Submission Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan="9">No tickets available</td>
            </tr>
          ) : (
            tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.description}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.category}</td>
                <td>{ticket.contactEmail}</td>
                <td>{ticket.phone}</td>
                <td>{ticket.urgent}</td>
                <td>{ticket.submissionDate?.toDate().toLocaleDateString()}</td>
                <td>
                  {role === "Customer" && ( // Only show delete button for Customers
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      style={{ color: "red" }}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTickets;

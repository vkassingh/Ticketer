//createTicket.js

import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [urgent, setUrgent] = useState("no");
  const [terms, setTerms] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [submissionDate, setSubmissionDate] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !title ||
      !description ||
      !priority ||
      !category ||
      !contactEmail ||
      !phone ||
      !terms
    ) {
      setError("Please fill all required fields and accept the terms.");
      return;
    }

    try {
      await addDoc(collection(db, "tickets"), {
        title,
        description,
        priority,
        category,
        contactEmail,
        phone,
        urgent,
        submissionDate: submissionDate
          ? Timestamp.fromDate(new Date(submissionDate))
          : Timestamp.now(),
        attachment: attachment ? attachment.name : null,
        createdAt: Timestamp.now(),
      });

      alert("Ticket created successfully!");
      setTitle("");
      setDescription("");
      setPriority("");
      setCategory("");
      setContactEmail("");
      setPhone("");
      setUrgent("no");
      setTerms(false);
      setAttachment(null);
      setSubmissionDate("");
    } catch (err) {
      setError("Error creating ticket: " + err.message);
    }
  };

  return (
    <div className="create-ticket-container">
      <h2>Create a Support Ticket</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title (Required):</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description (Required):</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Priority (Required):</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label>Category (Required):</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Technical">Technical</option>
          <option value="Billing">Billing</option>
          <option value="General">General</option>
        </select>

        <label>Contact Email (Required):</label>
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          required
        />

        <label>Phone Number (Required):</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label>Urgency:</label>
        <div>
          <input
            type="radio"
            value="yes"
            checked={urgent === "yes"}
            onChange={() => setUrgent("yes")}
          />
          <label>Yes</label>
          <input
            type="radio"
            value="no"
            checked={urgent === "no"}
            onChange={() => setUrgent("no")}
          />
          <label>No</label>
        </div>

        <label>Attach a File:</label>
        <input type="file" onChange={handleFileUpload} />

        <label>Submission Date:</label>
        <input
          type="date"
          value={submissionDate}
          onChange={(e) => setSubmissionDate(e.target.value)}
        />

        <div>
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          <label>I accept the terms and conditions</label>
        </div>

        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
};

export default CreateTicket;

import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import emailjs from "@emailjs/browser";
import "./PowerBIDashboard.css";

function PowerBIDashboard() {
  const form = useRef();
  const [chatOpen, setChatOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendFeedback = async (e) => {
    e.preventDefault();

    if (!message.trim() || !email.trim()) {
      setStatus("Please provide your email and feedback message.");
      return;
    }

    setIsSending(true);
    setStatus("Sending feedback...");

    try {
      await emailjs.send(
        "service_hr6thqk",
        "template_x4fquu9",
        {
          from_name: name || "Anonymous",
          from_email: email,
          subject: "Dashboard feedback",
          message: message,
        },
        "geSH37vPafj9j86dO"
      );

      setStatus("✅ Feedback sent successfully! Thank you.");
      setMessage("");
      setName("");
      setEmail("");
      if (form.current) {
        form.current.reset();
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to send feedback. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="dashboard-container">
        <h1>Power BI Logistics Performance Dashboard</h1>
        <p>
          Welcome to your centralized data visualization hub. Analyze key
          metrics, monitor fleet efficiency, and track shipment statuses
          in real time.
        </p>

        <div className="powerbi-container">
          <iframe
            title="Logistics Dashboard"
            src="https://app.powerbi.com/reportEmbed?reportId=4a7fadcf-50e8-4e31-a69c-3d35054d5c3d&autoAuth=true&ctid=7c571c99-cfb5-4c12-a4e1-94c47b960cca"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className={`chat-widget ${chatOpen ? "open" : ""}`}>
        <button
          className="chat-navbar"
          type="button"
          onClick={() => setChatOpen((open) => !open)}
        >
          <div>
            <span className="chat-dot"></span>
            <strong>Hey there!</strong>
          </div>
          <span>{chatOpen ? "✕" : "💬"}</span>
        </button>

        <div className="chat-body">
          <div className="chat-messages">
            <div className="bot-message">We are committed to always improve our services for your satisfaction.Please let us know if you are having any issue or how we can better serve you!</div>
          </div>

          <form className="chat-form" ref={form} onSubmit={handleSendFeedback}>
            <input
              type="text"
              name="from_name"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              name="from_email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <textarea
              name="message"
              placeholder="Type your feedback here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>

            <button type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send Feedback"}
            </button>
          </form>

          {status && <div className="chat-status">{status}</div>}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PowerBIDashboard;
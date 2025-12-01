import React, { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Contact() {
  useScrollReveal(".reveal");

  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2000);
    setMessage("");
  };

  return (
    <section id="contact" className="section reveal">
      <h2 className="section-title">Contact Us</h2>

      <form className="contact-form" onSubmit={submit}>
        <textarea
          required
          placeholder="Write your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        <button className="btn-primary">Send</button>

        {sent && <p className="success">Message sent ✔️</p>}
      </form>
    </section>
  );
}

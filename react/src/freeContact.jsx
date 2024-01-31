import { useState } from "react";

export default function FreeContact() {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setContactInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contactInfo)
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      alert("Feedback submitted successfully!"); // Optional: Show a success message
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      alert("Failed to submit feedback. Please try again later."); // Optional: Show an error message
    }
  };

  return (
    <>
      <div className="contact_container">
        <div className="topic">
          <h1>Contact</h1>
        </div>

        <div className="form_info">
          <div className="contact_form">
            <form onSubmit={handleSubmit}>
              <label className="text" htmlFor="name">
                Name(required)
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={contactInfo.name}
                onChange={handleChange}
                required
              />
              <label className="text" htmlFor="email">
                Email(required)
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleChange}
                required
              />
              <label className="text" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={contactInfo.subject}
                onChange={handleChange}
                required
              />
              <label className="text" htmlFor="message">
                Your message
              </label>
              <textarea
                name="message"
                id="message"
                value={contactInfo.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className="submit_btn">
                Submit
              </button>
            </form>
          </div>
          <div className="contact_info">
            <div className="contact_info_card">
              <h1>Contact information </h1>
              <div>
                <small className="text">
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
                </small>
                <p>We are available 24/7. Call Now</p>
                <p className="text">
                  <span>
                    <i className="fa-solid fa-phone"></i>
                  </span>{" "}
                  +251930405060{" "}
                </p>
                <p className="text">
                  <span>
                    <i className="fa-solid fa-envelope"></i>
                  </span>{" "}
                  <a href="example@gmail.com">Email</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

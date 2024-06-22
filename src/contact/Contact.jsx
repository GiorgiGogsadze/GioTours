import { useEffect, useState } from "react";
import About from "./About";
import { useSelector } from "react-redux";

const initalFormData = {
  name: "",
  email: "",
  message: "",
  subscribe: false,
};
export default function Contact() {
  const { currentUser } = useSelector((state) => state.users);
  const [formData, setFormData] = useState(initalFormData);

  useEffect(() => {
    if (currentUser.email) {
      setFormData((p) => ({ ...p, email: currentUser.email }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(initalFormData);
    console.log(formData);
  };

  return (
    <>
      <About />
      <section id="contact" style={{ padding: "5rem" }}>
        <div className="main-form">
          <h2 className="heading-secondary ma-bt-lg">Contact Us</h2>
          <form className="form form--main" onSubmit={handleSubmit}>
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Enter Name
              </label>
              <input
                className="form__input"
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="email">
                Enter Email
              </label>
              <input
                className="form__input"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="message">
                Enter Message
              </label>
              <textarea
                className="form__input"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <div
              className="form__group"
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <input
                type="checkbox"
                name="subscribe"
                id="subscribe"
                checked={formData.subscribe}
                onChange={handleChange}
                style={{ cursor: "pointer", width: "1.7rem", height: "1.7rem" }}
              />
              <label
                className="form__label"
                htmlFor="subscribe"
                style={{ margin: 0 }}
              >
                Subscribe to our Newsletter
              </label>
            </div>

            <div className="form__group">
              <button type="submit" className="btn btn--green">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

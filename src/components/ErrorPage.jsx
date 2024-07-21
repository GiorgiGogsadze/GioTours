export default function ErrorPage({ message }) {
  return (
    <div className="error">
      <div className="error__title">
        <h2 className="heading-secondary heading-secondary--error">
          {message || "Uh oh! This page doesn't exist!"}
        </h2>
        <h2 className="error__emoji">😢 🤯</h2>
      </div>
      <div className="error__msg"></div>
    </div>
  );
}

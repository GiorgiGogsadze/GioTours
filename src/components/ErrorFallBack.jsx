export default function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1 className="heading-secondary heading-secondary--error">
        Something went wrong!
      </h1>
      <p style={{ fontSize: "1.8rem" }}>{error.message}</p>
      <button className="btn btn--green" onClick={resetErrorBoundary}>
        Try Again
      </button>
    </div>
  );
}

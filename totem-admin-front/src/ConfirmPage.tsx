import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import checkIcon from "./assets/check.png";

const ConfirmPage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg text-center"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "12px",
          backgroundColor: "#F8F0E9",
        }}
      >
        {/* Check Icon */}
        <div className="d-flex justify-content-center">
          <img
            src={checkIcon} // Use checkIcon if imported from assets
            alt="Success"
            style={{ width: "80px", height: "80px", marginBottom: "20px" }}
          />
        </div>

        <h3 className="fw-bold">Password Changed!</h3>
        <p className="text-muted">
          Your password has been changed successfully.
        </p>

        {/* Confirm Button */}
        <button
          type="submit"
          className="btn btn-primary w-100 p-3"
          onClick={() => navigate("/")}
          style={{
            color: "#000000",
            backgroundColor: "#DECBB7",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ConfirmPage;

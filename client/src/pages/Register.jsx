import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      setMessage(response.data.message);

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <p style={styles.eyebrow}>JOIN MYBLOG</p>

          <h1 style={styles.title}>Create your account</h1>

          <p style={styles.subtitle}>
            Start sharing your ideas with the world.
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div style={styles.field}>
            <label style={styles.label}>Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              minLength="6"
              style={styles.input}
            />
          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          {message && (
            <div style={styles.success}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 72px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px 20px",
    backgroundColor: "#fafafa",
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    padding: "42px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e5e5",
    borderRadius: "20px",
    boxSizing: "border-box",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  eyebrow: {
    margin: "0 0 12px",
    fontSize: "11px",
    letterSpacing: "2px",
    fontWeight: "700",
    color: "#777777",
  },

  title: {
    margin: "0 0 10px",
    fontSize: "34px",
    lineHeight: "1.1",
    color: "#111111",
  },

  subtitle: {
    margin: 0,
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#777777",
  },

  field: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#222222",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    fontSize: "15px",
    color: "#111111",
    backgroundColor: "#ffffff",
    border: "1px solid #d6d6d6",
    borderRadius: "10px",
    outline: "none",
  },

  error: {
    padding: "12px 14px",
    marginBottom: "18px",
    border: "1px solid #dddddd",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#222222",
    backgroundColor: "#fafafa",
  },

  success: {
    padding: "12px 14px",
    marginBottom: "18px",
    border: "1px solid #dddddd",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#222222",
    backgroundColor: "#fafafa",
  },

  button: {
    width: "100%",
    border: "none",
    borderRadius: "999px",
    padding: "13px 18px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    backgroundColor: "#111111",
    color: "#ffffff",
  },

  footer: {
    margin: "22px 0 0",
    textAlign: "center",
    fontSize: "14px",
    color: "#777777",
  },

  link: {
    color: "#111111",
    fontWeight: "600",
  },
};

export default Register;
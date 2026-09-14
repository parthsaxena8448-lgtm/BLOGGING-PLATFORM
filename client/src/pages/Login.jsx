import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/");
      window.location.reload();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <p style={styles.eyebrow}>WELCOME BACK</p>

          <h1 style={styles.title}>Log in to MyBlog</h1>

          <p style={styles.subtitle}>
            Continue reading and sharing your ideas.
          </p>
        </div>

        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/register" style={styles.link}>
            Create one
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
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 14px",
    fontSize: "15px",
    border: "1px solid #d6d6d6",
    borderRadius: "10px",
    outline: "none",
  },

  error: {
    padding: "12px 14px",
    marginBottom: "18px",
    border: "1px solid #e2e2e2",
    borderRadius: "10px",
    fontSize: "14px",
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

export default Login;
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";

import ProtectedRoute from "./components/ProtectedRoute";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  };

  return (
    <header style={styles.header}>
      <div style={styles.navContainer}>
        <Link to="/" style={styles.logo}>
          MyBlog
        </Link>

        <nav style={styles.nav}>
          <Link
            to="/"
            style={{
              ...styles.navLink,
              ...(location.pathname === "/" ? styles.activeLink : {}),
            }}
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/my-posts"
                style={{
                  ...styles.navLink,
                  ...(location.pathname === "/my-posts"
                    ? styles.activeLink
                    : {}),
                }}
              >
                My Posts
              </Link>

              <Link
                to="/create-post"
                style={styles.writeButton}
              >
                Write
              </Link>

              <div style={styles.profile}>
                <div style={styles.avatar}>
                  {(user?.name || "U").charAt(0).toUpperCase()}
                </div>

                <span style={styles.userName}>
                  {user?.name || "User"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                style={styles.logoutButton}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  ...styles.navLink,
                  ...(location.pathname === "/login"
                    ? styles.activeLink
                    : {}),
                }}
              >
                Login
              </Link>

              <Link
                to="/register"
                style={styles.registerButton}
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerInner}>
        <div>
          <div style={styles.footerLogo}>MyBlog</div>

          <p style={styles.footerText}>
            A simple place to read, write, and share ideas.
          </p>
        </div>

        <p style={styles.copyright}>
          © {new Date().getFullYear()} MyBlog
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={styles.app}>
        <Navbar />

        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
              path="/create-post"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-posts"
              element={
                <ProtectedRoute>
                  <MyPosts />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-post/:id"
              element={
                <ProtectedRoute>
                  <EditPost />
                </ProtectedRoute>
              }
            />

            <Route
              path="/posts/:id"
              element={<PostDetails />}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },

  content: {
    flex: 1,
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: "rgba(255, 255, 255, 0.94)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid #e7e7e3",
  },

  navContainer: {
    width: "100%",
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
  },

  logo: {
    color: "#111111",
    textDecoration: "none",
    fontSize: "27px",
    fontWeight: "800",
    letterSpacing: "-1.3px",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "18px",
    flexWrap: "wrap",
  },

  navLink: {
    color: "#5f5f5f",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    transition: "color 0.2s ease",
  },

  activeLink: {
    color: "#111111",
  },

  writeButton: {
    color: "#111111",
    textDecoration: "none",
    padding: "9px 16px",
    border: "1px solid #222222",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: "700",
    backgroundColor: "#ffffff",
  },

  registerButton: {
    color: "#ffffff",
    backgroundColor: "#111111",
    textDecoration: "none",
    padding: "10px 18px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: "700",
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
  },

  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#111111",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: "800",
  },

  userName: {
    fontSize: "14px",
    color: "#666666",
    fontWeight: "600",
  },

  logoutButton: {
    border: "none",
    background: "transparent",
    padding: 0,
    color: "#666666",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },

  footer: {
    marginTop: "40px",
    borderTop: "1px solid #e7e7e3",
    backgroundColor: "#ffffff",
  },

  footerInner: {
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "28px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  },

  footerLogo: {
    fontSize: "17px",
    fontWeight: "800",
  },

  footerText: {
    margin: "5px 0 0",
    fontSize: "13px",
    color: "#888888",
  },

  copyright: {
    margin: 0,
    fontSize: "13px",
    color: "#999999",
  },
};

export default App;
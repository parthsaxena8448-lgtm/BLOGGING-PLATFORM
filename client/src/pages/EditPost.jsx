import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/posts/${id}`
        );

        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load post."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5001/api/posts/${id}`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Post updated successfully!");

      setTimeout(() => {
        navigate("/my-posts");
      }, 1000);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to update post."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.loading}>
          Loading post...
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.wrapper}>
        <div style={styles.header}>
          <p style={styles.eyebrow}>EDIT YOUR STORY</p>

          <h1 style={styles.title}>Edit post</h1>

          <p style={styles.subtitle}>
            Make changes to your story and save them when
            you're ready.
          </p>
        </div>

        <form onSubmit={handleUpdate} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={styles.titleInput}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Content</label>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="14"
              required
              style={styles.textarea}
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

          <div style={styles.actions}>
            <button
              type="button"
              onClick={() => navigate("/my-posts")}
              style={styles.cancelButton}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              style={styles.saveButton}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 72px)",
    backgroundColor: "#fafafa",
    padding: "60px 20px 80px",
  },

  wrapper: {
    maxWidth: "760px",
    margin: "0 auto",
  },

  header: {
    marginBottom: "35px",
  },

  eyebrow: {
    margin: "0 0 10px",
    fontSize: "11px",
    letterSpacing: "2px",
    fontWeight: "700",
    color: "#777777",
  },

  title: {
    margin: "0 0 10px",
    fontSize: "42px",
    lineHeight: "1.1",
    color: "#111111",
  },

  subtitle: {
    margin: 0,
    fontSize: "16px",
    color: "#777777",
    lineHeight: "1.6",
  },

  form: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e5e5",
    borderRadius: "20px",
    padding: "32px",
  },

  field: {
    marginBottom: "24px",
  },

  label: {
    display: "block",
    marginBottom: "9px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#222222",
  },

  titleInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "15px 16px",
    border: "1px solid #d6d6d6",
    borderRadius: "10px",
    fontSize: "18px",
    color: "#111111",
    backgroundColor: "#ffffff",
    outline: "none",
  },

  textarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: "15px 16px",
    border: "1px solid #d6d6d6",
    borderRadius: "10px",
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#111111",
    backgroundColor: "#ffffff",
    resize: "vertical",
    outline: "none",
    fontFamily: "inherit",
  },

  error: {
    marginBottom: "18px",
    padding: "12px 14px",
    border: "1px solid #dddddd",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#222222",
    backgroundColor: "#fafafa",
  },

  success: {
    marginBottom: "18px",
    padding: "12px 14px",
    border: "1px solid #dddddd",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#222222",
    backgroundColor: "#fafafa",
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "8px",
  },

  cancelButton: {
    padding: "12px 20px",
    border: "1px solid #d6d6d6",
    borderRadius: "999px",
    backgroundColor: "#ffffff",
    color: "#222222",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },

  saveButton: {
    padding: "12px 22px",
    border: "none",
    borderRadius: "999px",
    backgroundColor: "#111111",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
  },

  loading: {
    textAlign: "center",
    padding: "100px 20px",
    fontSize: "16px",
    color: "#777777",
  },
};

export default EditPost;
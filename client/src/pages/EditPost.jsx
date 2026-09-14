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
          `${import.meta.env.VITE_API_URL}/posts/${id}`
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

      if (!token) {
        setError("Please log in first.");
        setSaving(false);
        return;
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/posts/${id}`,
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
      <main className="editor-page">
        <div className="article-state">
          <div className="loading-dot"></div>
          <p>Loading post...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="editor-page">
      <div className="editor-wrapper">
        <div className="editor-header">
          <p className="editor-eyebrow">EDIT YOUR STORY</p>

          <h1>Edit post</h1>

          <p>
            Make changes to your story and save them when
            you're ready.
          </p>
        </div>

        <form
          onSubmit={handleUpdate}
          className="editor-card"
        >
          <div className="editor-field">
            <label htmlFor="title">Title</label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="editor-field">
            <label htmlFor="content">Content</label>

            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="14"
              required
            />
          </div>

          {error && (
            <div className="editor-message editor-error">
              {error}
            </div>
          )}

          {message && (
            <div className="editor-message editor-success">
              {message}
            </div>
          )}

          <div className="editor-actions">
            <button
              type="button"
              className="editor-cancel"
              onClick={() => navigate("/my-posts")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="editor-submit"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditPost;
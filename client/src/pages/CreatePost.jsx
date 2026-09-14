import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in first.");
        setLoading(false);
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
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

      setMessage("Post published successfully!");

      setTitle("");
      setContent("");

      setTimeout(() => {
        navigate("/my-posts");
      }, 1000);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to create post. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="editor-page">
      <div className="editor-wrapper">
        <div className="editor-header">
          <p className="editor-eyebrow">WRITE ON MYBLOG</p>

          <h1>Create a new post</h1>

          <p>
            Turn your ideas into a story worth sharing.
          </p>
        </div>

        <form
          onSubmit={handleCreatePost}
          className="editor-card"
        >
          <div className="editor-field">
            <label htmlFor="title">Title</label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your post a title"
              required
            />
          </div>

          <div className="editor-field">
            <label htmlFor="content">Content</label>

            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell your story..."
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
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="editor-submit"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CreatePost;
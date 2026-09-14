import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMyPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5001/api/posts/my-posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts(response.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load your posts."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleDelete = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setMessage("");
    setDeletingId(postId);

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5001/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== postId)
      );

      setMessage("Post deleted successfully.");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to delete post."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">
        <section className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">YOUR WRITING</p>

            <h1>My Posts</h1>

            <p>
              Manage everything you've published on MyBlog.
            </p>
          </div>

          <Link
            to="/create-post"
            className="dashboard-create-button"
          >
            + Write a post
          </Link>
        </section>

        {message && (
          <div className="dashboard-message">
            {message}
          </div>
        )}

        {error && (
          <div className="dashboard-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="dashboard-state">
            <div className="loading-dot"></div>
            <p>Loading your posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="dashboard-state">
            <div className="empty-icon">✦</div>

            <h2>Nothing here yet.</h2>

            <p>
              Your published stories will appear here.
            </p>

            <Link
              to="/create-post"
              className="dashboard-create-button"
            >
              Write your first post
            </Link>
          </div>
        ) : (
          <section className="dashboard-list">
            {posts.map((post, index) => (
              <article
                key={post._id}
                className="dashboard-card"
              >
                <div className="dashboard-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="dashboard-card-main">
                  <div className="dashboard-author">
                    <div className="dashboard-avatar">
                      {(post.author?.name || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>
                        {post.author?.name || "Unknown author"}
                      </strong>

                      <span>Published on MyBlog</span>
                    </div>
                  </div>

                  <h2>
                    <Link to={`/posts/${post._id}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p>{post.content}</p>

                  <div className="dashboard-actions">
                    <Link
                      to={`/posts/${post._id}`}
                      className="dashboard-secondary-button"
                    >
                      View
                    </Link>

                    <Link
                      to={`/edit-post/${post._id}`}
                      className="dashboard-secondary-button"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(post._id)}
                      className="dashboard-delete-button"
                      disabled={deletingId === post._id}
                    >
                      {deletingId === post._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default MyPosts;
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/posts/${id}`
        );

        setPost(response.data);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Unable to load this article."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <main className="article-page">
        <div className="article-state">
          <div className="loading-dot"></div>
          <p>Loading article...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="article-page">
        <div className="article-state">
          <h2>Article unavailable</h2>
          <p>{error}</p>

          <Link to="/" className="article-back-button">
            ← Back to Home
          </Link>
        </div>
      </main>
    );
  }

  if (!post) {
    return null;
  }

  const authorName = post.author?.name || "Unknown author";

  return (
    <main className="article-page">
      <article className="article-container">
        <Link to="/" className="article-back">
          ← Back to stories
        </Link>

        <div className="article-header">
          <div className="article-meta">
            <div className="article-avatar">
              {authorName.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="article-author">
                {authorName}
              </div>

              <div className="article-meta-secondary">
                Published on MyBlog
              </div>
            </div>
          </div>

          <span className="article-label">
            STORY
          </span>
        </div>

        <h1 className="article-title">
          {post.title}
        </h1>

        <p className="article-subtitle">
          A story, idea, or experience shared with the
          MyBlog community.
        </p>

        <div className="article-divider"></div>

        <div className="article-content">
          {post.content}
        </div>

        <div className="article-footer">
          <div className="article-footer-avatar">
            {authorName.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="article-written-by">
              Written by
            </p>

            <p className="article-author-name">
              {authorName}
            </p>

            {post.author?.email && (
              <p className="article-author-email">
                {post.author.email}
              </p>
            )}
          </div>
        </div>

        <div className="article-bottom">
          <Link to="/" className="article-back-button">
            ← Read more stories
          </Link>
        </div>
      </article>
    </main>
  );
}

export default PostDetails;
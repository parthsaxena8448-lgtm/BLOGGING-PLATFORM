import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts`
        );

        setPosts(response.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load posts right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-badge">MYBLOG • STORIES WORTH SHARING</div>

        <h1 className="hero-title">
          Ideas, stories
          <br />
          &amp; experiences.
        </h1>

        <p className="hero-subtitle">
          A simple place to discover thoughtful writing,
          share what you know, and tell your story.
        </p>

        <div className="hero-actions">
          <Link to="/create-post" className="primary-button">
            Start Writing
          </Link>

          <a href="#latest-posts" className="secondary-button">
            Explore Stories
          </a>
        </div>
      </section>

      <section id="latest-posts" className="posts-section">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">FROM THE COMMUNITY</p>

            <h2>Latest stories</h2>
          </div>

          <span className="post-count">
            {posts.length} {posts.length === 1 ? "story" : "stories"}
          </span>
        </div>

        {loading && (
          <div className="state-card">
            <div className="loading-dot"></div>
            <p>Loading stories...</p>
          </div>
        )}

        {error && (
          <div className="state-card">
            <h3>Something went wrong</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="state-card">
            <h3>Your story could be the first.</h3>

            <p>
              Start writing and publish your first post on
              MyBlog.
            </p>

            <Link
              to="/create-post"
              className="primary-button"
            >
              Write a Post
            </Link>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="post-grid">
            {posts.map((post, index) => (
              <article
                key={post._id}
                className={`post-card ${
                  index === 0 ? "featured-card" : ""
                }`}
              >
                <div className="post-card-top">
                  <div className="author-info">
                    <div className="author-avatar">
                      {(post.author?.name || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <div className="author-name">
                        {post.author?.name || "Unknown author"}
                      </div>

                      <div className="post-meta">
                        MyBlog
                      </div>
                    </div>
                  </div>

                  <span className="story-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <Link
                  to={`/posts/${post._id}`}
                  className="post-card-link"
                >
                  <h3 className="post-card-title">
                    {post.title}
                  </h3>

                  <p className="post-card-excerpt">
                    {post.content}
                  </p>
                </Link>

                <div className="post-card-bottom">
                  <Link
                    to={`/posts/${post._id}`}
                    className="read-link"
                  >
                    Read story
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {!isLoggedIn && posts.length > 0 && (
        <section className="bottom-cta">
          <p className="section-eyebrow">YOUR TURN</p>

          <h2>Have something to say?</h2>

          <p>
            Join MyBlog and publish your first story in
            minutes.
          </p>

          <Link to="/register" className="primary-button">
            Create an Account
          </Link>
        </section>
      )}
    </main>
  );
}

export default Home;
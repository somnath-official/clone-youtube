export const Home = () => {
  return (
    <div className="home-main">
      <section id="hero">
        <h1>Welcome to PlayTube</h1>
        <p>Expand your creativity.</p>
        <button>Get Started</button>
      </section>

      <section className="home-section">
        <div className="trending-section">
          <h2>Trending</h2>
          <div className="trending-section-card-container">
            <div className="trending-card">
              <h3>Gaming</h3>
              <p>Checkout latest gaming videos.</p>
            </div>
            <div className="trending-card">
              <h3>Life style</h3>
              <p>Explore glory of life.</p>
            </div>
            <div className="trending-card">
              <h3>Cricket</h3>
              <p>Check exiting new matches.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

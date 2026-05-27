export default function Book() {
    return (
      <section className="section">
        <div className="container narrow">
          <h2 className="h2">Book</h2>
          <p className="muted">
            This page is where we’ll embed your booking system (Calendly, Acuity, Momence,
            Mindbody, etc.).
          </p>
  
          <div className="card">
            <div className="cardTitle">Placeholder booking panel</div>
            <p className="muted">
              When you’re ready, tell me which platform you want and I’ll drop in the embed.
            </p>
            <div className="btnRow">
              <a className="btn" href="https://calendly.com" target="_blank" rel="noreferrer">
                Use Calendly
              </a>
              <a className="btn btnGhost" href="https://acuityscheduling.com" target="_blank" rel="noreferrer">
                Use Acuity
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
import React from "react";
import "./style.css";

export default function Task3Layout() {
  return (
    <>

      <main className="page">
        <section className="left-panel">
          <header className="left-header">
            <h1 className="title">Level 2: Intermediate</h1>
          </header>

          <div className="illustration-wrap">
            <img
              className="illustration"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=60"
              alt="Illustration"
            />
          </div>
        </section>

        <section className="right-panel">
          <div className="topbar">
            <h2 className="task">
              Task 3: Advanced CSS Styling and Responsive Design
            </h2>

            <div className="brand" aria-label="Cognifyz brand">
              <div className="brand-mark" />
              <div className="brand-text">
                <div className="brand-name">Cognifyz</div>
                <div className="brand-tag">Where Data Meets Intelligence</div>
              </div>
            </div>
          </div>

          <div className="content">
            <p className="objective">
              <strong>Objective:</strong> Enhance CSS styling and make the webpage
              fully responsive.
            </p>

            <div className="steps-card">
              <h3 className="steps-title">Steps:</h3>
              <ol className="steps">
                <li>Create a more complex layout with multiple sections.</li>
                <li>
                  Experiment with CSS properties for advanced styling (e.g.,
                  transitions, animations).
                </li>
                <li>
                  Utilize a CSS framework (e.g., Bootstrap) for a consistent and
                  responsive UI.
                </li>
              </ol>

              <div className="actions d-flex flex-wrap gap-2 mt-3">
                <button type="button" className="btn btn-dark btn-anim">
                  Get Started
                </button>
                <button type="button" className="btn btn-outline-dark btn-anim">
                  View Details
                </button>
              </div>
            </div>

            <div className="mini-grid">
              <article className="mini-card">
                <div className="mini-kpi">Responsive</div>
                <p className="mini-text">
                  Layout adapts from desktop → tablet → mobile.
                </p>
              </article>

              <article className="mini-card">
                <div className="mini-kpi">Transitions</div>
                <p className="mini-text">
                  Hover/focus effects for modern UI feel.
                </p>
              </article>

              <article className="mini-card">
                <div className="mini-kpi">Animation</div>
                <p className="mini-text">
                  Subtle entrance animation on load.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
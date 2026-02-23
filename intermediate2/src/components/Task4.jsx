import React, { useMemo, useState } from "react";
import "./task4.css";

/**
 * Task 4: Complex Form Validation and Dynamic DOM Manipulation
 * - Complex validation (email + password strength + confirm password)
 * - Dynamic DOM updates (live preview + password strength meter)
 * - Simple client-side routing (no library) via internal state
 *
 * Note: If you're using React Router, tell me and I’ll convert this to <Routes/>.
 */
export default function Task4Layout() {
  const [route, setRoute] = useState("form"); // "form" | "success" | "about"

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
    acceptTerms: false,
  });

  function onChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function onBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  const passwordScore = useMemo(() => scorePassword(form.password), [form.password]);

  const errors = useMemo(() => {
    const next = {};

    // Full name: at least 2 chars, letters/spaces allowed
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    else if (form.fullName.trim().length < 2) next.fullName = "Name must be at least 2 characters.";
    else if (!/^[a-zA-Z\s.'-]+$/.test(form.fullName.trim()))
      next.fullName = "Name can contain only letters and basic punctuation.";

    // Email
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = "Enter a valid email address.";

    // Password strength rules
    if (!form.password) next.password = "Password is required.";
    else {
      const pwErr = passwordRulesError(form.password);
      if (pwErr) next.password = pwErr;
    }

    // Confirm password
    if (!form.confirmPassword) next.confirmPassword = "Please confirm your password.";
    else if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords do not match.";

    // Terms
    if (!form.acceptTerms) next.acceptTerms = "You must accept the terms.";

    return next;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0;

  function onSubmit(e) {
    e.preventDefault();
    // mark all touched so errors show
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      acceptTerms: true,
    });

    if (!canSubmit) return;

    setRoute("success");
  }

  return (
    <main className="page task4">
      <section className="left-panel">
        <header className="left-header">
          <h1 className="title">Level 2: Intermediate</h1>
        </header>

        <div className="illustration-wrap">
          <img
            className="illustration"
            src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=900&q=60"
            alt="Illustration"
          />
        </div>
      </section>

      <section className="right-panel">
        <div className="topbar">
          <h2 className="task">
            Task 4: Complex Form Validation <br />
            and Dynamic DOM Manipulation
          </h2>

          <div className="brand" aria-label="Cognifyz brand">
            <div className="brand-mark" />
            <div className="brand-text">
              <div className="brand-name">Cognifyz</div>
              <div className="brand-tag">Where Data Meets Intelligence</div>
            </div>
          </div>
        </div>

        <nav className="nav">
          <button
            type="button"
            className={`nav-btn ${route === "form" ? "active" : ""}`}
            onClick={() => setRoute("form")}
          >
            Form
          </button>
          <button
            type="button"
            className={`nav-btn ${route === "about" ? "active" : ""}`}
            onClick={() => setRoute("about")}
          >
            About
          </button>
          <button
            type="button"
            className={`nav-btn ${route === "success" ? "active" : ""}`}
            onClick={() => setRoute("success")}
            disabled={!canSubmit}
            title={!canSubmit ? "Complete the form to enable" : "Go to success"}
          >
            Success
          </button>
        </nav>

        <div className="content">
          <p className="objective">
            <strong>Objective:</strong> Extend form validation and implement dynamic updates to the
            DOM.
          </p>

          <div className="steps-card">
            <h3 className="steps-title">Steps:</h3>
            <ol className="steps">
              <li>Enhance form validation to include more complex rules (e.g., password strength).</li>
              <li>Dynamically update the DOM based on user interactions using JavaScript.</li>
              <li>Implement client-side routing for a smoother user experience.</li>
            </ol>
          </div>

          {route === "about" && (
            <section className="panel">
              <h3 className="panel-title">What this demonstrates</h3>
              <ul className="bullets">
                <li>Complex validation: name/email + password strength + confirm password.</li>
                <li>Dynamic DOM updates: live preview + strength meter that updates as you type.</li>
                <li>Client-side routing: tabs implemented with React state.</li>
              </ul>
            </section>
          )}

          {route === "success" && (
            <section className="panel success">
              <h3 className="panel-title">Success</h3>
              <p className="muted">
                Your form is valid. This screen is shown using client-side routing (state-based).
              </p>

              <div className="preview">
                <div className="preview-row">
                  <span className="k">Name</span>
                  <span className="v">{form.fullName || "—"}</span>
                </div>
                <div className="preview-row">
                  <span className="k">Email</span>
                  <span className="v">{form.email || "—"}</span>
                </div>
              </div>

              <div className="row-actions">
                <button type="button" className="btn" onClick={() => setRoute("form")}>
                  Back to Form
                </button>
              </div>
            </section>
          )}

          {route === "form" && (
            <section className="panel">
              <h3 className="panel-title">Registration Form</h3>

              <form className="form" onSubmit={onSubmit} noValidate>
                <div className="field">
                  <label className="label" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    className={`input ${touched.fullName && errors.fullName ? "invalid" : ""}`}
                    value={form.fullName}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="e.g., Vijay Singh"
                    autoComplete="name"
                  />
                  {touched.fullName && errors.fullName && (
                    <div className="error">{errors.fullName}</div>
                  )}
                </div>

                <div className="field">
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`input ${touched.email && errors.email ? "invalid" : ""}`}
                    value={form.email}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                  {touched.email && errors.email && <div className="error">{errors.email}</div>}
                </div>

                <div className="grid-2">
                  <div className="field">
                    <label className="label" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className={`input ${touched.password && errors.password ? "invalid" : ""}`}
                      value={form.password}
                      onChange={onChange}
                      onBlur={onBlur}
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                    />

                    <StrengthMeter score={passwordScore} password={form.password} />

                    {touched.password && errors.password && (
                      <div className="error">{errors.password}</div>
                    )}
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="confirmPassword">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className={`input ${
                        touched.confirmPassword && errors.confirmPassword ? "invalid" : ""
                      }`}
                      value={form.confirmPassword}
                      onChange={onChange}
                      onBlur={onBlur}
                      autoComplete="new-password"
                      placeholder="Re-enter password"
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div className="error">{errors.confirmPassword}</div>
                    )}
                  </div>
                </div>

                <div className="field checkbox">
                  <label className="checkline">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={form.acceptTerms}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                    <span>I accept the terms and conditions</span>
                  </label>
                  {touched.acceptTerms && errors.acceptTerms && (
                    <div className="error">{errors.acceptTerms}</div>
                  )}
                </div>

                {/* Dynamic DOM update: live preview */}
                <div className="preview">
                  <div className="preview-title">Live Preview</div>
                  <div className="preview-row">
                    <span className="k">Name</span>
                    <span className="v">{form.fullName || "—"}</span>
                  </div>
                  <div className="preview-row">
                    <span className="k">Email</span>
                    <span className="v">{form.email || "—"}</span>
                  </div>
                </div>

                <div className="row-actions">
                  <button type="submit" className="btn primary" disabled={!canSubmit}>
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setForm({
                        fullName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        acceptTerms: false,
                      });
                      setTouched({
                        fullName: false,
                        email: false,
                        password: false,
                        confirmPassword: false,
                        acceptTerms: false,
                      });
                    }}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

function StrengthMeter({ score, password }) {
  const meta = getStrengthMeta(score);

  return (
    <div className="meter" aria-label="Password strength meter">
      <div className="meter-top">
        <span className="meter-label">Strength:</span>
        <span className={`meter-badge ${meta.className}`}>{meta.text}</span>
      </div>
      <div className="meter-bar" role="progressbar" aria-valuemin={0} aria-valuemax={4} aria-valuenow={score}>
        <div className={`meter-fill ${meta.className}`} style={{ width: `${(score / 4) * 100}%` }} />
      </div>
      <div className="meter-hint">
        {password.length === 0
          ? "Use 8+ chars, uppercase, lowercase, number, special."
          : meta.hint}
      </div>
    </div>
  );
}
function passwordRulesError(pw) {
  if (pw.length < 8) return "Password must be at least 8 characters.";
  if (!/[a-z]/.test(pw)) return "Add at least one lowercase letter.";
  if (!/[A-Z]/.test(pw)) return "Add at least one uppercase letter.";
  if (!/[0-9]/.test(pw)) return "Add at least one number.";
  if (!/[^A-Za-z0-9]/.test(pw)) return "Add at least one special character.";
  return "";
}

function scorePassword(pw) {
  // 0..4 (simple scoring)
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4);
}

function getStrengthMeta(score) {
  switch (score) {
    case 0:
    case 1:
      return { text: "Weak", className: "weak", hint: "Add length + mixed case + numbers + special." };
    case 2:
      return { text: "Fair", className: "fair", hint: "Add a special character and increase length." };
    case 3:
      return { text: "Good", className: "good", hint: "Almost there—consider adding more length." };
    case 4:
      return { text: "Strong", className: "strong", hint: "Great password strength." };
    default:
      return { text: "—", className: "weak", hint: "" };
  }
}
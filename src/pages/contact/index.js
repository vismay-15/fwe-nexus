import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./style.css";

const EMAIL = "vismaymloliyaniya@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/vismayloliyaniya/";

const TOPICS = [
  { id: "question", label: "A question about the research" },
  { id: "suggestion", label: "A suggestion for the website or research" },
  { id: "stakeholder", label: "Suggest an organisation for the map" },
  { id: "correction", label: "A correction to a profile or figure" },
  { id: "collaboration", label: "Collaboration or speaking" },
  { id: "other", label: "Something else" },
];

export const Contact = () => {
  const [params] = useSearchParams();
  const initialTopic = TOPICS.some((t) => t.id === params.get("topic")) ? params.get("topic") : "question";
  const about = params.get("about") || "";
  const [topic, setTopic] = useState(initialTopic);
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState(about ? `About: ${about}\n\n` : "");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const topicLabel = TOPICS.find((t) => t.id === topic)?.label || "Message";

  const submit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Write a message first, then open it in your email app.");
      return;
    }
    setError("");
    const subject = `[WEF Nexus Europe] ${topicLabel}${about ? ` – ${about}` : ""}`;
    const footer = [name && `Name: ${name}`, org && `Organisation: ${org}`, "Sent from the WEF Nexus Europe website"]
      .filter(Boolean)
      .join("\n");
    const body = `${message.trim()}\n\n—\n${footer}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="section contact-intro">
        <div className="wrap measure">
          <h1>Get in touch</h1>
          <p className="lede">
            Questions, suggestions and corrections are all welcome, whether you are a researcher, a student, a
            practitioner or one of the organisations on the map.
          </p>
        </div>
      </section>

      <section className="section section--paper">
        <div className="wrap contact-grid">
          <form className="contact-form" onSubmit={submit} noValidate>
            <h2>Send a message</h2>
            <label htmlFor="c-topic">What is it about?</label>
            <select id="c-topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
              {TOPICS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>

            <div className="contact-form__row">
              <div>
                <label htmlFor="c-name">Your name (optional)</label>
                <input id="c-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="c-org">Organisation (optional)</label>
                <input id="c-org" type="text" autoComplete="organization" value={org} onChange={(e) => setOrg(e.target.value)} />
              </div>
            </div>

            <label htmlFor="c-msg">Message</label>
            <textarea
              id="c-msg"
              rows={7}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (error) setError("");
              }}
              aria-invalid={!!error}
              aria-describedby={error ? "c-err" : "c-help"}
            />
            {error && (
              <p id="c-err" className="contact-form__error" role="alert">
                {error}
              </p>
            )}
            <p id="c-help" className="contact-form__help">
              This opens your email app with the message ready to send. Nothing you type is stored on this website.
            </p>
            <button type="submit" className="btn-ink">
              Open in my email app
            </button>
            {sent && (
              <p className="contact-form__after" role="status">
                If your email app didn't open, send your message to <b>{EMAIL}</b>.
              </p>
            )}
          </form>

          <aside className="contact-side">
            <div className="researcher">
              <p className="researcher__label">Researcher</p>
              <p className="researcher__name">
                <a href={LINKEDIN} target="_blank" rel="noreferrer">
                  Vismay Loliyaniya, MSc, GMICE, CAVA, IQA
                </a>
              </p>
              <ul className="researcher__creds">
                <li>Chartered Institute of Building (CIOB): Educator Pathway member</li>
                <li>Working towards Fellowship of the Higher Education Academy (FHEA)</li>
              </ul>
            </div>
            <h2>Other ways to reach me</h2>
            <dl>
              <div>
                <dt>Email</dt>
                <dd>
                  <span className="contact-email">{EMAIL}</span>{" "}
                  <button type="button" className="link-btn" onClick={copy}>
                    {copied ? "Copied" : "Copy address"}
                  </button>
                </dd>
              </div>
              <div>
                <dt>Website</dt>
                <dd>
                  <a href="https://www.vismayloliyaniya.com/">vismayloliyaniya.com</a>
                </dd>
              </div>
              <div>
                <dt>LinkedIn</dt>
                <dd>
                  <a href={LINKEDIN} target="_blank" rel="noreferrer">
                    linkedin.com/in/vismayloliyaniya
                  </a>
                </dd>
              </div>
            </dl>
            <h3>Especially helpful</h3>
            <ul>
              <li>Organisations working on water, energy and food that should be on the map</li>
              <li>Corrections to a profile, project or figure, with a source if you have one</li>
              <li>Experts in Spain or Germany willing to be interviewed for the next stage of the research</li>
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
};

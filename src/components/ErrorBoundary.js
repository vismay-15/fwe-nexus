import React from "react";

// Catches a crash while a page is drawing, so the visitor sees a clear
// message and a reload button instead of a blank screen.
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidUpdate(prev) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null });
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="wrap section">
        <h1>This page didn't load</h1>
        <p className="measure">
          Reload the page to try again. If it keeps happening, please send a screenshot of this message, including the
          details below.
        </p>
        <button className="btn-ink" onClick={() => window.location.reload()}>
          Reload page
        </button>
        <pre className="muted mt-4" style={{ whiteSpace: "pre-wrap", fontSize: "0.8rem" }}>
          {String(this.state.error && (this.state.error.stack || this.state.error.message || this.state.error)).slice(0, 800)}
          {"\n"}
          {navigator.userAgent}
        </pre>
      </div>
    );
  }
}

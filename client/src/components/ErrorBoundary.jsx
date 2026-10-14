import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("UI crashed:", error, info?.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div role="alert" className="mx-auto max-w-3xl p-8">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-ink-soft">This page could not be displayed. Please reload, or email info@ethixweb.com.</p>
        {import.meta.env.DEV && (
          <pre className="mt-6 overflow-auto rounded-lg bg-wash p-4 text-sm whitespace-pre-wrap text-brand-deep">
            {String(error?.stack || error)}
          </pre>
        )}
        <button type="button" className="btn btn-primary mt-6" onClick={() => window.location.reload()}>
          Reload page
        </button>
      </div>
    );
  }
}

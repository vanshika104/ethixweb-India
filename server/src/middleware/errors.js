export class HttpError extends Error {
  status;
  extra;
  constructor(status, message, extra) {
    super(message);
    this.status = status;
    this.extra = extra;
  }
}
export const notFoundApi = (_req, res) => {
  res.status(404).json({ error: "Not found" });
};
export const errorHandler = (err, req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message, ...err.extra });
    return;
  }
  if (err?.type === "entity.too.large") {
    res.status(413).json({ error: "Request is too large." });
    return;
  }
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ error: "Invalid JSON." });
    return;
  }
  console.error(`[error] ${req.method} ${req.originalUrl}`, err instanceof Error ? err.stack : err);
  res.status(500).json({ error: "Something went wrong on our side. Please try again." });
};

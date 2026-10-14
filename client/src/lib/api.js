export class ApiError extends Error {
  constructor(status, message, fieldErrors) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}
export async function api(path, init = {}) {
  let res;
  try {
    res = await fetch(path, {
      credentials: "same-origin",
      ...init,
      headers: { ...(init.body ? { "Content-Type": "application/json" } : {}), ...init.headers },
    });
  }
  catch {
    throw new ApiError(0, "Network error. Check your connection and try again.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new ApiError(res.status, data.error ?? "Something went wrong.", data.fieldErrors);
  return data;
}

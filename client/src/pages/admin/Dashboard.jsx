import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { usePage } from "../../hooks/usePage";
import { ApiError, api } from "../../lib/api";
const STATUSES = ["new", "contacted", "qualified", "won", "lost"];
const fmt = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });
export default function Dashboard() {
  usePage("Leads | Ethixweb admin", undefined, true);
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (status)
      params.set("status", status);
    if (query)
      params.set("q", query);
    try {
      setData(await api(`/api/admin/leads?${params}`));
      setError("");
    }
    catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }
      setError(err instanceof ApiError ? err.message : "Could not load leads.");
    }
    finally {
      setLoading(false);
    }
  }, [page, status, query, navigate]);
  useEffect(() => {
    void load();
  }, [load]);
  async function changeStatus(id, next) {
    try {
      await api(`/api/admin/leads/${id}`, { method: "PATCH", body: JSON.stringify({ status: next }) });
      await load();
    }
    catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not update the lead.");
    }
  }
  async function remove(lead) {
    if (!window.confirm(`Delete the enquiry from ${lead.name}? This cannot be undone.`))
      return;
    try {
      await api(`/api/admin/leads/${lead._id}`, { method: "DELETE" });
      await load();
    }
    catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not delete the lead.");
    }
  }
  async function logout() {
    await api("/api/admin/logout", { method: "POST" }).catch(() => undefined);
    navigate("/admin/login", { replace: true });
  }
  function onSearch(e) {
    e.preventDefault();
    setPage(1);
    setQuery(q.trim());
  }
  const tile = "rounded-xl border bg-white px-4 py-4 text-left transition-colors";
  return (<div className="min-h-screen bg-wash">
    <div className="border-b border-line bg-white">
    <div className="wrap flex min-h-16 flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
      <Logo />
      <span className="font-semibold text-ink-soft">Leads</span>
      </div>
      <div className="flex gap-2">
      <a className="btn btn-ghost btn-sm" href="/api/admin/leads/export.csv">Export CSV</a>
      <button type="button" className="btn btn-ghost btn-sm" onClick={logout}>Sign out</button>
      </div>
    </div>
    </div>

    <main className="wrap pt-8 pb-16">
    <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-6">
      <button type="button" onClick={() => { setStatus(""); setPage(1); }} aria-pressed={status === ""} className={`${tile} ${status === "" ? "border-brand ring-1 ring-brand" : "border-line"}`}>
      <b className="block font-display text-2xl">{data?.counts.all ?? "–"}</b>
      <span className="text-sm text-ink-soft">All leads</span>
      </button>
      {STATUSES.map((s) => (<button key={s} type="button" onClick={() => { setStatus(s); setPage(1); }} aria-pressed={status === s} className={`${tile} ${status === s ? "border-brand ring-1 ring-brand" : "border-line"}`}>
        <b className="block font-display text-2xl">{data?.counts[s] ?? "–"}</b>
        <span className="text-sm text-ink-soft capitalize">{s}</span>
      </button>))}
    </div>

    <form onSubmit={onSearch} role="search" className="mb-5 flex flex-wrap gap-3">
      <label htmlFor="q" className="sr-only">Search leads</label>
      <input id="q" className="input max-w-sm" placeholder="Search name, email, phone, company or message" value={q} onChange={(e) => setQ(e.target.value)} maxLength={100}/>
      <button type="submit" className="btn btn-primary btn-sm">Search</button>
      {query && (<button type="button" className="btn btn-ghost btn-sm" onClick={() => { setQ(""); setQuery(""); setPage(1); }}>Clear</button>)}
    </form>

    {error && <p role="alert" className="mb-4 rounded-lg bg-brand-tint px-4 py-3 font-medium text-brand-deep">{error}</p>}

    <div className="overflow-x-auto rounded-[14px] border border-line bg-white" aria-busy={loading}>
      <table className="w-full min-w-[62rem] border-collapse text-[0.95rem]">
      <caption className="sr-only">Enquiries received through the website</caption>
      <thead>
        <tr className="bg-wash text-left">
        {["Received (IST)", "Contact", "Interest", "Message", "Status", ""].map((h) => (<th key={h || "actions"} scope="col" className="border-b border-line px-4 py-3 font-semibold whitespace-nowrap">{h || <span className="sr-only">Actions</span>}</th>))}
        </tr>
      </thead>
      <tbody>
        {data?.leads.map((l) => (<tr key={l._id} className="border-b border-line align-top last:border-b-0">
          <td className="px-4 py-4 whitespace-nowrap">{fmt.format(new Date(l.createdAt))}</td>
          <td className="px-4 py-4">
          <div className="font-semibold">{l.name}</div>
          {l.company && <div className="text-sm text-ink-soft">{l.company}</div>}
          <a className="block text-brand-deep underline underline-offset-2" href={`mailto:${l.email}`}>{l.email}</a>
          <a className="text-brand-deep underline underline-offset-2" href={`https://wa.me/${l.phone.replace("+", "")}`} target="_blank" rel="noopener noreferrer">
            {l.phone} <span className="sr-only">(opens WhatsApp)</span>
          </a>
          </td>
          <td className="px-4 py-4">
          <div>{l.service}</div>
          <div className="text-sm text-ink-soft">{l.budget}</div>
          </td>
          <td className="px-4 py-4">
          <details>
            <summary className="cursor-pointer font-semibold text-brand-deep">Read message</summary>
            <p className="mt-2 max-w-md whitespace-pre-wrap">{l.message}</p>
          </details>
          </td>
          <td className="px-4 py-4">
          <label className="sr-only" htmlFor={`status-${l._id}`}>Status for {l.name}</label>
          <select id={`status-${l._id}`} className="input w-auto py-2 text-sm capitalize" value={l.status} onChange={(e) => changeStatus(l._id, e.target.value)}>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          </td>
          <td className="px-4 py-4">
          <button type="button" className="font-semibold text-brand-deep underline underline-offset-2" onClick={() => remove(l)}>
            Delete<span className="sr-only"> enquiry from {l.name}</span>
          </button>
          </td>
        </tr>))}
      </tbody>
      </table>
      {data && data.leads.length === 0 && (<p className="px-6 py-12 text-center text-ink-soft">
        {query || status ? "No leads match these filters. Clear the search or choose another status." : "No enquiries yet. They will appear here as soon as someone submits the contact form."}
      </p>)}
      {!data && loading && <p className="px-6 py-12 text-center text-ink-soft">Loading leads…</p>}
    </div>

    {data && data.pages > 1 && (<nav aria-label="Pagination" className="mt-4 flex items-center justify-between text-ink-soft">
      <button type="button" className="btn btn-ghost btn-sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
      <span>Page {data.page} of {data.pages} ({data.total} leads)</span>
      <button type="button" className="btn btn-ghost btn-sm" disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)}>Next</button>
      </nav>)}
    </main>
  </div>);
}

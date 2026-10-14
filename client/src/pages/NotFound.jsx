import { Link } from "react-router-dom";
import { usePage } from "../hooks/usePage";
export default function NotFound() {
  usePage("Page not found | Ethixweb India", undefined, true);
  return (<section className="grid min-h-[60vh] place-content-center justify-items-center gap-5 px-5 py-12 text-center">
    <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold">Page not found</h1>
    <p className="lead">The page you are looking for has moved or does not exist.</p>
    <Link to="/" className="btn btn-primary">Back to home</Link>
  </section>);
}

import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
export default function Layout() {
  return (<>
    <a href="#main" className="absolute -top-16 left-4 z-[100] rounded-lg bg-ink px-4 py-2.5 text-white focus:top-4">
    Skip to content
    </a>
    <Header />
    <main id="main">
    <Outlet />
    </main>
    <Footer />
  </>);
}

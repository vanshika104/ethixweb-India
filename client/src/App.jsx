import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
// The admin area is code-split so public visitors never download it.
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  },[pathname]);
  return null;
}
export default function App() {
  return (<>
    <ScrollToTop />
    <Suspense fallback={<div className="p-10 text-center text-ink-soft">Loading…</div>}>
    <Routes>
      <Route element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path="services" element={<Services />}/>
      <Route path="about" element={<About />}/>
      <Route path="contact" element={<Contact />}/>
      <Route path="*" element={<NotFound />}/>
      </Route>
      <Route path="/admin/login" element={<AdminLogin />}/>
      <Route path="/admin" element={<AdminDashboard />}/>
    </Routes>
    </Suspense>
  </>);
}

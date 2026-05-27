import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Classes from "./pages/Classes.jsx";
import Schedule from "./pages/Schedule.jsx";
import Journal from "./pages/Journal.jsx";
import JournalPost from "./pages/JournalPost.jsx";
import WhatToExpect from "./pages/WhatToExpect.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

function LegacyJournalRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/blog/${slug}` : "/blog"} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/blog" element={<Journal />} />
        <Route path="/blog/:slug" element={<JournalPost />} />
        <Route path="/journal" element={<Navigate to="/blog" replace />} />
        <Route path="/journal/:slug" element={<LegacyJournalRedirect />} />
        <Route path="/what-to-expect" element={<WhatToExpect />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

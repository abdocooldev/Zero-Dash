import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import Courses from "./pages/Courses";
import Team from "./pages/Team";
import Files from "./pages/Files";
import Plans from "./pages/Plans";
import useStore from "@/store/useStore";

function App() {
  const fetchAllData = useStore((state) => state.fetchAllData);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="projects" element={<Projects />} />
          <Route path="courses" element={<Courses />} />
          <Route path="team" element={<Team />} />
          <Route path="files" element={<Files />} />
          <Route path="plans" element={<Plans />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

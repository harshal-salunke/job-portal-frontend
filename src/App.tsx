import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import CandidateDiscovery from './pages/CandidateDiscovery';
import CandidateProfile from './pages/CandidateProfile';
import CreateCandidateProfile from './pages/CreateCandidateProfile';
import CreateRecruiterProfile from './pages/CreateRecruiterProfile';
import RecruiterDashboard from './pages/RecruiterDashboard';
import { LoginCandidateProfile } from './pages/LoginCandidateProfile';
import { LoginRecruiterProfile } from './pages/LoginRecruiterProfile';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Landing />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/candidates"
          element={
            <Layout>
              <CandidateDiscovery />
            </Layout>
          }
        />
        <Route
          path="/candidate/:id"
          element={
            <Layout>
              <CandidateProfile />
            </Layout>
          }
        />
        <Route
          path="/create-candidate-profile"
          element={
            <Layout>
              <CreateCandidateProfile />
            </Layout>
          }
        />
        <Route
          path="/login-candidate-profile"
          element={
            <Layout>
              <LoginCandidateProfile />
            </Layout>
          }
        />
        <Route
          path="/create-recruiter-profile"
          element={
            <Layout>
              <CreateRecruiterProfile />
            </Layout>
          }
        />
        <Route
          path="/login-recruiter-profile"
          element={
            <Layout>
              <LoginRecruiterProfile />
            </Layout>
          }
        />
        <Route
          path="/recruiter/dashboard"
          element={
            <Layout>
              <RecruiterDashboard />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

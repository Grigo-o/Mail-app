import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { RegisterForm } from "./components/register";
import { LoginForm } from "./components/login";
import { Inbox } from "./components/inbox";
import { ComposeForm } from "./components/compose";
import { NotFound } from "./components/notfound";
import { Archived } from "./components/archived";
import { FullInbox } from "./components/allinbox";

function App() {
  const [replyData, setReplyData] = useState(null);
  const navigate = useNavigate();

  const handleReply = (emailData) => {
    setReplyData(emailData);
    navigate("/compose");
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">📫 Mail</h1>
        <div className="pages">
          <button className="text-nav">
            <NavLink
              to="/inbox"
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              Inbox
            </NavLink>
          </button>
          <button className="svg-nav">
            <NavLink
              to="/inbox"
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              <img src="/src/assets/svgs/inbox.svg" alt="Inbox" />
            </NavLink>
          </button>
          <button className="text-nav">
            <NavLink
              to="/sent"
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              Sent
            </NavLink>
          </button>
          <button className="svg-nav">
            <NavLink
              to="/sent"
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              <img src="/src/assets/svgs/sent.svg" alt="Sent" />
            </NavLink>
          </button>
          <button className="text-nav">
            <NavLink
              to="/archived"
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              Archived
            </NavLink>
          </button>
          <button className="svg-nav">
            <NavLink
              to="/archived"
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              <img src="/src/assets/svgs/archived.svg" alt="Archived" />
            </NavLink>
          </button>
          <button className="text-nav">
            <NavLink
              to="/compose"
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              Compose
            </NavLink>
          </button>
          <button className="svg-nav">
            <NavLink
              to="/compose"
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              <img src="/src/assets/svgs/compose.svg" alt="Compose" />
            </NavLink>
          </button>
        </div>
        <div className="auth">
          <button className="text-nav">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              Login
            </NavLink>
          </button>
          <button className="svg-nav">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              <img src="/src/assets/svgs/login.svg" alt="Login" />
            </NavLink>
          </button>
          <button className="text-nav">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              Register
            </NavLink>
          </button>
          <button className="svg-nav">
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              <img src="/src/assets/svgs/register.svg" alt="Register" />
            </NavLink>
          </button>
        </div>
      </div>
      <span className="hr"></span>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/inbox" element={<Inbox onReply={handleReply} />} />
        <Route
          path="/compose"
          element={<ComposeForm replyData={replyData} />}
        />
        <Route path="/archived" element={<Archived />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, []);

  return (
    <Router>
      {loading ? <div className="loading">Loading...</div> : <App />}
    </Router>
  );
}

export default AppWrapper;

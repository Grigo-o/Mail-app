import { useState } from "react";
import "./App.css";
import { RegisterForm } from "./components/register";
import { LoginForm } from "./components/login";
import { Inbox } from "./components/inbox";
import { ComposeForm } from "./components/compose";
import { NotFound } from "./components/notfound";

function App() {
  const [currentPage, setCurrentPage] = useState("inbox");

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const pageComponents = {
    register: <RegisterForm />,
    login: <LoginForm />,
    inbox: <Inbox />,
    compose: <ComposeForm />,
  };

  const pageContent = pageComponents[currentPage] || <NotFound />;

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">📫 Mail</h1>
        <div className="pages">
          <button
            className={currentPage === "inbox" ? "active" : ""}
            onClick={() => handleNavigation("inbox")}
          >
            Inbox
          </button>
          <button
            className={currentPage === "sent" ? "active" : ""}
            onClick={() => handleNavigation("sent")}
          >
            Sent
          </button>
          <button
            className={currentPage === "archived" ? "active" : ""}
            onClick={() => handleNavigation("archived")}
          >
            Archived
          </button>
          <button
            className={currentPage === "compose" ? "active" : ""}
            onClick={() => handleNavigation("compose")}
          >
            Compose
          </button>
        </div>
        <div className="auth">
          <button
            className={currentPage === "login" ? "active" : ""}
            onClick={() => handleNavigation("login")}
          >
            Login
          </button>
          <button
            className={currentPage === "register" ? "active" : ""}
            onClick={() => handleNavigation("register")}
          >
            Register
          </button>
        </div>
      </div>
      <span className="hr"></span>
      {pageContent}
    </div>
  );
}

export default App;

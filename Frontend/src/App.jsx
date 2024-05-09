import { useState } from "react";
import { RegisterForm } from "./components/register";
import { LoginForm } from "./components/login";
import { Inbox } from "./components/inbox";
import { ComposeForm } from "./components/compose";
import { NotFound } from "./components/notfound";
import { Archived } from "./components/archived";
import { FullInbox } from "./components/allinbox";

function App() {
	const [currentPage, setCurrentPage] = useState("inbox");
	const [loading, setLoading] = useState(true);
	const [replyData, setReplyData] = useState(null);

	const handleNavigation = (page) => {
		setCurrentPage(page);
	};

	const handleReply = (emailData) => {
		setReplyData(emailData);
		setCurrentPage("compose");
	};

	const pageComponents = {
		register: <RegisterForm />,
		login: <LoginForm />,
		inbox: <Inbox onReply={handleReply} />,
		compose: <ComposeForm replyData={replyData} />,
		archived: <Archived setLoading={setLoading} />,
	};

	const pageContent = pageComponents[currentPage] || <NotFound />;

	setTimeout(() => {
		setLoading(false);
	}, []);

	return (
		<div className="container">
			<div className="header">
				<h1 className="title">📫 Mail</h1>
				<div className="pages">
					<button
						className={currentPage === "inbox" ? "active text-nav" : "text-nav"}
						onClick={() => handleNavigation("inbox")}>
						Inbox
					</button>
					<button
						className={currentPage === "inbox" ? "active svg-nav" : "svg-nav"}
						onClick={() => handleNavigation("inbox")}>
						<img src="/src/assets/svgs/inbox.svg" />
					</button>
					<button
						className={currentPage === "sent" ? "active text-nav" : "text-nav"}
						onClick={() => handleNavigation("sent")}>
						Sent
					</button>
					<button
						className={currentPage === "sent" ? "active svg-nav" : "svg-nav"}
						onClick={() => handleNavigation("sent")}>
						<img src="/src/assets/svgs/sent.svg" />
					</button>
					<button
						className={
							currentPage === "archived" ? "active text-nav" : "text-nav"
						}
						onClick={() => handleNavigation("archived")}>
						Archived
					</button>
					<button
						className={
							currentPage === "archived" ? "active svg-nav" : "svg-nav"
						}
						onClick={() => handleNavigation("archived")}>
						<img src="/src/assets/svgs/archived.svg" />
					</button>
					<button
						className={
							currentPage === "compose" ? "active text-nav" : "text-nav"
						}
						onClick={() => handleNavigation("compose")}>
						Compose
					</button>
					<button
						className={currentPage === "compose" ? "active svg-nav" : "svg-nav"}
						onClick={() => handleNavigation("compose")}>
						<img src="/src/assets/svgs/compose.svg" />
					</button>
				</div>
				<div className="auth">
					<button
						className={currentPage === "login" ? "active text-nav" : "text-nav"}
						onClick={() => handleNavigation("login")}>
						Login
					</button>
					<button
						className={currentPage === "login" ? "active svg-nav" : "svg-nav"}
						onClick={() => handleNavigation("login")}>
						<img src="/src/assets/svgs/login.svg" />
					</button>
					<button
						className={
							currentPage === "register" ? "active text-nav" : "text-nav"
						}
						onClick={() => handleNavigation("register")}>
						Register
					</button>
					<button
						className={
							currentPage === "register" ? "active svg-nav" : "svg-nav"
						}
						onClick={() => handleNavigation("register")}>
						<img src="/src/assets/svgs/register.svg" />
					</button>
				</div>
			</div>
			<span className="hr"></span>
			{loading ? <div className="loading">Loading...</div> : <>{pageContent}</>}
		</div>
	);
}

export default App;

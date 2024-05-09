export function Inbox({ onReply }) {
	const emailData = {
		from: "sabas@gmail.com",
		to: "nikas@gmail.com",
		date: "Wed, March 27 at 18:50",
		message: "This is a test email.",
	};

	const handleReplyClick = () => {
		onReply(emailData);
	};

	return (
		<>
			<div className="inbox-area">
				<h2>Hello World!</h2>
				<span className="inbox-span">inbox</span>
				<p>
					<b>From:</b> {emailData.from}
				</p>
				<p>
					<b>To:</b> {emailData.to}
				</p>
				<p className="date">{emailData.date}</p>
			</div>
			<hr></hr>
			<p>{emailData.message}</p>
			<div className="inbox-bottom">
				<button onClick={handleReplyClick}>Reply</button>
				<button>Archive</button>
				<button className="delete-button">Delete</button>
			</div>
		</>
	);
}

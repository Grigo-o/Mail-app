import "../App.css";

export function Archived() {
	return (
		<>
			<div className="inbox-area">
				<h2>Hello World!</h2>
				<span className="inbox-span">archived</span>
				<p>
					<b>From:</b> sabas@gmail.com
				</p>
				<p>
					<b>To:</b> nikas@gmail.com
				</p>
				<p className="date">Wed, March 27 at 18:50</p>
			</div>
			<hr></hr>
			<p>This is a test email.</p>
			<div className="inbox-bottom">
				<button>Reply</button>
				<button>Unarchive</button>
				<button className="delete-button">Delete</button>
			</div>
		</>
	);
}

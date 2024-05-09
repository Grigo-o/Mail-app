export function FullInbox() {
	return (
		<div className="all-inbox">
			<div className="single-inbox">
				<b>demo@email.com</b>
				<p>Re: Hello World</p>
				<div className="last-area">
					<p>Sat, Apr 27, 22:05</p>
					<button className="small-delete">
						<img src="src/components/trash.png" />
					</button>
				</div>
			</div>
			<hr></hr>
		</div>
	);
}

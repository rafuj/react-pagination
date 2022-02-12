import React, { useEffect, useState } from "react";
import Follower from "./Follower";
import { useFetch } from "./useFetch";
function App() {
	const { loading, data } = useFetch();
	const [page, setPage] = useState(0);
	const [followers, setFollowers] = useState([]);

	useEffect(() => {
		if (loading) return;
		setFollowers(data[page]);
	}, [data, loading, page]);

	const handlePage = (i) => {
		setPage(i);
	};
	const prevPage = () => {
		setPage((oldPage) => {
			let prevPage = oldPage - 1;
			if (prevPage < 0) {
				prevPage = data.length - 1;
			}
			return prevPage;
		});
	};
	const nextPage = () => {
		setPage((oldPage) => {
			let nextPage = oldPage + 1;
			if (nextPage > data.length - 1) {
				nextPage = 0;
			}
			return nextPage;
		});
	};
	return (
		<main>
			<div className="section-title">
				<h1>{loading ? "Loading..." : "pagination"}</h1>
				<div className="underline"></div>
				<section className="followers">
					<div className="container">
						{followers.map((follower) => (
							<Follower key={follower.id} {...follower} />
						))}
					</div>
					{!loading && (
						<div className="btn-container">
							<button className="prev-btn" onClick={prevPage}>
								prev
							</button>
							{data.map((item, i) => {
								return (
									<button
										key={i}
										className={`page-btn ${
											i === page ? "active-btn" : null
										}`}
										onClick={() => handlePage(i)}
									>
										{i + 1}
									</button>
								);
							})}
							<button className="next-btn" onClick={nextPage}>
								next
							</button>
						</div>
					)}
				</section>
			</div>
		</main>
	);
}

export default App;

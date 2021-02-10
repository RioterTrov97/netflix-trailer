import React from 'react';
import Banner from '../../Banner';
import './HomeScreen.css';
import Nav from '../../Nav';
import requests from '../../Requests';
import Row from '../../Row';

function HomeScreen() {
	return (
		<div className="homeScreen">
			<Nav />
			<Banner />
			<Row
				title="NETFLIX ORIGINALS"
				type="tv"
				fetchUrl={requests.fetchNetflixOriginals}
				isLargeRow
			/>
			<Row
				title="Trending Now"
				type="movie"
				fetchUrl={requests.fetchTrending}
			/>
			<Row
				title="Animation"
				type="movie"
				fetchUrl={requests.fetchAnimation}
			/>
			<Row
				title="Science Fiction"
				type="movie"
				fetchUrl={requests.fetchScifi}
			/>
			<Row
				title="Reality Shows"
				type="tv"
				fetchUrl={requests.fetchReality}
			/>
			<Row title="Dramas" type="tv" fetchUrl={requests.fetchDrama} />
			<Row
				title="Top Rated"
				type="movie"
				fetchUrl={requests.fetchTopRated}
			/>
			<Row
				title="Action Movies"
				type="movie"
				fetchUrl={requests.fetchActionMovies}
			/>
			<Row
				title="Comedy Movies"
				type="movie"
				fetchUrl={requests.fetchComedyMovies}
			/>
			<Row
				title="Horror Movies"
				type="movie"
				fetchUrl={requests.fetchHorrorMovies}
			/>
			<Row
				title="Documentaries"
				type="movie"
				fetchUrl={requests.fetchDocumentaries}
			/>
		</div>
	);
}

export default HomeScreen;

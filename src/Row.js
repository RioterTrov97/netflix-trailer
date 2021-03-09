import axios from './axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Row.css';
import Grow from '@material-ui/core/Grow';
import ModalVideo from 'react-modal-video';

function Row({ title, type, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [videoId, setVideoId] = useState([]);
	const [playing, setPlaying] = useState(false);

	const baseUrl = 'https://image.tmdb.org/t/p/original/';

	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}

		fetchData();
	}, [fetchUrl]);

	const API_KEY = 'c7eb936e1918da481517817655a9e9db';

	const trailer = async (id) => {
		setPlaying(false);
		async function playTrailer(id) {
			const requested = await axios.get(
				`/${type}/${id}?api_key=${API_KEY}&append_to_response=videos`
			);
			setVideoId(requested.data.videos.results[0]);
			return requested;
		}
		playTrailer(id);
	};

	useEffect(() => {
		if (videoId && videoId.site && videoId.site === 'YouTube') {
			setPlaying(true);
		}
	}, [videoId]);

	const getReleaseYear = (date) => {
		let year = new Date(date);
		return year.getFullYear();
	};

	const closeVideo = () => {
		setPlaying(false);
		setVideoId([]);
	};

	return (
		<div className="row">
			{videoId && playing && videoId.site === 'YouTube' && (
				<Grow in={playing} mountOnEnter unmountOnExit>
					<ModalVideo
						channel="youtube"
						isOpen="true"
						videoId={videoId.key}
						onClose={() => closeVideo()}
					/>
				</Grow>
			)}
			<h2>{title}</h2>
			<div className="row__posters">
				{movies.map(
					(movie) =>
						((isLargeRow && movie.poster_path) ||
							(!isLargeRow && movie.backdrop_path)) && (
							<div className="list__item" key={movie.id}>
								<img
									loading="lazy"
									key={movie.id}
									src={`${baseUrl}${movie.poster_path}`}
									alt={movie.name}
								/>
								<div className="list__itemInfo">
									<h5 className="list__itemTitle">
										{movie.name ||
											movie.title ||
											movie.original_title}
										<span className="list__itemYear">
											(
											{getReleaseYear(
												movie.release_date ||
													movie.first_air_date
											)}
											)
										</span>
									</h5>
									<button
										className="list__itemButton"
										onClick={() => trailer(movie.id)}>
										Play trailer
									</button>
								</div>
							</div>
						)
				)}
			</div>
		</div>
	);
}

export default Row;

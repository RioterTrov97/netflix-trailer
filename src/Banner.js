import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './Requests';
import './Banner.css';
import { Grow } from '@material-ui/core';
import ModalVideo from 'react-modal-video';

function Banner() {
	const [movie, setMovie] = useState([]);
	const [bannerFound, setBannerFound] = useState(false);
	const [videoId, setVideoId] = useState([]);
	const [playing, setPlaying] = useState(false);

	useEffect(() => {
		//console.log('useEffect 1 running');
		async function fetchData() {
			const request = await axios.get(requests.fetchNetflixOriginals);
			setMovie(
				request.data.results[
					Math.floor(Math.random() * request.data.results.length - 1)
				]
			);
			setBannerFound(true);
			return request;
		}

		fetchData();
	}, [bannerFound]);

	useEffect(() => {
		//console.log('useEffect 2 running');
		if (!movie) {
			// console.log('useEffect 2 Changing setBannerFound');
			setBannerFound(false);
		}
	}, [movie]);

	const API_KEY = 'c7eb936e1918da481517817655a9e9db';

	const trailer = async (id) => {
		setPlaying(false);
		async function playTrailer(id) {
			const requested = await axios.get(
				`/tv/${id}?api_key=${API_KEY}&append_to_response=videos`
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

	const truncate = (string, n) => {
		return string?.length > n ? string.substr(0, n - 1) + '...' : string;
	};

	return (
		<div>
			{videoId && playing && videoId.site === 'YouTube' && (
				<Grow in={playing} mountOnEnter unmountOnExit>
					<ModalVideo
						channel="youtube"
						isOpen="true"
						videoId={videoId.key}
						onClose={() => setPlaying(false)}
					/>
				</Grow>
			)}
			{movie && movie.backdrop_path && (
				<header
					className="banner"
					style={{
						backgroundSize: 'cover',
						backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
						backgroundPosition: 'top',
						backgroundRepeat: 'no-repeat',
					}}>
					<div className="banner__contents">
						<h1 className="banner__title">
							{movie?.title ||
								movie?.name ||
								movie?.original_name}
						</h1>
						<div className="banner__buttons">
							<button
								className="banner__button"
								onClick={() => trailer(movie.id)}>
								Play trailer
							</button>
							<button className="banner__button">My List</button>
						</div>
						<h1 className="banner__description">
							{truncate(`${movie?.overview}`, 150)}
						</h1>
					</div>
					<div className="banner--fadeBottom" />
				</header>
			)}
		</div>
	);
}

export default Banner;

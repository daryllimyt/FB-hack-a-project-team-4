import React from 'react';
import "./Main.css";
import { ListOfMovies } from './ListOfMovies';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import SearchBar from './components/SearchBar';
import { Genre } from './Genre';
import Modal from 'react-modal';
import MyMovies from './MyMovies';
import { MoviePage } from './MoviePage';

export const server_base = "http://localhost:8080"
export let current_uid = null
export let set_movie_as_going;
export let set_movie_as_not_going;
export let login;
export let create_movie;
export let open_movie;

export class Main extends React.Component {
	constructor () {
		super();
		this.state = {
			loginFormOpen: false,
			movieFormOpen: false,
			all_movies: [],
			featured_movies: [],
			most_recent: [],
			genre_filter: null,
			genres: [],
			filtered_movies: null,
			showing_movie_page: null
		};

		this.request_all_movies();

		set_movie_as_going = async (movie_id) => {
			await fetch(`${server_base}/going?movie_id=${encodeURIComponent(movie_id.toString())}&user_id=${encodeURIComponent(current_uid)}`, {method: "PUT"})
			this.request_all_movies()
		}

		set_movie_as_not_going = async (movie_id) => {
			await fetch(`${server_base}/going?movie_id=${encodeURIComponent(movie_id.toString())}&user_id=${encodeURIComponent(current_uid)}`, {method: "DELETE"})
			this.request_all_movies()
		}

		login = async (user_name, password) => {
			let h = new Headers();
			h.set("Content-Type", "application/json")
			let res = await fetch(`${server_base}/login`, { method: "POST", headers: h, body: JSON.stringify({user_id: user_name, password}) })
			if (res.status === 200) {
				current_uid = await res.text()
				this.forceUpdate()
				return
			} else {
				throw new Error(await res.text())
			}
		}

		create_movie = async (movie) => {
			let h = new Headers();
			h.set("Content-Type", "application/json")
			await fetch(`${server_base}/create_movie`, {method: "POST", headers: h, body: JSON.stringify(movie)})
			this.request_all_movies()
		}

		open_movie = this.showMoviePage.bind(this)
	}

	async request_all_movies() {
		let json = await (await fetch(`${server_base}/all_movies`)).json();
		this.got_movies(json);
	}

	got_movies(movies) {
		this.state.all_movies = movies.map(x => Object.assign(x, {
			date: new Date(x.date)
		}));
		this.state.featured_movies = this.state.all_movies.slice().sort((a, b) => Math.sign(b.attendee.length - a.attendee.length))
		this.state.most_recent = this.state.all_movies.slice().sort((a, b) => Math.sign(new Date(a.date) - new Date(b.date)));
		this.state.genres = this.state.all_movies.map(x => x.genre).reduce((xs, x) => {
			if (xs.includes(x)) {
				return xs;
			} else {
				xs.push(x);
				return xs;
			}
		}, [])
		this.forceUpdate()
	}
	toggleOpenMovieForm = () => {
		this.setState({
			movieFormOpen: !this.state.movieFormOpen
		})
	}
	toggleOpenLoginForm = () => {
		this.setState({
			loginFormOpen: !this.state.loginFormOpen
		})
	}
	closeModal = () => {
		this.setState({
			movieFormOpen: false
		})
		this.request_all_movies()
	}
	closeLoginModal = () => {
		this.setState({
			loginFormOpen: false
		})
		this.request_all_movies()
	}
	logout = () => {
		current_uid = null;
		this.forceUpdate();
	}

	render () {
		return (<div className="main" >
			<div className="topbar">
				<div className="left">
					{this.maybeRenderBackButton()}
				</div>
				<div className="appname">Cinemate</div>
				<div className="right">
					{current_uid === null ? (
						<div className="button" onClick={this.toggleOpenLoginForm}>Login</div>
					) : [
						`Logged in as ${current_uid}`,
						<div>&nbsp;</div>,
						<div className="button-red" onClick={this.logout}>Logout</div>
					]}
					&nbsp;
					<Modal isOpen={this.state.loginFormOpen} onRequestClose={this.closeLoginModal} style={{
						content: {
							top: "50%",
							left: "50%",
							width: "500px",
							bottom: "auto",
							marginRight: "-50%",
							transform: "translate(-50%,-50%)"
						}
					}}>
						<LoginForm closeModal={this.closeLoginModal}/>
					</Modal>
					&nbsp;
					{current_uid !== null ? (
						<div className="button" onClick={this.toggleOpenMovieForm}>Create new movie</div>
					) : null}
					<Modal isOpen={this.state.movieFormOpen} onRequestClose={this.closeModal}  style={{
						content: {
							top: "50%",
							left: "50%",
							width: "500px",
							height: "500px",
							marginRight: "-50%",
							transform: "translate(-50%,-50%)"
						}
					}}>
						<MovieForm closeModal={this.closeModal}/>
					</Modal>
				</div>
			</div>

			<div className="main-contain">
				{this.state.showing_movie_page === null ? (
					<SearchBar updateMovies={this.filterSearchMovies} data={this.state.all_movies} />
				) : null}
				{this.renderMovieList()}
			</div>
		</div>)
	}

	filterSearchMovies = (filtered) => {
		this.setState({
			filtered_movies: filtered
		});
	}

	renderMovieList() {
		if (this.state.showing_movie_page === null) {
			if (this.state.genre_filter === null && this.state.filtered_movies === null) {
				return [
					current_uid !== null ? <MyMovies all_movies={this.state.all_movies}/> : null,
					<h2>Featured</h2>,
					<ListOfMovies data={this.state.featured_movies} />,
					<h2>Genre</h2>,
					<div className="horizontal-list">
						{this.state.genres.map(x => <Genre name={x} onClick={this.filterGenre.bind(this, x)} />)}
					</div>,
					<h2>Most recent</h2>,
					<ListOfMovies data={this.state.most_recent} />,
				]
			} else if (this.state.filtered_movies !== null) {
				return [
					<h2>Search results:</h2>,
					<ListOfMovies data={this.state.filtered_movies} />,
				]
			} else {
				return [
					<h2>{this.state.genre_filter} movies:</h2>,
					<ListOfMovies data={this.state.all_movies.filter(x => x.genre === this.state.genre_filter)} />,
				]
			}
		} else {
			let movie = this.state.all_movies.find(x => x.movie_id === this.state.showing_movie_page);
			return [
				<MoviePage movie={movie} />
			]
		}
	}

	maybeRenderBackButton() {
		if (this.state.showing_movie_page !== null) {
			return (
				<div className="button back-btn" onClick={this.showMoviePage.bind(this, null)}>Back</div>
			)
		}
		if (this.state.genre_filter !== null) {
			return (
				<div className="button back-btn" onClick={this.filterGenre.bind(this, null)}>Back</div>
			)
		}
		return null;
	}

	showMoviePage(movie_id) {
		this.setState({
			showing_movie_page: movie_id
		})
	}

	filterGenre(name, evt) {
		this.setState({
			genre_filter: name
		})
	}
}

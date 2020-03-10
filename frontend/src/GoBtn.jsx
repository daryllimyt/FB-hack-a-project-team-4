import React from "react"

import { current_uid, set_movie_as_going, set_movie_as_not_going } from "./Main"

export class GoBtn extends React.Component {
	render() {
		return (
			current_uid !== null ? (this.props.movie.attendee.includes(current_uid)) ? (
				<div style={{textAlign: "center"}}>Going!<br /><div className="button whitebtn" onClick={this.handleUngo.bind(this, this.props.movie.movie_id)}>Cancel</div></div>
			) : (
				<div className="button" onClick={this.handleGo.bind(this, this.props.movie.movie_id)}>Go!</div>
			) : (
				<div>Login?</div>
			)
		)
	}

	handleGo(movie_id, e) {
		e.stopPropagation()
		set_movie_as_going(movie_id)
	}

	handleUngo(movie_id, e) {
		e.stopPropagation()
		set_movie_as_not_going(movie_id)
	}
}

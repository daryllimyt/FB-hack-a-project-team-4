import React from "react";
import "./MovieItem.css";

import { open_movie } from "./Main";
import { GoBtn } from "./GoBtn";

export class MovieItem extends React.Component {
	render() {
		return (
			<div className="movie" onClick={() => open_movie(this.props.data.movie_id)} style={{backgroundImage: `url(https://cataas.com/cat/says/${encodeURIComponent(this.props.data.title)})`}}>
				<div className="buttom">
					<div className="name">{this.props.data.title}</div>
					<div className="watchNumber">{this.props.data.attendee.length} going</div>
				</div>
				<div className="expansion">
					<div className="info">
						<div>{this.props.data.genre}</div>
						<div>Venue: {this.props.data.location}</div>
						<div>Date: {this.props.data.date.toDateString()}</div>
					</div>
					<div>
						<GoBtn movie={this.props.data} />
					</div>
				</div>
			</div>
		)
	}
}

import React from "react";
import { MovieItem } from './MovieItem';

export class ListOfMovies extends React.Component {
	render() {
		return (
			<div className="horizontal-list">
				{this.props.data.map(movie => {
					return (
						<MovieItem data={movie} />
					)
				})}
			</div>
		)
	}
}

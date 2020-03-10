import React from "react";
import "./MoviePage.css"
import { current_uid } from "./Main";
import { GoBtn } from "./GoBtn";
import md5 from "crypto-js/md5";

export class MoviePage extends React.Component {
	render() {
		let movie = this.props.movie;
		return (
			<div className="moviepage">
				<div className="cover" style={{backgroundImage: `url(https://cataas.com/cat/says/${encodeURIComponent(movie.title)})`}}>
					<div className="lg"></div>
				</div>
				<div class="title">
					<h2>{movie.title}</h2>
					<GoBtn movie={movie} />
				</div>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia lacinia augue. Integer lacinia lacus a venenatis consectetur. Duis at rhoncus nisi, nec finibus elit. Aenean sed lorem in massa tempus mattis a at lacus. Nam vel massa faucibus, placerat leo eget, aliquam elit. Integer sit amet blandit turpis. Cras finibus, tellus vitae luctus varius, purus ligula egestas felis, id suscipit tortor libero id mauris. Aenean sit amet tincidunt ante. Sed porta, ligula eu viverra pellentesque, dolor orci ornare ex, vel gravida massa sapien non nisi. Nullam tincidunt ornare viverra. Phasellus maximus tellus ut lectus feugiat dignissim. Maecenas hendrerit varius elementum. Nullam egestas mauris non leo egestas rhoncus. Curabitur elementum tortor vitae ipsum posuere, efficitur scelerisque turpis rhoncus.
				</p>
				<div className="info">
					{movie.attendee.length} going {movie.attendee.includes(current_uid) ? "including you" : ""}<br></br>
					{movie.attendee.length > 0 ? (
						<div className="going">
							{movie.attendee.map(a => <img src={`https://www.gravatar.com/avatar/${md5(a)}?s=200&d=identicon`} />)}
						</div>
					) : null}
					<div>{movie.genre}</div>
					<div>Venue: {movie.location}</div>
					<div>Date: {movie.date.toDateString()}</div>
				</div>
			</div>
		)
	}
}

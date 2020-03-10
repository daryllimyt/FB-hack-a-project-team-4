import React, {Component} from 'react';
import "./Main.css";
import { ListOfMovies } from './ListOfMovies';
import { Genre } from './Genre';
import { current_uid } from './Main';

class MyMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myMovies: []
    };

  }


  render() {
    return (
      <div>
          <h2>Joined Movies</h2>
          <ListOfMovies data={this.props.all_movies.filter(m => m.attendee.includes(current_uid))} />
        </div>
      )
    }
  renderHomeButton() {
		if (this.state.genre_filter !== null) {
			return (
				<div className="button-home back-btn">Home</div>
			)
		}
		return null;
  }
  

}

export default MyMovies;
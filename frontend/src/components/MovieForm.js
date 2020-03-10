import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MovieForm.css";
import { create_movie, current_uid } from '../Main';

class MovieForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      venues: 'Vue Picadilly',
      genre: "",
      datetime: '',
      submitting: false
    }
  }
  handleChange = (e) => {
    this.setState({title: e.target.value});
  }
  handleChangeGenre = (e) => {
    this.setState({genre: e.target.value});
  }
  handleCalendarChange = (datetime) => {
    this.setState({ datetime })
  }
  handleSubmit = (e) => {
    this.setState({
      submitting: true
    })
    create_movie({
			title: this.state.title,
			attendee: [current_uid],
			date: new Date(this.state.datetime).toISOString(),
			genre: this.state.genre,
			location: this.state.venues
    }).then(() => {
      this.props.closeModal()
    })
  }
  render() {
    const { title, venues, datetime, genre }  = this.state;
    if (!this.state.submitting) {
      return (
        <div className="container movie-form form-model">
          <form>
            <div className="row">
              <label>
                Movie Title:
                <br></br>
                <input type="text" value={title} onChange={this.handleChange}/>
              </label>
            </div>
            <div className="row">
              <label>
                Genre:
                <br></br>
                <input type="text" value={genre} onChange={this.handleChangeGenre}/>
              </label>
            </div>
            <div className="row">
              <label>
                Venue:&nbsp;
                <br></br>
                <select>
                  <option>
                    {venues}
                  </option>
                </select>
              </label>
            </div>
            <div className="row">
            <label>
              Screening Date:
              <div>
                  <DatePicker
                    selected={datetime}
                    onChange={this.handleCalendarChange}
                    showTimeSelect
                    dateFormat="Pp"
                  />
              </div>
            </label>
            </div>
            <div className="submit-contain">
              <div className="button" onClick={this.handleSubmit}>submit</div>
              <div className="button" onClick={this.props.closeModal}>cancel</div>
            </div>
          </form>
        </div>
      )
    } else {
      return (
        <div className="container movie-form" style={{textAlign: "center"}}>
          Submitting&hellip;
        </div>
      )
    }
  }
}

export default MovieForm

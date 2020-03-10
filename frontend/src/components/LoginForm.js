import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MovieForm.css";
import { login } from '../Main';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      error: null
    }
  }
  handleChange = (e) => {
    this.setState({ username: e.target.value });
  }
  handlePassword = (e) => {
    this.setState({ password: e.target.value })
  }
  handleSubmit = (e) => {
    this.setState({
      loading: true
    })
    login(this.state.username, this.state.password).then(() => {
      this.props.closeModal()
    }, err => {
      this.setState({
        loading: false,
        error: err.message
      })
    })
  }
  render() {
    const { username }  = this.state;
    if (this.state.loading) {
      return (
        <div className="container form-model" style={{textAlign: "center"}}>
          Loading
        </div>
      )
    }
    return (
      <div className="container form-model">
        <form>
          <div className="row">
            <label>
              Username
              <input type="text" value={username} onChange={this.handleChange}/>
            </label>
          </div>
          <div className="row">
            <label>
              Password
              <input type="password" onChange={this.handlePassword}/>
            </label>
          </div>
          <div className="submit-contain">
            <div className="button" onClick={this.handleSubmit}>submit</div>
            <div className="button" onClick={this.props.closeModal}>cancel</div>
          </div>
          {this.state.error ? (
            <div className="error">{this.state.error}</div>
          ) : null}
        </form>
      </div>
    )
  }
}

export default LoginForm

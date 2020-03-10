import React, { Component } from 'react';
import debounce from 'lodash/debounce';
class SearchBar extends Component {
  constructor(props) {
    super(props);
		this.debounced = debounce(this.setValue, 300, {trailing: true});
  }

  setValue = (value) => {
    if (value === "") {
      this.props.updateMovies(null);
      return
    }
    this.props.updateMovies(this.props.data.filter(m => m.title.toLowerCase().indexOf(value.toLowerCase()) >= 0));
  }

  render() {
    return (
      <div>
        <input type="text" className="input" placeholder="Search..." onChange={evt => this.debounced(evt.target.value)}/>
      </div>
    );
  }
}

export default SearchBar;

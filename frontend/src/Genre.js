import React from "react";
import "./Genre.css";
export class Genre extends React.Component {
	getBg = (name) => {
		var url = "";
		if (name === "Horror") {
			url = "https://static5.depositphotos.com/1001033/502/i/950/depositphotos_5029211-stock-photo-scared-man.jpg";
		} else if (name === "Comedy"){
			url = "https://cdn.mos.cms.futurecdn.net/gDSNtwRBA4AwEjGq7NNymn-970-80.jpg";
		} else if (name === "Romance"){
			url = "https://www.ftd.com/blog/content/uploads/2017/01/hero-how-to-be-romantic-720x479.jpg";
		}
		return (url);
	}
	render() {
		const name = this.props.name;
		console.log(name);
		var backgroundImage = this.getBg(name);
		console.log(backgroundImage);
		return (
			<div className="genre" style={{backgroundImage: "url(" + backgroundImage + ")"}} onClick={this.props.onClick}>
				<div className="buttom">
					<div className="name">{this.props.name}</div>
				</div>
			</div>
		)
	}
}

import React, { Component } from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "rc-slider/assets/index.css";
import "./Navbar.css"; // keep after rc-slider css

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			format: "hex"
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({ format: e.target.value });
		this.props.changeFormat(e.target.value);
	}

	render() {
		const { level, changeLevel } = this.props;
		const { format } = this.state;
		return (
			<header className="Navbar">
				<div className="logo">
					<a href="#">ColorApp</a>
				</div>
				<div className="slider-container">
					<span>Level:{level}</span>
					<div className="slider">
						<Slider
							defaultValue={level}
							min={100}
							max={900}
							step={100}
							onAfterChange={changeLevel}
						/>
					</div>
				</div>
				<div className="select-container">
					<Select value={format} onChange={this.handleChange}>
						<MenuItem value="hex">HEX</MenuItem>
						<MenuItem value="rgb">RGB</MenuItem>
						<MenuItem value="rgba">RGBA</MenuItem>
					</Select>
				</div>
			</header>
		);
	}
}

export default Navbar;

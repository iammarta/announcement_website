import React, { Component } from "react";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <div className="card mt-4 mb-4">
          <div className="card-body">
            <i
              className="fa fa-trash"
              onClick={() => this.props.delete(this.props.index)}
            />
            <div className="edit">
              <span className="custom-text">title:</span><input
                type="text"
                id="titleChange"
                maxLength="20"
                value={this.props.data.title}
                onChange={this.props.editTitle}
              />
            </div>
            <div className="edit">
            <span className="custom-text">description:</span><textarea
                type="text"
                id="descrChange"
                maxLength="550"
                rows="8"
                value={this.props.data.descr}
                onChange={this.props.editText}
              />
            </div>
            <br />
            <p>
              <b>created:</b>{" "}
              {new Date()
                .toISOString()
                .replace("-", "/")
                .split("T")[0]
                .replace("-", "/")}
            </p>
          </div>
        </div>
 
    );
  }
}

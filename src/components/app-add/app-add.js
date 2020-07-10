import React, { Component } from "react";
import Card from "../app-card";

export default class Add extends Component {
  constructor(props) {
    super(props);
    let d = JSON.parse(localStorage.getItem("data"));
    this.state = {
      title: "",
      descr: "",
      data: d || [],
      date: "",
      similar: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }
  handleChange(event) {
    switch (event.target.id) {
      case "title":
        this.setState({ title: event.target.value });
        break;
      case "descr":
        this.setState({ descr: event.target.value });
        break;
      default:
    }
  }

  handleExistingTitleChange = index => event => {
    const data = this.state.data;
    data[index].title = event.target.value;
    switch (event.target.id) {
      case "titleChange":
        this.setState({ data: data });
        localStorage.setItem("data", JSON.stringify(data));
        break;
      default:
    }
  };
  handleExistingTextChange = index => event => {
    const data = this.state.data;
    data[index].descr = event.target.value;
    switch (event.target.id) {
      case "descrChange":
        this.setState({ data: data });
        localStorage.setItem("data", JSON.stringify(data));
        break;
      default:
    }
  };
  

  handleSubmit() {
    if (this.state.title && this.state.descr) {
      let data = this.state.data;
      data.push({ title: this.state.title, descr: this.state.descr });
      this.setState({ data: data, title: "", descr: "" });
      localStorage.setItem("data", JSON.stringify(data));
    }
  }
  handleDelete(index) {
    let data = this.state.data;
    data.splice(index, 1);
    this.setState({ data });
    localStorage.setItem("data", JSON.stringify(data));
  }
  handleFilter(){
    let data = this.state.data;
    const titleNum = data.reduce(
        (acc, entry) => {
          const { title } = entry;
          if (acc[title] === undefined) acc[title] = 0;
          acc[title]++;
          return acc;
        }, {}
      );
      
      const filtered2 = data.filter(({ title }) => titleNum[title] > 1);
      this.setState({ similar: filtered2 });
      
  }
  render() {
    return (
      <>
      <div className="col-12">
          <div className="text">
            <h3>Announcements</h3>
            <p>
              Please, add the title and description of your announcement with
              the form below and click on "submit" button
            </p>
          </div>
          <input
            type="text"
            className="form-control mt-3 title"
            id="title"
            placeholder="title"
            onChange={this.handleChange}
          />
          <textarea
            className="form-control descr mt-3"
            placeholder="description"
            id="descr"
            rows="3"
            onChange={this.handleChange}
          />
          <button
            type="submit"
            className="btn btn-primary mt-3 add-btn"
            onClick={this.handleSubmit}
          >
            submit
          </button>
          <div className="text">
          <h3>List of the announcements:</h3>
          </div>
          </div>
          {
          this.state.data.map((data, index) => {
            return (
                <div className="col-lg-4">
              <Card
                data={data}
                index={index}
                key={index}
                editTitle={this.handleExistingTitleChange(index)}
                editText={this.handleExistingTextChange(index)}
                delete={this.handleDelete}
              />
              </div>
            );
          })
        }
        <br/>
        <br/>
          <button type="button" onClick={this.handleFilter} data-toggle="modal" data-target="#exampleModalLong" className="btn btn-primary btn-lg btn-block">show similar announcements(by title)</button>
          <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Similar announcements</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      {
          this.state.similar.map((data, index) => {
            return (
              <Card
                data={data}
                index={index}
                key={index}
              />
            );
          })
        }
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
      </>
    );
  }
}

import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { FormContainer } from "../util";
import "./search.css";

class SearchBox extends Component {
  constructor() {
    super();
    this.state = {
      keyword: "",
    };
  }
  submitHandler = (e) => {
    const { keyword } = this.state;
    e.preventDefault();
    if (keyword.trim()) {
      this.props.history.push(`/search/${keyword}`);
    } else {
      this.props.history.push("/");
    }
  };
  render() {
    return (
      <div className="search">
        <FormContainer>
          <Form onSubmit={this.submitHandler} >
            <Form.Group controllid="keyword">
              <Form.Control
              className="input"
                type="text"
                name="search"
                placeholder="Search products..."
                value={this.state.keyword}
                onChange={(e) => this.setState({ keyword: e.target.value })}
              ></Form.Control>
            </Form.Group>
          </Form>
        </FormContainer>
      </div>
    );
  }
}

export default withRouter(SearchBox);

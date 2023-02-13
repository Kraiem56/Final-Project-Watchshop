import React, { Component } from "react";
import { Alert } from "react-bootstrap";


export default class Message extends Component {
  render() {
    return (
      <div>
        <br />
        <Alert variant='info' style={{width:"700px"}}>
          {this.props.message ? this.props.message : "Not Found !"}
        </Alert>
        <br /><br />
      </div>
    );
  }
}

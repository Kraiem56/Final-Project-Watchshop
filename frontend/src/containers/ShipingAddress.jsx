import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { saveShippingAddress } from "../component/Redux/actions/cartActions";
import { connect } from "react-redux";
import { FormContainer } from "../util";
import CheckoutSteps from "./CheckoutSteps";

class ShipingAddress extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    };
  }

  submitHandler = (e) => {
    const { address, city, postalCode, country } = this.state;
    e.preventDefault();
    this.props.dispatch(
      saveShippingAddress({ address, city, postalCode, country })
    );
    this.props.history.push("/payment");
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    const shippingAddress = this.props.getcartData.shippingAddress;
    if (shippingAddress) {
      this.setState({
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
      });
    } else {
      return;
    }
  }

  render() {
    return (
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h2>Shipping Address</h2>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter address"
              value={this.state.address}
              onChange={(e) => this.setState({ address: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter city"
              value={this.state.city}
              onChange={(e) => this.setState({ city: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter pincode"
              value={this.state.postalCode}
              onChange={(e) => this.setState({ postalCode: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter country"
              value={this.state.country}
              onChange={(e) => this.setState({ country: e.target.value })}
            />
          </Form.Group>
          <Button
            variant="primary"
            disabled={
              !this.state.address ||
              !this.state.city ||
              !this.state.postalCode ||
              !this.state.country
            }
            type="submit"
            onClick={this.submitHandler}
          >
            Continue
          </Button>
        </Form>
      </FormContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getLoginInfoData: state.userLogin,
    getcartData: state.cart,
  };
};

export default connect(mapStateToProps)(ShipingAddress);

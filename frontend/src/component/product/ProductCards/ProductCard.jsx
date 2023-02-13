import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./ProductCard.css"
import Categories from "./Categories";
import { Loader, Message } from "../../../util";
import { listProducts } from "../../Redux/actions/productActions";




class ProductCard extends Component {
 
  componentDidMount() {
    window.scrollTo(0, 0);

    const { keyword } = this.props.match.params;
    const pageNumber = this.props.match.params.pageNumber || 1;
    this.props.dispatch(listProducts(keyword, pageNumber));
  }

  render() {
    const {
      loading,
      error,
      products,
    } = this.props.getProductListData;
    return (
        <div >
          {loading ? (
            <Loader />
          ) : error ? (
            <Message />
          ) : (
            <Categories products={products}/>
          )}
          
        </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    getProductListData: state.productList,
  };
};

export default withRouter(connect(mapStateToProps)(ProductCard));

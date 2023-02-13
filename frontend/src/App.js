import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Footer, Header, Login, OrderListScreen, OrderScreen, PlaceOrder, ProductCard, ProductDetails, ProductEditScreen, ProductListScreen, ProfileScreen, Register, UserEditScreen, UserListScreen } from "./component";
import { Cart, ShipingAddress,PaymentAddress } from "./containers";
import SearchBox from './common/SearchBox';
import Home from "./mainPage/Home";
import "./App.css"


export default class App extends Component {

render() {
    
    return (
      <Router>
        <Route
          render={({ history, match }) => (<Header history={history} match={match} />)}/>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/shipping' component={ShipingAddress} />
          <Route path='/payment' component={PaymentAddress} />
          <Route path='/placeorder' component={PlaceOrder} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/productslist' component={ProductListScreen} />
          <Route path='/orderslist' component={OrderListScreen} />
          <Route path='/products' component={ProductCard} exact />
          <Route path='/search/:keyword' component={ProductCard} exact />
          <Route path='/page/:pageNumber' component={Home} exact />
          <Route path='/search' component={SearchBox} exact/>
          <Route path='/product/:id' component={ProductDetails} exact />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} exact />
          <Route path='/admin/product/:id/edit'component={ProductEditScreen}/>
          <Route path='/cart/:id?' component={Cart} />
          <Footer />
      </Router>
    );
  }
}

import React, { Component } from "react";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Redux/actions/userActions";
import "./headers.css";

class Header extends Component {
  logout = () => {
    this.props.dispatch(logout());
    this.props.history.push("/login");
  };

  state = {
    show: false,
  };
  render() {
    const { userInfo } = this.props.getLoginInfoData;
    return (
      <header>
        <nav>
          <Link to="/">
            <div>
              <img
                className="logo"
                src="https://thumbs.dreamstime.com/b/clock-logo-design-vector-graphics-modern-gold-color-scheme-suitable-business-watches-wall-clocks-accessories-227392110.jpg"
                alt="Logo"
              />
            </div>
          </Link>
          {/* <div className="serch">
            <Route
              render={({ history, match }) => (
                <SearchBox history={history} match={match} />
              )}
            />
          </div> */}
          <div className="iconss">
            <Link to="/search">
            <SearchTwoToneIcon id="SearchIcon"></SearchTwoToneIcon>
            </Link>
            <Link to="/cart">
              <span
                style={{ color: "white", display: "flex", marginTop: "-3px" }}
              >
                <ShoppingCartIcon id="ShoppingCartIcon"></ShoppingCartIcon>
                
              </span>
            </Link>
            {userInfo ? (
              <div>
                <Link to="/profile">
                  <span style={{ color: "white", marginRight: "10px" }}>
                    {" "}
                    Dashboard
                  </span>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <div
                    style={{
                      color: "white",
                      marginRight: "20px",
                    }}
                  >
                    <AccountBoxIcon id="AccountBoxIcon"></AccountBoxIcon>
                    
                  </div>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getLoginInfoData: state.userLogin,
  };
};

export default connect(mapStateToProps)(Header);

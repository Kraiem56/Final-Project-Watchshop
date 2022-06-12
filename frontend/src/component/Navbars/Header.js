import React, { Component, useState } from "react";
import {Navbar,Nav,NavDropdown,} from "react-bootstrap";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { connect} from "react-redux";
import { Link,Route } from "react-router-dom";
import { logout } from "../Redux/actions/userActions";
import "./headers.css"
import SearchBox from "../common/SearchBox";


class Header extends Component {
  
  logout = () => {
    this.props.dispatch(logout());
    this.props.history.push("/login");
  };
  
  render() {
    const { userInfo } = this.props.getLoginInfoData;
    return (
      <header >
        <Navbar style={{ height:"60px",padding:"8px 0 8px 0"}} className="Navv">
          <Navbar.Brand href='/'>
            <span style={{color:"white", marginLeft:"120px"}}>WATCHES</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
<div style={{marginLeft:"25%"}}>
<Route render={({ history, match }) => (<SearchBox history={history} match={match}/>)}/> 
</div>
          <Navbar.Collapse id='basic-navbar-nav' style={{ marginRight:"100px"}}>
            <Nav className='ml-auto'>
                <Nav.Link>
                <Link to='/cart'>
                <span style={{color:"white" ,width:"25px",height:"25px"}}>
                <ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon>
                </span>
                </Link>
                </Nav.Link>
               
              {userInfo ? (
                <NavDropdown title={<span style={{color:"white"}}>
                  {userInfo.name } <ArrowDropDownIcon></ArrowDropDownIcon>
                  </span>} id='basic-nav-dropdown' style={{color:"white"}}>
                  <NavDropdown.Item>
                    <Link to='/profile'>
                  <span style={{color:"black"}}>Profile</span>
                    
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={this.logout}>
                    
                    <span style={{color:"black"}}>Logout</span>

                  </NavDropdown.Item>
                  {/* <NavDropdown.Divider /> */}
                </NavDropdown>
              ) : (
                <Nav.Link>
                  <Link to='/login'>
                    <i className='fas fa-user'></i> 
            <span style={{color:"white"}}>
            <AccountBoxIcon></AccountBoxIcon>
            </span>
                  </Link>
                </Nav.Link>
                
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={<span style={{color:"white"}}>Dashboard<ArrowDropDownIcon></ArrowDropDownIcon></span>} id='adminmenu'>
                  <NavDropdown.Item>
                    <Link to='/admin/userlist'>
                  <span style={{color:"black"}}>Users</span>
                    
                    </Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to='/admin/productslist'>
            <span style={{color:"black"}}>Products</span>
                    
                    </Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to='/orderslist'>
            <span style={{color:"black"}}>Orders</span>
                    
                    </Link>
                  </NavDropdown.Item>

                  {/* <NavDropdown.Divider /> */}
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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

import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../util/Loader";
import { ORDER_DELETE_RESET } from "../Redux/constants/orderConstants";
import { deleteOrder, listOrders } from "../Redux/actions/orderActions";

export default function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({ type: ORDER_DELETE_RESET });

    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/");
      dispatch(listOrders())
    }
  }, [dispatch, userInfo, history]);
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
    if (window.confirm("Are you sure?")) {
    }
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  return (
    <Container className="mt-5 p-5">
      <h2>Orders</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders === undefined ? (
              <tbody>
                <Button variant="light" onClick={window.location.reload()}>
                  <Loader />
                </Button>
              </tbody>
            ) : (
              <>
                {orders.map((order) => {
                  return (
                    <tr key={order._id}>
                      <th scope="row">{order._id}</th>
                      <td>{order.user && order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          <span style={{ color: "green" }}>
                            {order.paidAt.substring(0, 10)}
                          </span>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>

                      <td>
                        {order.isDelivered ? (
                          <span style={{ color: "green" }}>
                            {order.deliveredAt.substring(0, 10)}
                          </span>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>

                      <td>
                        <th>
                          <LinkContainer to={`order/${order._id}`}>
                            <Button variant="primary" className="btn-sm" style={{width:"50px"}}>
                              <span style={{ color: "rgb(243, 185, 9)" }}>
                                view
                              </span>
                            </Button>
                          </LinkContainer>
                        </th>
                        <th>
                          <Button style={{width:"60px",height:"30px"}}
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteOrderHandler(order._id)}
                          >
                            <span style={{ color: "white" }}>X</span>
                          </Button>
                        </th>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../Redux/actions/userActions";
import { Loader } from "../../util";


export default function UserListScreen({ history }) {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const userDelete = useSelector((state) => state.userDeleteReducer);
  // const { success: successDelete } = userDelete;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/");
    }
  }, [dispatch,userInfo, history]);

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  return (
    <Container className='mt-5 p-5'>
      <h2>Users</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.users === undefined ? (
              "Something went wrong"
            ) : (
              <>
                {users.users.map((user) => {
                  return (
                    <tr>
                      <th scope='row'>{user._id}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isAdmin ? (
                          <i
                            className='fas fa-check'
                            style={{ color: "green" }}></i>
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: "red" }}></i>
                        )}
                      </td>

                      <td>
                        <LinkContainer to={`user/${user._id}/edit`}>
                          <Button variant='info' style={{width:"40px",height:"30px"}}>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          onClick={() => deleteUserHandler(user._id)}
                          style={{width:"40px",height:"40px"}}
                          variant='danger'
                          >
                          <i className='fas fa-trash'></i>
                        </Button>
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

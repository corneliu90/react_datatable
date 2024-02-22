import React, { useMemo, useCallback, useEffect, useState } from "react";
import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import TableUsers from "./components/tableUsers/TableUsers";
import { UsersDbase } from "./service/users.dbase";
import ActionMenuForm from "./components/tableUsers/ActionMenuForm";
import UserAdd from "./components/userAdd/UserAdd";
import NavPages from "./components/navPages/NavPages";
import UserLogin from "./components/userLogin/UserLogin";
import UserLogout from "./components/userLogout/UserLogout";

function App() {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [user, setUser] = useState(null);
  const userRole = user?.role;

  useEffect(() => {
    const fetchData = async () => {
      const data = await UsersDbase.getUsers();
      setUsers(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      UsersDbase.validateToken(token)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error validating the token!", error);
          const message =
            error.response?.data?.message || "Token validation failed!";
          console.log(message);
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  const userDelete = useCallback(
    (userId) => {
      setUsers((currentUsers) =>
        currentUsers.filter((user) => user.id !== userId)
      );
    },
    [setUsers]
  );

  const saveUser = useCallback(
    async (updatedUser) => {
      await UsersDbase.updateUser(updatedUser.id, updatedUser);
      setUsers((users) =>
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    },
    [setUsers]
  );

  const searchChange = (event) => {
    setSearchUser(event.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const ageUser = user.age.toString();
      return (
        user.firstName.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchUser.toLowerCase()) ||
        ageUser.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.email.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.role.toLowerCase().includes(searchUser.toLowerCase())
      );
    });
  }, [users, searchUser]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, itemsPerPage, filteredUsers]);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const changeItemsPerPage = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  useEffect(() => {
    console.log("Current status of the user:", user);
  }, [user]);

  return (
    <div className="App d-flex justify-content-center">
      {!user ? (
        <UserLogin setUser={setUser} />
      ) : (
        <>
          <UserLogout user={user} setUser={setUser} />
          <div className="wrapper" style={{ paddingTop: 200 }}>
            <div
              className="d-flex justify-content-center pb-4"
              style={{ gap: 655 }}
            >
              <div>
                {user && user.role === "Administrator" && (
                  <Button
                    className="btn btn-create btn-primary me-md-2"
                    type="button"
                    onClick={() => setModal(true)}
                  >
                    Create
                  </Button>
                )}

                <UserAdd
                  visible={modal}
                  setVisible={setModal}
                  onAddUser={addUser}
                />
              </div>
              <form>
                <input
                  className="btn-search form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={searchChange}
                />
              </form>
            </div>

            <table className="table table-hover table-bordered">
              <ActionMenuForm userRole={userRole} />

              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((user, index) => (
                    <TableUsers
                      key={user.id}
                      displayIndex={
                        index + 1 + (currentPage - 1) * itemsPerPage
                      }
                      user={user}
                      onDelete={userDelete}
                      onSave={saveUser}
                      userRole={userRole}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ color: "red" }}>
                      There are no users!!!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <NavPages
              currentPage={currentPage}
              totalPages={totalPages}
              onChangePage={changePage}
              onChangeItemsPerPage={changeItemsPerPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;

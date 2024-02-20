import React, { useState } from "react";
import Style from "./UserAdd.module.css";
import { UsersDbase } from "../../service/users.dbase";

const clearData = {
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  role: "",
};

const UserAdd = React.memo(({ onAddUser, visible, setVisible }) => {
  const [data, setData] = useState(clearData);

  const createUser = async (e) => {
    e.preventDefault();
    const newUser = await UsersDbase.createUser(data);
    onAddUser(newUser);
    setData(clearData);
    setVisible(false);
  };

  const userCancel = () => {
    setData(clearData);
    setVisible(false);
  };

  const rootClasses = [Style.usersadd];
  if (visible) {
    rootClasses.push(Style.active);
  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => userCancel()}>
      <div className={Style.tableuseradd} onClick={(e) => e.stopPropagation()}>
        <div className="mb-3">
          <label htmlFor="firstNameInput" className="form-label">
            FirstName:
          </label>
          <input
            type="text"
            className="first-name-add form-control"
            id="firstNameInput"
            placeholder="Jackson"
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
            value={data.firstName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastNameInput" className="form-label">
            LastName:
          </label>
          <input
            type="text"
            className="last-name-add form-control"
            id="lastNameInput"
            placeholder="Michael"
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
            value={data.lastName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ageInput" className="form-label">
            Age:
          </label>
          <input
            type="number"
            className="number-age-add form-control"
            id="ageInput"
            placeholder="number"
            onChange={(e) => setData({ ...data, age: e.target.value })}
            value={data.age}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email address:
          </label>
          <input
            type="email"
            required
            className="email-address-add form-control"
            id="emailInput"
            placeholder="name@example.com"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="roleInput" className="form-label">
            Role:
          </label>
          <input
            type="text"
            className="role-name-add form-control"
            id="roleInput"
            placeholder="Administrator"
            onChange={(e) => setData({ ...data, role: e.target.value })}
            value={data.role}
          />
        </div>
        <div className="d-grid gap-2 d-md-block text-center">
          <button
            className="btn btn-cancel btn-danger me-3"
            type="button"
            onClick={() => userCancel()}
          >
            Cancel
          </button>

          <button
            className="btn btn-add btn-primary"
            type="button"
            onClick={createUser}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
});

export default UserAdd;

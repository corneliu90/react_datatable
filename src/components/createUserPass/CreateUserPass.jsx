import React, { useState } from "react";
import Style from "./CreatePass.module.css";
import { UsersDbase } from "../../service/users.dbase";

const clearPass = {
  password: "",
};

const CreateUserPass = ({
  userId,
  visibleCreatePass,
  setVisibleCreatePass,
}) => {
  const [passwordData, setPasswordData] = useState(clearPass);

  const updateUserPassword = async () => {
    if (!passwordData.password) {
      alert("Please enter a password!!!");
      return;
    }

    await UsersDbase.updatePassword(userId, passwordData.password);

    setPasswordData(clearPass);
    setVisibleCreatePass(false);
  };

  const rootClasses = [Style.usersaddpass];
  if (visibleCreatePass) {
    rootClasses.push(Style.active);
  }

  const passCancel = () => {
    setPasswordData(clearPass);
    setVisibleCreatePass(false);
  };

  return (
    <div className={rootClasses.join(" ")} onClick={() => passCancel()}>
      <div className={Style.tablepass} onClick={(e) => e.stopPropagation()}>
        <div className="table-user-pass p-4 w-auto">
          <div className="mb-3">
            <label
              htmlFor={`userPasswordInput-${userId}`}
              className="form-label"
            >
              User Password:
            </label>
            <input
              type="password"
              className="user-password form-control"
              id={`userPasswordInput-${userId}`}
              placeholder="pass"
              onChange={(e) =>
                setPasswordData({ ...passwordData, password: e.target.value })
              }
              value={passwordData.password}
            />
          </div>

          <div className="d-grid gap-2 d-md-block text-center">
            <button
              className="btn btn-cancel-pass btn-danger me-3"
              type="button"
              onClick={() => passCancel()}
            >
              Cancel
            </button>
            <button
              className="btn btn-add-pass btn-primary"
              type="button"
              onClick={updateUserPassword}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPass;

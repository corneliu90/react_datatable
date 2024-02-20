import React, { useState } from "react";
import { UsersDbase } from "../../../service/users.dbase";
import CreateUserPass from "../../createUserPass/CreateUserPass";

const ActionButtons = ({
  userId,
  onDelete,
  onEdit,
  onSave,
  isEditing,
  onCancel,
  userRole,
}) => {
  const [modal, setModal] = useState(false);
  const usersDelete = async () => {
    await UsersDbase.userDelete(userId);
    onDelete(userId);
  };

  if (userRole !== "Administrator") {
    return null;
  }

  return (
    <td className="d-flex justify-content-center text-center">
      {isEditing ? (
        <>
          <button className="btn btn-success me-md-2" onClick={() => onSave()}>
            Save
          </button>
          <button
            className="btn btn-secondary me-md-2"
            onClick={() => onCancel()}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button className="btn btn-primary me-md-2" onClick={() => onEdit()}>
            Edit
          </button>
          <button className="btn btn-danger me-md-2" onClick={usersDelete}>
            Delete
          </button>
          <button
            className="btn btn-secondary me-md-2"
            onClick={() => setModal(true)}
          >
            EditPass
          </button>

          <CreateUserPass
            visibleCreatePass={modal}
            setVisibleCreatePass={setModal}
            userId={userId}
          />
        </>
      )}
    </td>
  );
};

export default ActionButtons;

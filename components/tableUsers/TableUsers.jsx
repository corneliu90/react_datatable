import React, { useRef, useState, useEffect } from "react";
import ActionButtons from "../buttons/actionButton/ActionButtons";

const TableUsers = ({ user, onDelete, onSave, displayIndex, userRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...user });
  const originalData = useRef({ ...user });

  const userChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  const userEdit = () => {
    setIsEditing(!isEditing);
  };

  const userSave = async () => {
    await onSave(editData);
    originalData.current = { ...editData };
    userEdit();
  };

  const userCancel = () => {
    setEditData(originalData.current);
    setIsEditing(false);
  };

  return (
    <tr>
      <th scope="row">{displayIndex}</th>
      <td>
        {isEditing ? (
          <input
            value={editData.firstName}
            onChange={(e) => userChange(e, "firstName")}
          />
        ) : (
          user.firstName
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            value={editData.lastName}
            onChange={(e) => userChange(e, "lastName")}
          />
        ) : (
          user.lastName
        )}
      </td>
      <td>
        {isEditing ? (
          <input value={editData.age} onChange={(e) => userChange(e, "age")} />
        ) : (
          user.age
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            value={editData.email}
            onChange={(e) => userChange(e, "email")}
          />
        ) : (
          user.email
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            value={editData.role}
            onChange={(e) => userChange(e, "role")}
          />
        ) : (
          user.role
        )}
      </td>

      <ActionButtons
        userId={user.id}
        onDelete={onDelete}
        onEdit={userEdit}
        onSave={userSave}
        isEditing={isEditing}
        onCancel={userCancel}
        userRole={userRole}
      />
    </tr>
  );
};

export default TableUsers;

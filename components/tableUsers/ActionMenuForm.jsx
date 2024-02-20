import React from "react";

const ActionMenuForm = ({ userRole }) => {
  return (
    <thead>
      <tr className="action-menu text-center">
        <th scope="col">ID</th>
        <th scope="col">FirstName</th>
        <th scope="col">LastName</th>
        <th scope="col">Age</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
        {userRole === "Administrator" && <th scope="col">Action</th>}
      </tr>
    </thead>
  );
};

export default ActionMenuForm;

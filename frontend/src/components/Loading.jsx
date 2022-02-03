import React from "react";

export const Loading = () => {
  return (
    <div className="my-modal vh-100 vw-100 position-absolute d-flex justify-content-center align-items-center">
      <div className="my-modal-content d-flex justify-content-center align-items-center shadow p-3 mb-5 bg-body rounded">
        <span
          className="spinner-border spinner-border-smd-block me-1"
          role="status"
          aria-hidden="true"
          style={{ height: 35, width: 35 }}
        ></span>
        <p className="m-0">Loading await please...</p>
      </div>
    </div>
  );
};

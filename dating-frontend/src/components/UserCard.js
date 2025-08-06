import React from "react";

function UserCard({ user, onLike, onPass }) {
  return (
    <div className="card shadow-sm text-center h-100" style={{ width: "100%", maxWidth: "300px", minHeight: "430px", maxHeight: "450px" }}>
      <img
        src={user.image}
        className="card-img-top user-img"
        alt={user.name}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{user.name}, {user.age}</h5>
          <p className="card-text bio-preview">{user.bio}</p>

        </div>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <button className="btn btn-outline-danger" onClick={() => onPass(user.name)}>Pass</button>
          <button className="btn btn-outline-success" onClick={() => onLike(user.name)}>Like</button>
        </div>
      </div>
    </div>
  );
}


export default UserCard;

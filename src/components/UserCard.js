import React from "react";

function UserCard({ user, onLike, onPass }) {
  return (
    <div className="card shadow-sm text-center">
      <img src={user.image} className="card-img-top" alt={user.name} />
      <div className="card-body">
        <h5 className="card-title">{user.name}, {user.age}</h5>
        <p className="card-text">{user.bio}</p>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-outline-danger" onClick={() => onPass(user.name)}>Pass</button>
          <button className="btn btn-outline-success" onClick={() => onLike(user.name)}>Like</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;

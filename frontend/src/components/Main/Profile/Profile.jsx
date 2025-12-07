import React from "react";
import "./Profile.css"; // Importa el CSS externo

const Profile = () => {
  const user = {
    name: "Ana Martínez",
    username: "ana_dev",
    avatar: "https://i.pravatar.cc/300",
    bio: "Frontend developer 💻 | React lover ⚛️ | Coffee addict ☕",
    followers: 1200,
    following: 340,
    posts: 58,
  };

  return (
    <div className="profile-container">
      <h1>Perfil</h1>
      <div className="profile-card">
        <img src={user.avatar} alt="Avatar" className="profile-avatar" />

        <h2 className="profile-name">Hola!{user.name}</h2>
        <p className="profile-bio">{user.bio}</p>

        <div className="profile-info-grid">

        </div>

        <button className="profile-edit-btn">Editar Perfil</button>
      </div>
    </div>
  );
};

export default Profile;


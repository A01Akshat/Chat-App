import React from "react";
const Navbar = ({ user }) => {
  return (
    <div className="main-nav">
      <div className="logo" style={{display:"flex",flexDirection:"row",gap:"40rem",fontSize:"18px"}}>
        <h2 style={{marginLeft:"10rem"}}>Chat Application</h2>
        {user ? <span >Welcome, {user.displayName}</span> : <span>Please log in</span>}
      </div>
    </div>
  );
};
export default Navbar;
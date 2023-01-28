import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/model";
import * as NotesApi from "../service/notesService";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await NotesApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  return (
    <>
      <Navbar.Text className="me-2">Signed in as: {user.username}</Navbar.Text>
      <Button onClick={logout}>Logout</Button>
    </>
  );
};

export default NavBarLoggedInView;

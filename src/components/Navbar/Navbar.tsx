import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DogIcon } from "../Icons/Dog";

export const Navbar: FunctionComponent = () => (
  <NavbarContainer>
    <Link to="/">
      <DogIcon />
    </Link>

    <Menu>
      <Link to="/my-team">My team</Link>
    </Menu>
  </NavbarContainer>
);

const NavbarContainer = styled.nav`
  width: 100%;
  height: 50px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;

  svg {
    width: 40px;
  }

  a {
    text-decoration: none;
    color: #000;
  }
`;

const Menu = styled.div``;

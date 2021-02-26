import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { DogIcon } from "../Icons/Dog";

export const Navbar: FunctionComponent = () => (
  <NavbarContainer>
    <a href="/">
      <DogIcon />
    </a>

    <Menu>
      <a href="/my-team">My team</a>
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

  svg {
    width: 40px;
  }

  a {
    text-decoration: none;
    color: #000;
  }
`;

const Menu = styled.div``;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "./scss/_navBar.scss";

const NavBar = () => {
  return (
    <header>
      <nav>
        <p>FACENDIA</p>
        <span>
          <FontAwesomeIcon icon={faUser} size="xl" />
        </span>
      </nav>
    </header>
  );
};

export default NavBar;

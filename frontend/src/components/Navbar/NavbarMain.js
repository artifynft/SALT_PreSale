import React from "react";
import "./Navbar.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ProgressBar } from "react-bootstrap";

function NavbarMain({ connectWallet, walletAddress }) {
  return (
    <Navbar expand="sm" className="main_nav">
      <Container fluid>
        <Nav className="main_nav">
          {/* <div>
            <img src="/logo192.png" width={"50%"} alt="logo" />
          </div> */}
          <div className="main_nav navbar_bg">
            <div className="nav_heading">
              <p>KNIGHTRIDER AI (KITT) TOKEN</p>
            </div>
            <div className="progressBarContainer">
              <ProgressBar
                className="prog progress-bar"
                animated
                now={40}
                label="The AI KITT is being charged for a revolutionary journey"
              />
            </div>
            <div className="nav_button">
              <button className="connect_button" onClick={connectWallet}>
                {walletAddress
                  ? "Connected: " +
                    walletAddress.substring(0, 5) +
                    "..." +
                    walletAddress.substring(38)
                  : "Connect"}
              </button>
            </div>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarMain;

import React from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <FooterContainer>
    <p>Made by Vivek</p>
    <p>&copy; 2024 MovieRecc. All Rights Reserved.</p>
    <div className="socials">
      <a
        href="https://github.com/Vivek4428"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub />
      </a>
      <a
        href="https://linkedin.com/in/vivek-kumar-mondal"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
    </div>
  </FooterContainer>
);

const FooterContainer = styled.footer`
  text-align: center;
  padding: 1rem;
  background: #000;
  color: #fff;
  .socials a {
    margin: 0 0.5rem;
    color: #fff;
    font-size: 1.5rem;
  }
`;

export default Footer;

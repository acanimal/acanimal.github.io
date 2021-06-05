import React from "react"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Content, ImageLogo } from '../components/elements'
import TwitterLogo from "../images/twitter-hand-drawn-logo.svg"
import LinkedInLogo from "../images/linkedin-logo-hand-drawn-outline.svg"
import GithubLogo from "../images/octocat-hand-drawn-logo-outline.svg"

const NavOutLink = styled.a`
  color: black;
  margin-left: 15px;
  text-decoration: none;
  display: inline-block;
  position: relative;
  text-shadow: 1px 1px 1px #FFFFFF;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transform-origin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

const LinksContent = styled.div`
  align-self: center;
  max-width: 860px;
  font-size: 1.2rem;
  text-align: center;
`

const IndexPage = () => {
  return (
    <Layout page={"index"}>
      <Seo title="Home" />
      <Content>
        <LinksContent>
          <NavOutLink href="https://twitter.com/acanimal" target="_blank">
            <ImageLogo alt="logo" src={TwitterLogo} /> @acanimal
          </NavOutLink>
          <NavOutLink href="https://github.com/acanimal" target="_blank">
            <ImageLogo alt="logo" src={GithubLogo} /> GitHub
          </NavOutLink>
          <NavOutLink href="https://www.linkedin.com/in/acanimal" target="_blank">
            <ImageLogo alt="logo" src={LinkedInLogo} /> LinkedIn
          </NavOutLink>
        </LinksContent>
      </Content>
    </Layout>
  )
}

export default IndexPage

import { Link } from "gatsby"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import React from "react"


const Content = styled.div`
  align-self: center;
  max-width: 860px;
  padding: 1rem 1.0875rem;
  font-size: 1.2rem;
  text-align: center;
`

const NavLink = styled(Link)`
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

const GitHubLink = styled(NavOutLink)``

const HomeLink = styled(NavLink)`
  margin-left: 0;
`

const SiteHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  background-color: #EEEEEE;
  background-image: url("https://unsplash.it/1500/500?random&blur");
`

const SiteTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0;
  text-shadow: 1px 1px 1px #FFFFFF;
`

const SiteSubtitle = styled.h3`
  margin-top: 10px;
  color: #606060;
  text-shadow: 1px 1px 1px #FFFFFF;
`

const Header = ({ siteTitle, siteSubtitle }) => (
  <SiteHeader>
    <Content>
      <HomeLink to="/">Home</HomeLink>
      <NavLink to="/blog">Blog</NavLink>
      <GitHubLink href="https://github.com/niklasmtj/gatsby-starter-julia">GitHub</GitHubLink>
    </Content>

    <Content>
      <SiteTitle>{siteTitle}</SiteTitle>
      <SiteSubtitle>{siteSubtitle}</SiteSubtitle>
    </Content>
  </SiteHeader>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteSubtitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
  siteSubtitle: '',
}

export default Header

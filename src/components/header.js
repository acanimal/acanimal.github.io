import { Link } from "gatsby"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import React from "react"
import { ImageLogo } from "../components/elements"
import SubscribeLogo from "../images/rss-feed-hand-drawn-symbol.svg"

const SiteHeader = styled.header`
  background-color: #EEEEEE;
  background: url("https://unsplash.it/1500/500?random&blur") no-repeat center center fixed;
  background-size: cover;
  height: 100%;
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

const HeaderContent = styled.div`
  align-self: center;
  max-width: 860px;
  padding: 1rem 1.0875rem;
  margin: 0 auto;
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

const HomeLink = styled(NavLink)`
  margin-left: 0;
`

const SubscriptionLink = styled.a`
  position: absolute;
  top: 20px;
  right: 20px;
`

const Header = ({ siteTitle, siteSubtitle }) => (
  <SiteHeader>
    <HeaderContent>
      <HomeLink to="/">Home</HomeLink>
      <NavLink to="/blog">Blog</NavLink>
      <NavLink to="/books">Books</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/archive">Archive</NavLink>
      <NavLink to="/about">About</NavLink>
      <SubscriptionLink href="/rss.xml"><ImageLogo alt="logo" src={SubscribeLogo} /></SubscriptionLink>
    </HeaderContent>

    <HeaderContent>
      <SiteTitle>{siteTitle}</SiteTitle>
      <SiteSubtitle>{siteSubtitle}</SiteSubtitle>
    </HeaderContent>
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

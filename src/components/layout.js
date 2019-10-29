/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"

import Header from "./header"
import "./layout.css"

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 0 1.0875rem 1rem;
  padding-top: 0;
`

const GatsbyLink = styled.a`
  margin-left: 5px;
`

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  font-size: 0.7em;
`

const Layout = ({ children, siteTitle, siteSubtitle }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title,
            subtitle
          }
        }
      }
    `}
    render={data => (
      <>
        <Header
          siteTitle={siteTitle || data.site.siteMetadata.title}
          siteSubtitle={siteSubtitle || data.site.siteMetadata.subtitle}
        />
        <Content>
          <main>{children}</main>
          <Footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <GatsbyLink href="https://www.gatsbyjs.org">Gatsby</GatsbyLink>
          </Footer>
        </Content>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  siteTitle: PropTypes.string,
  siteSubtitle: PropTypes.string,
}

Layout.defaultProps = {
  siteTitle: null,
  siteSubtitle: null,
}

export default Layout

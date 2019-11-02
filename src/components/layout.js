import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import Header from "./header"
import { Footer, Content } from "./elements"

import "./layout.css"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const ExternalLink = styled.a`
  margin-left: 5px;
  margin-right: 5px;
`

const Layout = ({ children, siteTitle, siteSubtitle }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
      }
    `}
    render={data => (
      <Wrapper>
        <Header
          siteTitle={siteTitle || data.site.siteMetadata.title}
          siteSubtitle={siteSubtitle || data.site.siteMetadata.subtitle}
        />
        <Content>
          <main>{children}</main>
          <Footer>
            © I built this site with
            <ExternalLink href="https://www.gatsbyjs.org" target="_blank">
              Gatsby
            </ExternalLink>
            from the starter
            <ExternalLink
              href="https://github.com/niklasmtj/gatsby-starter-julia"
              target="_blank"
            >
              julia
            </ExternalLink>
            and made a bunch of modifications. The full content is available in my
            <ExternalLink href="https://github.com/acanimal/acanimal.github.io" target="_blank">
              repository
            </ExternalLink>
            . Icons made by
            <ExternalLink
              href="https://www.flaticon.com/authors/freepik"
              target="_blank"
            >
              Freepik
            </ExternalLink>{" "}
            from{" "}
            <ExternalLink href="https://www.flaticon.com" target="_blank">
              Flaticon
            </ExternalLink>
          </Footer>
        </Content>
      </Wrapper>
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

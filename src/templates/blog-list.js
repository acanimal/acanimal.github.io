import React from "react"
import { graphql, Link } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "@emotion/styled"
import { Content } from '../components/elements'

const ArticleDate = styled.h5`
  display: inline;
  color: #606060;
  margin-bottom: 10px;
`

const ArticleTitle = styled.h3`
  display: inline;
  border-radius: 1em 0 1em 0;
  margin-bottom: 10px;
  background-image: linear-gradient(
    -100deg,
    rgba(255, 250, 150, 0.15),
    rgba(255, 250, 150, 0.8) 100%,
    rgba(255, 250, 150, 0.25)
  );
`

const ArticleReadingTime = styled.h5`
  display: inline;
  color: #606060;
  margin-bottom: 10px;
`

const PrevLink = styled(Link)`
  float: left;
`

const NextLink = styled(Link)`
  float: right;
`

export default class BlogList extends React.Component {
  render() {
    const { currentPage, numPages } = this.props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = "/blog/" + ((currentPage - 1 === 1) ? "" : (currentPage - 1).toString())
    const nextPage = "/blog/" + (currentPage + 1).toString()

    const posts = this.props.data.allMarkdownRemark.edges
    return (
      <Layout>
        <SEO title="Blog" />
        <Content>
          {posts
            // .filter(({ node }) => node.frontmatter.layout === 'post')
            .map(({ node }) => (
            <div key={node.id}>
              <Link
                to={node.fields.slug}
                css={css`
                  text-decoration: none;
                  color: inherit;
                `}
              >
                <ArticleTitle>{node.frontmatter.title} </ArticleTitle>
                <div>
                  <ArticleDate>{node.frontmatter.date}</ArticleDate>
                  <ArticleReadingTime> - {node.fields.readingTime.text}</ArticleReadingTime>
                </div>
                <p>{node.excerpt}</p>
              </Link>
            </div>
          ))}

          {!isFirst && (
            <PrevLink to={prevPage} rel="prev">
              <span role="img" aria-label="prev">👈</span> Previous Page
            </PrevLink>
          )}
          {!isLast && (
            <NextLink to={nextPage} rel="next">
              Next Page <span role="img" aria-label="next">👉</span>
            </NextLink>
          )}
        </Content>
      </Layout>
    )
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { layout: { eq: "post" }}
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            layout
          }
          fields {
            slug
            readingTime {
              text
            }
          }
          excerpt(pruneLength: 500)
        }
      }
    }
  }
`
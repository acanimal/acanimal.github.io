import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Content } from '../components/elements'

const MarkerHeader = styled.h4`
  display: inline;
  border-radius: 1em 0 1em 0;
  margin-bottom: 10px;
`

const ReadingTime = styled.h5`
  display: inline;
  color: #606060;
  margin-bottom: 10px;
`

const IndexPage = ({ data }) => {
  const title = 'Archive'
  const subtitle = '...'

  const years = {}
  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const d = new Date(node.frontmatter.date)
    const year = d.getFullYear()

    if (!years[year]) {
      years[year] = [node]
    } else {
      years[year].push(node)
    }
  })

  return (
    <Layout siteTitle={title} siteSubtitle={subtitle}>
      <SEO title={title} />
      <Content>
        {Object.keys(years).reverse().map((year) => {
          const nodes = years[year]
          
          return (
            <div key={year} css={css`margin-bottom: 40px;`}>
              <h1>{year}</h1>

              {nodes.map((node) => (
                <div key={node.id}>
                  <Link
                    to={node.fields.slug}
                    css={css`
                      text-decoration: none;
                      color: none;
                    `}
                  >
                    <div>
                      <ReadingTime>{node.fields.readingTime.text} - </ReadingTime>
                      <MarkerHeader>{node.frontmatter.title}</MarkerHeader>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )
        })}
      </Content>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          fields {
            slug
            readingTime {
              text
            }
          }
          excerpt
        }
      }
    }
  }
`

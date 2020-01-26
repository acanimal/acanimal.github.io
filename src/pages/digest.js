import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Content } from '../components/elements'

const MarkerHeader = styled.h4`
  text-align: center;
  border-radius: 1em 0 1em 0;
  margin-bottom: 10px;
`

const DigestPage = ({ data }) => {
  const title = 'Digest'
  const subtitle = 'Whatever that catch my attention'

  return (
    <Layout siteTitle={title} siteSubtitle={subtitle}>
      <SEO title={title} />
      <Content>
        {data.allDigestJson.edges.map(({ node }) =>
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
                color: none;
              `}
            >
              <MarkerHeader>{node.name}</MarkerHeader>
            </Link>
          </div>
        )}
      </Content>
    </Layout>
  )
}

export default DigestPage

export const query = graphql`
  query {
    allDigestJson {
      edges {
        node {
          id
          name
          fields {
            slug
          }
        }
      }
    }
  }
`

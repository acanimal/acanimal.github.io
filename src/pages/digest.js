import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import moment from "moment"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Content } from '../components/elements'

const DigestName = styled.h4`
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
        {
          data.allDigestJson.edges
            .sort((e1, e2) => e1.node.date < e2.node.date ? 1 : -1)
            .map(({ node }) => {
              const title = node.name || `year ${moment(node.date).format('YYYY')} - week ${moment(node.date).format('WW')}`

              return (
                <div key={node.id}>
                  <Link
                    to={node.fields.slug}
                    css={css`
                      text-decoration: none;
                      color: none;
                    `}
                  >
                    <DigestName>{title}</DigestName>
                  </Link>
                </div>
              )
            })
        }
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
          date
          fields {
            slug
          }
        }
      }
    }
  }
`

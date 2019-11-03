import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Content, MarkdownContent } from "../components/elements"

export default ({ data }) => {
  const post = data.markdownRemark
  const title = post.frontmatter.title;
  const subtitle = 'Who is a curious animal?'

  return (
    <Layout siteTitle={title} siteSubtitle={subtitle}>
      <SEO
        title={title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Content>
        <MarkdownContent dangerouslySetInnerHTML={{ __html: post.html }} />
      </Content>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        title
      }
      fields {
        slug
        readingTime {
          text
        }
      }
    }
  }
`

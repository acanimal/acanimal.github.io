import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { MarkdownContent } from "../components/elements"

export default function Page({ data }) {
  const post = data.markdownRemark
  const title = post.frontmatter.title;
  const subtitle = 'Who is a curious animal?'

  return (
    <Layout siteTitle={title} siteSubtitle={subtitle}>
      <Seo
        title={title}
        description={post.frontmatter.description || post.excerpt}
      />
      <MarkdownContent dangerouslySetInnerHTML={{ __html: post.html }} />
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

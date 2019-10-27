const path = require(`path`)
const slugify = require(`slugify`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const filename = createFilePath({ node, getNode, basePath: `pages`})
    const match = filename.match(/^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/)

    if (!match) {
      console.error(`Invalid filename ${filename}. Change name to start with a valid date`)
      return
    }

    const [, date, title] = match
    if (!date || !title) {
      console.error(`Invalid filename ${filename}. Change name to start with a valid date and title`)
      return
    }

    const slug = `/${slugify(date, "/")}/${title}/`

    createNodeField({ node, name: `slug`, value: slug })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `
  ).then(result => {
    if(result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (!node.fields.slug){
        return
      }

      createPage({
        path: node.fields.slug, // node.frontmatter.path,
        component: blogPostTemplate,
        slug: node.fields.slug,
        context: {},
      })
    })
  })
}
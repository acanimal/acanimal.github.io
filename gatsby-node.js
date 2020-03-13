const path = require(`path`)
const slug = require(`slug`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // Add extra fields to markdown nodes
  if (node.internal.type === `MarkdownRemark`) {
    const filename = createFilePath({ node, getNode, basePath: `blog`})

    // Blog files must have format name YYYY-MM-DD-title.md
    if (node.frontmatter.layout === 'post') {
      const match = filename.match(/^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/)
      if (match) {
        const [, date, title] = match
        if (!date || !title) {
          console.error(`Invalid filename ${filename}. Change name to start with a valid date and title`)
        } else {
          createNodeField({
            node,
            name: `slug`,
            value: `/blog/${slug(date, "/")}/${title}`
          })
        }
      }
    }
  }

  // Add extra fields to digest nodes
  if (node.internal.type === 'DigestJson') {
    createNodeField({
      node,
      name: `slug`,
      value: `/digest/${slug(node.date)}`
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogListTemplate = path.resolve("./src/templates/blog-list.js")
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  const pageTemplate = path.resolve(`src/templates/page.js`)
  const digestTemplate = path.resolve(`src/templates/digest-post.js`)

  // Create pages for:
  // - markdown pages
  // - paginated blog entries
  // - blog posts
  await graphql(
    `
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              path
              layout
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

    const markdownItems = result.data.allMarkdownRemark.edges

    // Create blog-list pages
    const posts = markdownItems.filter(item => item.node.frontmatter.layout === 'post')
    const postsPerPage = 6
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: blogListTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

    // Create pages and blog post pages
    markdownItems.forEach(({ node }) => {
      if (node.frontmatter.layout === 'page') {  
        createPage({
          path: node.frontmatter.path,
          component: pageTemplate,
        })
      } else if (node.frontmatter.layout === 'post') {
        createPage({
          path: node.fields.slug,
          component: blogPostTemplate,
          context: {
            slug: node.fields.slug,
          },
        })
      } else {
        console.error('error: Invalid page type. The frontmatter.layout filed must be post or page')
      }
    })
  })

  // Create pages for digests
  await graphql(
    `
    {
      allDigestJson {
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

    result.data.allDigestJson.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: digestTemplate,
        context: {
          slug: node.fields.slug,
        },
      })
    })
  })
}
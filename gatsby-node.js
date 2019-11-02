const path = require(`path`)
const slugify = require(`slugify`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

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
          const slug = `/blog/${slugify(date, "/")}/${title}/`
          createNodeField({
            node,
            name: `slug`,
            value: slug
          })
        }
      }
    }
    
    if (node.frontmatter.layout === 'page') {
      createNodeField({
        node,
        name: `slug`,
        value: filename
      })
    }
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
  const pageTemplate = path.resolve(`src/templates/page.js`);

  return graphql(
    `
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            },
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
        component: path.resolve("./src/templates/blog-list.js"),
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
          context: {
            slug: node.fields.slug,
          },
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
}
import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Item = styled.div`
  margin: 20px 0;
  border-bottom: 1px solid #EEEEEE;
  display: flex;
`
const ItemDescription = styled.div`
`

const Title = styled.h4`
  border-radius: 1em 0 1em 0;
  margin-bottom: 10px;
`

const Description = styled.p`
  color: #666;
  font-size: 0.8em;
`

const Cover = styled.img`
  min-width: 15%;
  max-width: 15%; 
  object-fit: cover;
  margin: auto 10px;
  border-radius: 10px;
`

export default ({ data }) => {
  const { name, items} = data.digestJson
  const title = name;
  const subtitle = 'Whatever that catch my attention'

  return (
    <Layout siteTitle={title} siteSubtitle={subtitle}>
      <SEO
        title={title}
        description={subtitle}
      />

      {items.reverse().map((item) => 
        <Item key={item.url_href}>
          <Cover src={item.cover_src} />
          <ItemDescription>
            <Title><a href={item.url_href} target="_blank" rel="noopener noreferrer">{item.title}</a></Title>
            <Description>{item.description}</Description>
          </ItemDescription>
        </Item>
      )}
    </Layout>
  )
}


export const query = graphql`
  query($path: String!) {
    digestJson(fields: { slug: { eq: $path } }) {
      name
      items {
        title
        description
        cover_src
        url_href
      }
    }
  }
`

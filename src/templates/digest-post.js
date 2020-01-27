import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import moment from "moment"
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

  a {
    text-decoration: none;
  }
`

const Description = styled.p`
  color: #666;
  font-size: 0.8em;
`

const Cover = styled.img`
  min-width: 30%;
  max-width: 30%; 
  object-fit: cover;
  margin: auto 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #888888;
`
const Domain = styled.p`
  color: #666666;
  font-size: 0.8rem;

  a {
    text-decoration: none;
  }
`

export default ({ data }) => {
  const { name, date, items} = data.digestJson
  const title = name ||`week ${moment(date).format('YYYY-WW')}`
  const subtitle = 'Whatever that catch my attention'

  // Sort digest items by web_scraper_order field
  items.sort((a, b) => {
    const ia = Number(a.web_scraper_order.split('-')[1])
    const ib = Number(b.web_scraper_order.split('-')[1])
    return ia - ib;
  })

  return (
    <Layout siteTitle={title} siteSubtitle={subtitle}>
      <SEO
        title={title}
        description={subtitle}
      />

      {items.map((item) => 
        <Item key={item.url_href}>
          <Cover src={item.cover_src} />
          <ItemDescription>
            <Title>
              <a href={item.url_href} target="_blank" rel="noopener noreferrer">{item.title}</a>
            </Title>
            <Description>{item.description}</Description>
            <Domain>
              <a href={item.url_href} target="_blank" rel="noopener noreferrer">{item.domain.split(' ')[0]}</a>
            </Domain>
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
      date
      items {
        title
        description
        cover_src
        url_href
        web_scraper_order
        domain
      }
    }
  }
`

import React from "react"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Content } from '../components/elements'
import Jedi from "../images/404.gif"

const Centered = styled.div`
  text-align: center;
`
const Image = styled.img`
  width: 40%;
  min-width: 200px;
  max-width: 400px;
`

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Content>
      <Centered>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>

      <Image alt="not found" src={Jedi} />
      </Centered>
    </Content>
  </Layout>
)

export default NotFoundPage

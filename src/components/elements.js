import styled from "@emotion/styled"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const Content = styled.div`
  align-self: center;
  max-width: 860px;
  padding: 1rem;
`

export const PostHeader = styled.h1`
  display: inline;
  border-radius: 1em 0 1em 0;
  background-image: linear-gradient(
    -100deg,
    rgba(255, 250, 150, 0.15),
    rgba(255, 250, 150, 0.8) 100%,
    rgba(255, 250, 150, 0.25)
  );
`

export const PostSubHeader = styled.h3`
  margin-top: 10px;
  color: #606060;
`

export const MarkdownContent = styled.div`
  a {
    text-decoration: none;
    position: relative;
  }

  a::after {
    content: "";
    position: absolute;
    z-index: -1;
    top: 70%;
    left: -0.1px;
    right: -0.1px;
    bottom: 0;
    transition: top 0.1s ease-in-out;
    background-color: rgba(255, 250, 150, 0.8);
  }

  a:hover::after {
    top: 0;
  }
`

export const ImageLogo = styled.img`
  width: 20px;
  height: 20px;
  margin-bottom: 0;
`

export const Footer = styled.footer`
  border-top: 1px solid #CCCCCC;
  margin-top: 40px;
  font-size: 0.7em;
  text-align: center;
`

import React from 'react'
import styled from "@emotion/styled"

const SubscribeNewsletterSection = styled.div`
  margin: 20px;
  margin-bottom: 40px;
  text-align: center;
  border-bottom: 1px solid #CCCCCC;
`

const EmailInput = styled.input`
  border: 1px solid #CCCCCC;
  margin: 10px;
  padding: 10px 20px;
  margin-right: 0;
  border-radius: 30px 0 0 30px;
`

const SubmitInput = styled.input`
  border: 1px solid #3498DB;
  margin: 10px;
  padding: 10px 20px;
  margin-left: 0;
  border-radius: 0 30px 30px 0;
  background-color: #3498DB;
  color: white;
`

export default function RevueSubscription() {
  return (
    <SubscribeNewsletterSection>
      Subscribe to my newsletter to receive regular news:
      <div id="revue-embed">
        <form action="https://www.getrevue.co/profile/acanimal/add_subscriber" method="post" id="revue-form" name="revue-form"  target="_blank">
          <EmailInput placeholder="Your email address..." type="email" name="member[email]" id="member_email" />
          <SubmitInput type="submit" value="Subscribe" name="member[subscribe]" id="member_submit" />
        </form>
      </div>
    </SubscribeNewsletterSection>
  )
}

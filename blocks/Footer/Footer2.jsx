import React from 'react'
import styled from 'styled-components'

import Button from '../Button/Button'

import TextInput from '../../components/ui/Form/TextInput'
import Checkbox from '../../components/ui/Form/Checkbox'

import { Container, Row, Col } from 'react-bootstrap'

const Wrapper = styled.div`
  background: #dfdfdf;
`
// const Row = styled.div`
//   width: 100%;
//   margin: 0px;
// `
const Footer1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 100px 0px;
  justify-content: center;

  .subfooter {
    width: 700px;
    &:first-child {
      width: 500px;
      margin: 0 100px;
    }
  }
`

const Footer2 = styled.div`
  padding: 0 45px;

  .subfooter2 {
  }
  h5 {
  }
`

const Footer3 = styled.div``

const Footer = ({ sections }) => {
  console.log({ sections })
  return (
    <Container>
      <Wrapper>
        <Row>
          <Col>
            <H1 color="#000">Spec__ial</H1>
            <SecondaryH1 color="#000">Club</SecondaryH1>
            <p>
              for a virtual fashion show introducing Spec__ial’s first
              collection of handmade imaginative eyewear. Post-show the
              collection available for viewing and purchase in limited
              quanities.
            </p>
          </Col>
          <Col>
            <TextInput name="name" label="Name" />
            <TextInput
              name="email"
              label="Email ( 01-02 emails every month )"
            />
            <TextInput
              name="name"
              label="Phone SMS ( 01-02 texts every 03 months )"
            />
            <Checkbox label="I agree to Spec__ial's terms and conditions" />
            <Button>Join</Button>
          </Col>
        </Row>

        <Row>
          <Footer2>
            {sections?.map((section) => (
              <div className="subfooter">
                <h5>{section.title}</h5>

                {section.links.map((link) => (
                  <a href={link.url}>{link.title}</a>
                ))}
              </div>
            ))}
          </Footer2>
        </Row>
        <Row>
          <Footer3></Footer3>
        </Row>
      </Wrapper>
    </Container>
  )
}

export default Footer

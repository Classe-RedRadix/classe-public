import React from 'react'
import MainWrapper from '../wrappers/MainWrapper'
import Row from './Row'
import Cell from '../cell/Cell'

export default {
  title: 'Components/Row',
}

export const row = () => (
  <MainWrapper>
    <Row type="full">
      <Cell>
        <p>Demo cell 01</p>
      </Cell>
      <Cell>
        <p>Demo cell 02</p>
      </Cell>
    </Row>
  </MainWrapper>
)

export const rowComposition = () => (
  <MainWrapper>
    <Row type="full">
      <Cell>
        <p>Demo cell 01</p>
      </Cell>
    </Row>
    <Row type="half">
      <Cell>
        <p>Demo cell 02</p>
      </Cell>
      <Cell>
        <p>Demo cell 03</p>
      </Cell>
    </Row>
    <Row type="third">
      <Cell>
        <p>Demo cell 04</p>
      </Cell>
      <Cell>
        <p>Demo cell 05</p>
      </Cell>
    </Row>
    <Row type="quarter">
      <Cell>
        <p>Demo cell 06</p>
      </Cell>
      <Cell>
        <p>Demo cell 07</p>
      </Cell>
    </Row>
  </MainWrapper>
)

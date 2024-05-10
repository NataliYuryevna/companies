import styled, { css } from 'styled-components'

const Div = styled.div`
  width: min-content;
  &:not(:last-child) {
    padding-bottom: 15px;
  }
`;

export {Div}
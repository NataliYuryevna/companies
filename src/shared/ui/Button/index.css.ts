import styled, { css } from 'styled-components'

const Button = styled.button<{ $primary?: boolean; }>`
  padding: 6px 12px;
  border-radius: 6px;
  width: max-content;
  ${props =>
          props.$primary &&
          css`
            background: rgb(138,43,226);
            color: white;
    `};
`
export {Button}
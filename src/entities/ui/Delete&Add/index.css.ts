import styled, { css } from 'styled-components'

const Div = styled.div<{ $head?: boolean; }>`
    display: flex;
    gap: 15px;
    justify-content: flex-end;
    align-items: center;
    ${props =>
          props.$head &&
          css`
            padding-bottom: 15px;
    `};
`;
export {Div};
import styled, { css } from 'styled-components'

const Buttons = styled.div<{ $head?: boolean; }>`
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    align-items: center;
    ${props =>
          props.$head &&
          css`
            padding-bottom: 10px;
    `};
`;
export {Buttons};
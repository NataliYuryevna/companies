import styled, { css } from 'styled-components'

const Table = styled.table`
  border-radius: 8px;
  overflow: hidden;
  border-spacing: 0;
  background: #FFFFFF;
  border-collapse: collapse;
  box-shadow: 0px 0px 0px 1px rgba(152, 161, 178, 0.1), 0px 1px 4px rgba(69, 75, 87, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.08);
`;

const Tr = styled.tr<{ $classTr?: 'head'|'active'; }>`
  border-left: 2px solid transparent;
  &:nth-child(odd) {
    background: #faf6fd;
  }
  &:nth-child(n) {
    ${props =>
      props.$classTr === 'head' ? css`
        background: rgba(246,239,252, 0.75);
        backdrop-filter: blur(4px);`
      : props.$classTr === 'active' && css`
        background: #f3e9fc;
        border-left: 2px solid #cea6f3;
      `};
  }
`;
const Th = styled.th`
  font-family: 'Inter-SemiBold';
  font-weight: 600;
  font-size: 14px;
  line-height: 1.3;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  height: 20px;
  color: #464F60;
  border-bottom: 1px solid #E9EDF5;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Td = styled.td` 
padding: 0 2px;
`;

export {Table, Th, Tr, Td}


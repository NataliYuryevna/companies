import styled, { css } from 'styled-components'
const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    max-width: 300px;
    margin: auto;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;
export {Form, Buttons};
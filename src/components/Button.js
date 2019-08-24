import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.text};

  font-family: OpenSans;
  font-size: 1.2em;
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
`

export default Button;
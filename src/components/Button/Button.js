import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BUTTON_SIZE = {
  large: {
    padding: '10px 50px',
  },
  medium: {
    padding: '8px 40px',
  },
  small: {
    padding: '4px 20px',
  },
};

const propTypes = {
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  color: PropTypes.string,
};

const ButtonWrapper = styled.button`
  background: ${({ color, theme }) => theme.color[color]};
  color: ${({ color, theme }) => theme.text[color]};
  padding: ${(props) => BUTTON_SIZE[props.size].padding};
  font-size: 18px;
  margin: 0 auto 15px auto;
  display: block;
  border: none;
  border-radius: 5px;
  white-space: nowrap;

  &:active,
  &:disabled {
    opacity: 0.7;
  }

  a {
    color: #fff;
  }

  a:hover,
  a:active {
    text-decoration: none !important;
    color: #fff;
  }
`;

const Button = ({ children, size = 'medium', color = 'primary', ...props }) => {
  return (
    <ButtonWrapper color={color} size={size} {...props}>
      {children}
    </ButtonWrapper>
  );
};

Button.propTypes = propTypes;

export default Button;

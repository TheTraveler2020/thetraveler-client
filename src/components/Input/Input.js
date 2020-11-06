import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputWrapper = styled.div`
  input {
    height: 40px;
    width: 100%;
    padding-left: 5px;
    border-left-color: white;
    outline: none;
    border-radius: 0;
    border: 1px solid #b9b9b9 !important;
    border-left-width: ${props => (props.leftIcon ? 0 : '1')}px !important;
    background: #fff;
    border-radius: 0;
    -webkit-appearance: none;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  input:placeholder {
    color: #ddd;
    font-size: 20px;
  }

  .input-group-text {
    background-color: unset;
    border-radius: 0;
    border: 1px solid #b9b9b9 !important;
    border-right-width: 0;
  }
`;

const propTypes = {
  leftIcon: PropTypes.object,
  borderColor: PropTypes.oneOf(['primary', 'light', 'error', '']),
  type: PropTypes.string,
};

const Input = ({ leftIcon, borderColor = 'primary', rightIcon, type = 'text', as, ...props }) => {
  const Component = as;

  return (
    <InputWrapper leftIcon={leftIcon} borderColor={borderColor}>
      <div className="input-group">
        {leftIcon && (
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              {leftIcon}
            </span>
          </div>
        )}
        {(Component && <Component {...props} />) || <input className="form-control" type={type} {...props} />}
        {rightIcon}
      </div>
    </InputWrapper>
  );
};

Input.propTypes = propTypes;

export default Input;

import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

class TextInput extends React.Component {
  static propTypes = {
    placeholder: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number
    ]),
    onChangeText: PropTypes.func
  }
  state = {text: null}
  handleBlur = () => {
    this.setState({text: null});
  }
  handleFocus = (e) => {
    e.target.select();
  }
  handleChange = e => {
    this.setState({text: e.target.value});
  }
  handleSubmit = e => {
    e.preventDefault();
    if (this.props.onChangeText) {
      this.props.onChangeText(e.target.page.value);
    }
  }
  render() {
    let props = omit(this.props, ['onChangeText', 'placeholder']);
    let value = this.props.placeholder;
    if (this.state.text) {
      value = this.state.text;
    }
    props = {
      ...props, onBlur: this.handleBlur, value,
      onFocus: this.handleFocus,
      onChange: this.handleChange
    };

    let formProps = {
      onSubmit: this.handleSubmit
    };

    return (
      <form className='click-tag-paginate' {...formProps}>
        <input name="page" {...props} />
      </form>
    );
  }
}

export default TextInput;

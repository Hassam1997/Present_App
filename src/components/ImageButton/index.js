/** @format */

// @flow
import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Platform, Image } from "react-native";
import styles from "./styles";

let disableClick = false;
export default class ImageButton extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number,
    ]),
    imageStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number,
    ]),
    isBackgroundBorderLess: PropTypes.bool,
    disableRipple: PropTypes.bool,
    enableClick: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    useTouchable: PropTypes.bool,
    debounceTime: PropTypes.number,
    disabled: PropTypes.bool,
    disabledOpacity: PropTypes.number,
    source: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
      .isRequired,
  };

  static defaultProps = {
    style: {},
    imageStyle: {},
    source: null,
    isBackgroundBorderLess: false,
    disableRipple: false,
    enableClick: false,
    useTouchable: false,
    disabled: false,
    disabledOpacity: 0.5,
    debounceTime: Platform.select({ android: 700, ios: 200 }),
  };

  _onPress = () => {
    if (this.props.enableClick && this.props.onPress) {
      this.props.onPress();
    } else if (!disableClick) {
      disableClick = true;
      if (this.props.onPress) {
        this.props.onPress();
      }

      setTimeout(() => {
        disableClick = false;
      }, this.props.debounceTime);
    }
  };

  render() {
    const {
      style,
      imageStyle,
      isBackgroundBorderLess,
      disableRipple,
      useTouchable,
      disabled,
      disabledOpacity,
      source,
      ...rest
    } = this.props;

    const opacity = this.props.disableRipple ? 1 : 0.5;
    const disableStyle = { opacity: disabled ? disabledOpacity : 1 };
    return (
      <TouchableOpacity
        style={[disableStyle, styles.btnStyle, style]}
        {...rest}
        onPress={this._onPress}
        disabled={disabled}
        activeOpacity={opacity}
      >
        <Image style={[styles.imageStyle, imageStyle]} source={source} />
      </TouchableOpacity>
    );
  }
}

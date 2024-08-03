// @flow
import React from "react";
import PropTypes from "prop-types";
import ImageLoad from "react-native-image-placeholder";
import { DataHandler } from "../../utils";
let placeholderSource = require("./image/placeholder.png");
export default class ImageView extends React.PureComponent {
  static propTypes = {
    // placeholderSource
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    placeholderStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    source: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
      .isRequired,
    isShowActivity: PropTypes.bool,
  };

  static defaultProps = {
    isShowActivity: true,
    style: {},
    placeholderStyle: {},
  };

  render() {
    const { isShowActivity, source, placeholderStyle, ...rest } = this.props;
    return (
      <ImageLoad
        isShowActivity={isShowActivity}
        source={source ? source : source?.uri ? source.uri : placeholderSource}
        {...rest}
        networkInfo={DataHandler.getIsInternetConnected()}
        placeholderSource={placeholderSource}
        placeholderStyle={placeholderStyle}
      />
    );
  }
}

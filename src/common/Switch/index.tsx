import React from "react";
import SwitchToggle from "react-native-switch-toggle";
import PropTypes from "prop-types";
import { Colors } from "../../theme";
import styles from "./styles";

const Switch: React.FC<SwitchProps> = ({
  value,
  onChange,
  disabled,
  toggleColor,
}) => {
  const onPressToggle = () => {
    onChange(!value);
  };

  return (
    <SwitchToggle
      switchOn={value}
      onPress={onPressToggle}
      duration={500}
      containerStyle={styles.containerStyle}
      circleStyle={styles.circleStyle}
      circleColorOff={Colors.WHITE}
      circleColorOn={Colors.WHITE}
      backgroundColorOn={toggleColor ? toggleColor : Colors.LIGHT_GREY}
      {...{ disabled }}
    />
  );
};

Switch.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Switch.defaultProps = { disabled: false };

export default Switch;

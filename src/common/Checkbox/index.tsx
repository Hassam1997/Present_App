/** @format */
import React from 'react';
import { Image } from 'react-native';
import { Text } from '..';
import { ButtonView } from '../../components';
import { Colors, Images } from '../../theme';
import Block from '../Block';
import styles from './styles';


const Checkbox: React.FC<CheckboxProps> = ({
  onPressButton,
  containerStyle,
  isSelected,
  tintColor,
  unckeck,
}) => {
  const renderCheckBox = () => {
    return (
      <Block
        style={[
          styles.btnStyleContainer,
          isSelected
            ? { backgroundColor: Colors.PRIMARY_PINK, borderWidth: 0 }
            : { backgroundColor: Colors.TRANSPARENT },
        ]}
      >
        {!isSelected ? null : (
          <Image
            source={Images.icons.checkIcon}
            style={{ tintColor: tintColor }}
          />
        )}
      </Block>
    );
  };
  const TagView = unckeck ? Block : ButtonView;
  return (
    <TagView
      disabledOpacity={1}
      debounceTime={0}
      onPress={() => onPressButton?.()}
      style={[styles.mainView, containerStyle]}
    >
      {renderCheckBox()}
    </TagView>
  );
};

export default Checkbox;

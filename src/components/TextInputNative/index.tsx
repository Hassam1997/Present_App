/** @format */

import { View, Text, Image, TextInput } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import _ from "lodash";

import { ButtonView } from "..";
import { Colors, Images, Metrics } from "../../theme";
import { InputError } from "../../common";
import styles from "./styles";
import TextInputNativeProps from "./types";

const TextInputNative = (props: TextInputNativeProps) => {
  // destruct props
  const {
    control,
    name,
    forwardRef,
    title,
    defaultValue,
    nextFocusRef,
    error,
    customPlaceholder,
    renderLeft,
    renderRight,
    required,
    showCharCount,
    maxLength,
    onPress,
    hint,
    onSubmit,
    multiline,
    multlineStyle,
    containerStyle,
    dropdownKey,
    formatValue,
    arrowDown,
    textAlign,
    setMultlineStyle,
    showTitle,
    customTitle,
    bottomSpaceLarge,
    topSpaceLarge,
    formatValueChange,
    disablePress,
    secureTextEntry,
    isPrice,
    onChangeCustom,
    isRightArrow,
    editable,
    tintColor,
    customBorderColor = Colors.PRIMARY,
    rightIcon,
    isImage,
    focusedPlaceholder = "",
    leftIcon,
    backgroundColordefault,
    isPhoneInput,
    code,
    setCode,
    buttonAccessablityLabel,
    PhoneAccessibilityLabel,
    keyboardType,
  }: // ...rest
  TextInputNativeProps = props;

  // set state focus
  const [isFocused, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const phoneInput = useRef<PhoneInput | null>(null)

  useEffect(() => {
    if (secureTextEntry) {
      forwardRef?.current?.setNativeProps({
        // style: { fontFamily: Fonts.type.semiBold },
      });
    }
  }, [forwardRef, secureTextEntry]);

  // render input
  const renderInput = ({ onChange, onBlur: _onBlur, value }: any) => {
    // set border color
    let borderColor = customBorderColor;
    let borderWidth = 0;
    let backgroundColor = backgroundColordefault
      ? backgroundColordefault
      : Colors.INPUT_PRIMARY;
    if (error) {
      borderColor = Colors.ERRORINPUT;
      borderWidth = 1;
      backgroundColor = Colors.SECONDARY_PURPLE_VARIANT;
    } else if (isFocused) {
      borderColor = Colors.PRIMARY;
      borderWidth = 1;
    }

    // set view tag
    const opacity = disablePress || editable === false ? 1 : 1;

    // input events
    const onChangeText = (textInputValue: string) => {
      if (formatValueChange) {
        onChange && onChange(formatValueChange(textInputValue));
      } else {
        onChange && onChange(textInputValue);
      }
      if (onChangeCustom) {
        onChangeCustom(textInputValue);
      }
    };
    const onBlur = () => {
      _onBlur && _onBlur();
      setFocus(false);
    };
    const onFocus = () => {
      setFocus(true);
    };

    const onSubmitEditing = () => {
      if (nextFocusRef) {
        nextFocusRef.current?.focus();
      }
    };

    // set placeholder text
    const placeholder = onPress
      ? `${title}` // `${strings('app.select')} ${title}`
      : `${title}`;

    // set input value for dropdown
    const inputValue = dropdownKey ? value?.[dropdownKey] ?? "" : value;

    // custom style
    const customStyleMulti = multiline && setMultlineStyle ? multlineStyle : {};
    // render input

    return (
      <>
        {isPhoneInput ? (
          <PhoneInput
            disableArrowIcon
            defaultValue={value}
            defaultCode={(code as "US") || undefined}
            layout="first"
            onChangeText={onChange}
            onChangeCountry={(text: isTypeObject) => {
              setCode(text);
            }}
            placeholder={customPlaceholder}
            flagButtonStyle={styles.flagButton}
            containerStyle={[
              styles.container,
              {
                borderColor: borderColor,
                borderWidth: borderWidth,
                backgroundColor: backgroundColor,
              },
            ]}
            textContainerStyle={[
              styles.textContainer,
              {
                backgroundColor: backgroundColor,
              },
            ]}
            textInputStyle={[
              styles.textInputStyle,
              {
                backgroundColor: backgroundColor,
              },
            ]}
            codeTextStyle={styles.codeStyle}
            textInputProps={{
              accessibilityLabel: PhoneAccessibilityLabel,
              ...{
                selectionColor: Colors.BLACK,
                maxLength: 15,
                onFocus,
                ref: forwardRef,
                onBlur,
                onChange,
              },
            }}
          />
        ) : (
          <TextInput
            style={[
              styles.input,
              customStyleMulti,
              {
                borderColor: borderColor,
                borderWidth: borderWidth,
                backgroundColor: backgroundColor,
              },
              { textAlign },
              multiline && {
                textAlignVertical: "top",
              },
            ]}
            placeholderTextColor={Colors.DARK_GREY}
            placeholder={customPlaceholder}
            // placeholderStyle={{}}
            value={inputValue}
            ref={forwardRef}
            keyboardType={keyboardType}
            returnKeyType={onSubmit ? "done" : "next"}
            onSubmitEditing={onSubmit || onSubmitEditing}
            editable={
              _.isUndefined(editable) ? (onPress ? false : true) : editable
            }
            pointerEvents={onPress ? "none" : "auto"}
            selection={onPress ? { start: 0, end: 0 } : undefined}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={secureTextEntry && !showPassword}
            selectionColor={Colors.BLACK}
            {...{
              maxLength,
              onChangeText,
              onBlur,
              onFocus,
              multiline,
            }}
            // {...rest}
          />
        )}
      </>
    );
  };

  //render title
  const renderTitle = () => {
    let color = Colors.BLACK;
    if (error) {
      color = Colors.ERRORINPUT;
    } else if (isFocused) {
      color = Colors.BLACK;
    }

    return (
      <Text
        style={[
          styles.title,
          {
            color: color,
          },
        ]}
      >
        {`${customTitle || title}`}
        {required ? (
          <Text
            style={{
              color: Colors.PRIMARY,
            }}
          >
            {" "}
            *
          </Text>
        ) : (
          ""
        )}
      </Text>
    );
  };

  // const renderLeftInput = () => {
  // 	let backgroundColor = Colors.DARK_GREY;
  // 	let iconTintColor = Colors.DARK_GREY;
  // 	if (error) {
  // 		backgroundColor = Colors.ERRORINPUT;
  // 		iconTintColor = Colors.WHITE;
  // 	} else if (isFocused) {
  // 		backgroundColor = Colors.BLACK;
  // 		iconTintColor = Colors.WHITE;
  // 	}

  // 	if (renderLeft) {
  // 		return renderLeft();
  // 	}

  // 	if (isImage) {
  // 		return (
  // 			<View
  // 				style={[
  // 					styles.leftIconStyle,
  // 					{
  // 						backgroundColor: backgroundColor,
  // 					},
  // 				]}>
  // 				<Image
  // 					source={leftIcon}
  // 					style={{ tintColor: iconTintColor }}
  // 				/>
  // 			</View>
  // 		);
  // 	}
  // 	return null;
  // };

  const renderRightInput = (
    onChange: (value: string) => void,
    value: string
  ) => {
    if (renderRight) {
      return (
        <View
          style={{
            justifyContent: "center",
          }}
        >
          {renderRight()}
        </View>
      );
    } else if (secureTextEntry) {
      const TagView = error && !secureTextEntry ? View : ButtonView;
      return (
        <TagView
          onPress={() => {
            setShowPassword(!showPassword);
          }}
          style={styles.rightIconStyle}
        >
          <Image
            source={
              error && !secureTextEntry
                ? Images.icons.errorIcon
                : showPassword
                ? Images.icons.eyeIcon
                : Images.icons.eyecrossIcon
            }
            style={{
              tintColor: error ? Colors.ERRORINPUT : undefined,
            }}
          />
        </TagView>
      );
    } else if (onPress && arrowDown) {
      return (
        <ButtonView
          style={styles.rightIconStyle}
          onPress={() => onPress(onChange, value)}
        >
          <Image
            source={
              error
                ? Images.icons.errorIcon
                : rightIcon
                ? rightIcon
                : isRightArrow
                ? Images.icons.arrowRight
                : Images.icons.arrowDownIcon
            }
            style={[
              styles.arrowStyle,
              {
                tintColor: error ? Colors.ERRORINPUT : Colors.DARK_GREY,
              },
            ]}
          />
        </ButtonView>
      );
    } else if (error) {
      return (
        <View
          style={
            isPhoneInput
              ? styles.rightIconStylePhoneInput
              : styles.rightIconStyle
          }
        >
          <Image source={Images.icons.errorIcon} />
        </View>
      );
    }
    return null;
  };

  // render input container
  const renderInputContainer = (controlllerProps: any) => {
    // set view tag
    // console.log(controlllerProps);
    const TagView = onPress && disablePress === false ? ButtonView : View;
    // const TagView = View;
    let borderColor = customBorderColor;
    if (error) {
      borderColor = Colors.ERRORINPUT;
    } else if (isFocused) {
      // borderColor = Colors.PRIMARY_PURPLE_VARIANT
    }
    return (
      <TagView
        onPress={() => {
          onPress?.(controlllerProps.onChange, controlllerProps.value);
        }}
        // pointerEvents={"none"}
        accessibilityLabel={buttonAccessablityLabel}
        enableClick={true}
        debounceTime={10}
        style={{
          borderColor: borderColor,
        }}
      >
        {title && renderTitle()}
        <View pointerEvents={onPress ? "none" : "auto"}>
          {renderInput(controlllerProps)}
          {renderRightInput(controlllerProps.onChange, controlllerProps.value)}
        </View>
      </TagView>
    );
  };

  // render error
  const renderError = () => {
    return <InputError error={error} />;
  };

  // render input controller
  const renderController = (controlllerProps: any) => {
    let customStyle = bottomSpaceLarge ? styles.bottomSpace : {};
    if (topSpaceLarge) {
      customStyle = styles.topSpace;
    }
    return (
      <View style={[customStyle, containerStyle]}>
        {renderInputContainer(controlllerProps.field)}
        {renderError()}
      </View>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      //defaultValue={defaultValue}
      render={renderController}
    />
  );
};

TextInputNative.defaultProps = {
  containerStyle: {},
  multlineStyle: styles.multline,
  setMultlineStyle: true,
  required: false,
  error: undefined,
  defaultValue: "",
  nextFocusRef: undefined,
  onChangeCustom: undefined,
  formatValueChange: undefined,
  onPress: undefined,
  customPlaceholder: "",
  renderLeft: undefined,
  renderRight: undefined,
  showCharCount: false,
  maxLength: 10000,
  hint: "",
  tintColor: `${Colors.WHITE}`,
  onSubmit: undefined,
  multiline: false,
  dropdownKey: "",
  formatValue: undefined,
  arrowDown: true,
  textAlign: "left",
  showTitle: true,
  customTitle: "",
  bottomSpaceLarge: false,
  topSpaceLarge: false,
  disablePress: false,
  secureTextEntry: false,
  isPrice: false,
  isRightArrow: false,
  isImage: true,
  isPhoneInput: false,
  setCode: undefined,
  buttonAccessablityLabel: "",
  PhoneAccessibilityLabel: "",
  code: "US",
  defaultCode: "US",
  backgroundColordefault: Colors.INPUT_PRIMARY,
};

export default TextInputNative;

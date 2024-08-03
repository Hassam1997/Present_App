/** @format */

import React, { useEffect, useState } from "react"
import { AnimatedLoader, AppButton, Block, Text } from "../../common"
import { ButtonView, Loader } from "../../components"
import { NavigationService, Util } from "../../utils"
import styles from "./styles"
import { Colors } from "../../theme"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field"
import { ViewStyle } from "react-native"
import { authResendOTP, authVerifyOTP } from "../../ducks/auth"
import { useDispatch, useSelector } from "react-redux"
import { getRequestFlag } from "../../ducks/requestFlags"
const CELL_COUNT = 4

const OTPVerification = ({ route }: IsRouteRequiredProps) => {
  const dispatch = useDispatch()
  const requestFlags = useSelector(getRequestFlag(authVerifyOTP.type))
  const loading = requestFlags.loading || false
  const [value, setValue] = useState<string>("")
  const [timer, setTimer] = useState<string>("59")
  const [isLoader, setLoader] = useState<boolean>(false)
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  const verifyOTP = () => {}

  useEffect(() => {
    _timer()
  }, [])

  function _timer() {
    var count = 59
    var interval = setInterval(function () {
      setTimer(count < 10 ? "0" + count : String(count)) // Convert count to a string
      if (count === 0) {
        clearInterval(interval)
        setTimer("00")
      }
      count--
    }, 1000)
  }

  function _callApi() {
    dispatch(
      authVerifyOTP.request({
        payloadApi: {
          code: value,
          email: route?.params?.data?.email,
        },
        cb: (data: any) => {
          if (route?.params?.isForgot) {
            NavigationService.replace("ResetPassword", { data: data })
          } else {
            NavigationService.replace("AccountVerified")
          }
        },
      })
    )
  }

  function renderOTPVerificationContainer() {
    return (
      <>
        <Text
          p
          size={14}
          color={Colors.TITLE_TEXT}
          style={styles.txtStyle}
          accessibilityLabel={"Password Verification Img"}>
          Please enter the OTP you received to{" "}
          <Text samiBold>{route?.params?.data?.email}</Text>
        </Text>
        <Block middle row style={styles.containerFieldsStyle}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={(e) => {
              setValue(e.replace(/[^0-9]/g, ""))
            }}
            cellCount={CELL_COUNT}
            accessibilityLabel={"OTP Field"}
            rootStyle={null}
            keyboardType="number-pad"
            textContentType="creditCardNumber"
            editable={!isLoader}
            renderCell={({ index, symbol, isFocused }) => (
              <Block
                key={index}
                middle
                row
                style={
                  [
                    styles.codeFieldStyle,
                    isFocused && styles.focusCellStyle,
                  ] as ViewStyle
                }>
                <Text
                  style={styles.cellStyle}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </Block>
            )}
          />
        </Block>
        <Block middle row style={styles.containerTimerStyle}>
          <Text medium size={14} color={Colors.DARK_GREY}>
            Expires in:
          </Text>
          <Text samiBold size={14} color={Colors.PRIMARY_PINK}>
            {" 0:" + timer}
          </Text>
        </Block>
        {loading ? (
          <Block center>
            <AnimatedLoader />
            <Text
              p
              size={14}
              color={Colors.TITLE_TEXT}
              style={styles.verifyText}>
              Verifying Code
            </Text>
          </Block>
        ) : (
          <AppButton
            title="Submit"
            accessibilityLabel={"Submit btn"}
            containerStyle={[styles.btnStyle]}
            disabled={value.length == 4 ? false : true}
            onPress={() => {
              _callApi()
            }}
          />
        )}
        {Number(timer) == 0 && (
          <ButtonView
            style={styles.btnSendStyle}
            accessibilityLabel={"Resend btn"}
            onPress={() => {
              dispatch(
                authResendOTP.request({
                  payloadApi: {
                    email: route?.params?.data?.email,
                  },
                  cb: (data: any) => {
                    _timer()
                    setValue("")
                    Util.showCustomMessage("OTP resend successfully", "success")
                  },
                })
              )
            }}>
            <Text p size={14} color={Colors.TITLE_TEXT}>
              Didn’t receive code?
            </Text>
            <Text bold size={14} color={Colors.PRIMARY_PINK}>
              {" Resend"}
            </Text>
          </ButtonView>
        )}
      </>
    )
  }
  return (
    <Block flex style={styles.containerStyle}>
      {renderOTPVerificationContainer()}
      <Loader type={authResendOTP.type} />
    </Block>
  )
}
export default OTPVerification

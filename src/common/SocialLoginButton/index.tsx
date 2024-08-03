/** @format */

import React, { useRef } from "react"
import { Text, StyleProp, ViewStyle, TextStyle, Image } from "react-native"
import styles from "./styles"
import { Colors } from "../../theme"
import { ButtonView } from "../../components"
import InstagramLogin from "react-native-instagram-login"
import { SocialLoginUtil } from "../../utils"

interface SocialLoginButtonProps {
  title: string
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onPress?: (response?: any) => void
  disabled?: boolean
  type?: string
  accessibilityLabel?: string
  image?: any
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  title,
  containerStyle,
  textStyle,
  onPress,
  accessibilityLabel,
  image,
  type,
}: any) => {
  let borderColors: string | undefined
  let color: string | undefined
  if (type == "GOOGLE") {
    borderColors = Colors.GOOGLE_BUTTON_BORDER
    color = Colors.GRAY
  } else if (type == "FACEBOOK") {
    borderColors = Colors.FACEBOOK_BUTTON_BORDER
    color = Colors.FACEBOOK_BUTTON_BORDER
  } else if (type == "INSTA") {
    borderColors = Colors.PURPLE
  } else if (type == "APPLE") {
    borderColors = Colors.BLACK
  }
  const insRef = useRef<any>()
  const instaLogin = () => {
    return (
      <InstagramLogin
        ref={insRef}
        appId="1025635282085417" //Instagram App ID
        appSecret="79aa125bff8795cf864742842b77e8bd" //Instagram App Secret
        redirectUrl="https://www.tekrevol.com/"
        scopes={["user_profile", "user_media"]}
        // incognito={true}
        onLoginSuccess={(token: any) => {
          console.log(token.user_id, token.access_token)
          SocialLoginUtil._handleInstagramLogin(
            token.user_id,
            token.access_token,
            (response: any) => {
              console.log("********* Instagram Reponse *********")
              console.log(response)
              onPress?.(response)
            }
          )
        }}
        onLoginFailure={(data: any) => console.log(data)}
      />
    )
  }
  return (
    <ButtonView
      style={[
        styles.buttonStyle,
        containerStyle,
        {
          borderColor: borderColors,
        },
      ]}
      accessibilityLabel={accessibilityLabel}
      onPress={() => {
        if (type === "INSTA") {
          insRef?.current?.show()
        } else {
          onPress?.()
        }
      }}>
      <Image source={image} style={styles.imageStyle} />
      <Text
        style={[
          styles.buttonTextStyle,
          textStyle,
          {
            color: color,
          },
        ]}>
        {title}
      </Text>
      {instaLogin()}
    </ButtonView>
  )
}

SocialLoginButton.defaultProps = {
  containerStyle: {},
  textStyle: {},
  onPress: () => {},
  accessibilityLabel: "",
  image: null,
  type: "GOOGLE",
}

export default SocialLoginButton

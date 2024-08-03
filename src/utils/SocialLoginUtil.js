/** @format */

import { GoogleSignin } from "@react-native-google-signin/google-signin"
import {
  LoginManager,
  GraphRequest,
  AccessToken,
  GraphRequestManager,
} from "react-native-fbsdk-next"
import { appleAuth } from "@invertase/react-native-apple-authentication"
import Util from "./Util"

async function _handleGoogleLogout(callBack) {
  try {
    const googleResponse = await GoogleSignin.signOut()
    // console.log("============ Google Login ================");
    // console.log(googleResponse);
    callBack(googleResponse)
    // Alert.alert("Login Success");
  } catch (e) {
    console.log(e)
    // Util.showCustomMessage("something wrong please try again")
  }
}

async function _handleGoogleLogin(callBack) {
  try {
    const googleResponse = await GoogleSignin.signIn()
    // console.log("============ Google Login ================");
    // console.log(googleResponse);
    callBack(googleResponse)
    // Alert.alert("Login Success");
  } catch (e) {
    console.log(e)
    // Util.showCustomMessage("something wrong please try again")
  }
}

const _handleFbLogout = (callBack) => {
  // LoginManager.setLoginBehavior("native_with_fallback");
  LoginManager.logOut()
  callBack(null)
}

const _handleFbLogin = async (callBack) => {
  LoginManager.setLoginBehavior("web_only")
  await LoginManager.logInWithPermissions(["public_profile", "email"]).then(
    function (result) {
      console.log("******** Handle login Facebook *******")
      console.log(result)

      if (result.isCancelled) {
        console.log(result)
      } else {
        AccessToken.getCurrentAccessToken().then((data) => {
          const accessToken = data.accessToken.toString()
          console.log(accessToken, "accessToken fb")
          getInfoFromToken(accessToken)
          callBack(data)
        })
        console.log("Login success with permissions: " + JSON.stringify(result))
      }
    },
    function (error) {
      console.log("Login fail with error: " + error)
    }
  )
}

const getInfoFromToken = (token, callApi) => {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: "id, name,  first_name, last_name, email, picture",
    },
  }
  const profileRequest = new GraphRequest(
    "/me",
    { token, parameters: PROFILE_REQUEST_PARAMS },
    (error, result) => {
      if (error) {
        console.log("login info has error: " + error)
      } else {
        console.log("result:", result)
        // Alert.alert("Login Success");
      }
    }
  )
  new GraphRequestManager().addRequest(profileRequest).start()
}

const _handleAppleLogin = async (callBack) => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    )
    console.log("======= Apple Login ==========")
    console.log(appleAuthRequestResponse)
    if (appleAuthRequestResponse) {
      callBack(appleAuthRequestResponse)
      // Alert.alert("Login Success");
    }
  } catch (error) {
    console.log(error)
  }
}

const _handleLinkedInLogin = async (
  access_token,
  authentication_code,
  callBack
) => {
  const Body = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + access_token,
    },
  }
  if (!authentication_code) {
    const response = await fetch(
      "https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))",
      Body
    )
    const apipayload = await response.json()
    console.log("============ Response ============")
    console.log(apipayload)
    callBack(apipayload)
    const responseEmail = await fetch(
      "https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))",
      Body
    )
    const emailpayload = await responseEmail.json()
    console.log("============ Email Response ============")
    console.log(emailpayload)
    // Alert.alert("Login Success");
  }
}

const _handleInstagramLogin = async (user_id, access_token, callBack) => {
  const Body = {
    method: "GET",
  }
  if (user_id) {
    const response = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`,
      Body
    )
    const apipayload = await response.json()
    console.log("============ Response ============")
    console.log(apipayload)
    callBack(apipayload)
    const responseImage = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,timestamp&access_token=${access_token}`,
      Body
    )
    const apipayloadImage = await responseImage.json()
    console.log("============ apipayloadImage ============")
    console.log(apipayloadImage)
    // Alert.alert("Login Success");
  }
}

export default {
  _handleGoogleLogin,
  _handleFbLogin,
  _handleAppleLogin,
  _handleLinkedInLogin,
  _handleInstagramLogin,
  _handleGoogleLogout,
  _handleFbLogout,
}

/** @format */

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import {
  ChooseAccount,
  GetStarted,
  Login,
  OTPVerification,
  OnBoardingScreen,
  SignUp,
  Notification,
  AccountVerified,
  AddJuniorProfile,
  ForgotPassword,
  ResetPassword,
  JuniorSignUp,
  ConfirmPassword,
  ContentPages,
  ProductDetail,
  SearchScreen,
  SearchResult,
  SaveEvents,
  FilterScreen,
  SelectMembers,
  Filter,
  EventDetail,
  BrowseProducts,
  AllProducts,
  GroupPurchase,
  CalendarScreen,
  CreateEvent,
  SelectEvents,
  GroupPurchaseDetails,
  AllCategories,
  ContactDetail,
  AddGroup,
  SaveURL,
  EditContact,
  GroupDetail,
  JuniorGiftDetail,
  EditProfile,
  AddContact,
  AddMembers,
  CreateGroup,
  EditGroup,
  JuniorProfileListing,
  Settings,
  ReferralLink,
  Rewards,
  DeleteAccount,
  DeactivateAccount,
  GiftRecommendation,
} from "../screens";
import { DataHandler, NavigationService, Util } from "../utils";
import BottomTab from "./bottom";
import { Fonts, Images } from "../theme";

import {
  backButton,
  badgeButton,
  headerTransparent,
  removeHeader,
  removeHeaderLeft,
  title,
} from "../utils/NavigatorHelper";
import ChangePassword from "../screens/ChangePassword";
import { getUserData } from "../ducks/auth";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { addGroupLink } from "../ducks/contacts";
import { countBy } from "lodash";

// Add an event listener to handle dynamic links

const Stack = createStackNavigator();

function StackScreens() {
  // Handle the dynamic link

  let initialState;
  const user = getUserData(DataHandler.getStore().getState());
  const handleDynamicLink = (link) => {
    // Extract information from the link and navigate accordingly
    if (user?.id) {
      console.log(link);
      const { url } = link;
      let splitedData = url.split("?");
      let splitedData1 = url.split("=");
      DataHandler.dispatchAction(
        addGroupLink.request({
          payloadApi: { id: splitedData1[1] },
          cb: (item) => {
            NavigationService.navigate("GroupPurchaseDetails", {
              isActive: item.status == "Active" ? true : false,
              headerTitle: item.title,
              groupData: item,
            });
          },
        })
      );
    }
  };
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    // Cleanup the event listener when the component unmounts
    return () => unsubscribe();
  }, []);
  if (user?.id) {
    initialState = Util.isEmpty(user) ? "Login" : "HomeScreen";
  } else {
    initialState = "OnBoardingScreen";
  }
  return (
    <Stack.Navigator
      initialRouteName={initialState}
      screenOptions={{
        headerShown: true,
        ...backButton(),
        headerTitleAlign: "left",
      }}
    >
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{
          ...removeHeader,
        }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          ...removeHeaderLeft,
          ...title("Get Started", 20, Fonts.manrope.bold),
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          ...removeHeaderLeft,
          ...title("Sign In", 20, Fonts.manrope.bold),
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={BottomTab}
        options={{
          ...removeHeader,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          ...removeHeaderLeft,
          ...title("Sign Up", 20, Fonts.manrope.bold),
        }}
      />
      <Stack.Screen
        name="ChooseAccount"
        component={ChooseAccount}
        options={{
          ...removeHeaderLeft,
          ...title("Choose Account", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="OTPVerification"
        component={OTPVerification}
        options={{
          ...title("OTP Verification", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          ...title("Notification", 18, Fonts.manrope.bold),
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          ...removeHeader,
          ...title("Notification", 18, Fonts.manrope.bold),
        }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{
          ...removeHeader,
          ...title("Notification", 18, Fonts.manrope.bold),
        }}
      />
      <Stack.Screen
        name="SaveEvents"
        component={SaveEvents}
        options={{
          presentation: "modal",
          ...title("Notification", 18, Fonts.manrope.bold),
        }}
      />
      <Stack.Screen
        name="ConfirmPassword"
        component={ConfirmPassword}
        options={{
          ...title("Confirm Password", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen name="ContentPages" component={ContentPages} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{
          ...headerTransparent,
          ...backButton(),
          ...title("", 18, Fonts.manrope.bold),
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          ...title("Forgot Password", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          ...title("Reset Password", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="JuniorSignUp"
        component={JuniorSignUp}
        options={{
          ...title("Create a profile", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="AccountVerified"
        component={AccountVerified}
        options={{
          ...removeHeader,
        }}
      />
      <Stack.Screen
        name="AddJuniorProfile"
        component={AddJuniorProfile}
        options={{
          ...removeHeaderLeft,
          ...title("Add Junior Profile", 18, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{
          ...title("Sort & FIlter", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="SelectMembers"
        component={SelectMembers}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={{
          ...title("Sort & FIlter", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetail}
        options={{
          ...title("Event Details", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="BrowseProducts"
        component={BrowseProducts}
        options={{
          ...title("Browse Products", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="AllProducts"
        component={AllProducts}
        options={{
          ...title("All Products", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen name="AllCategories" component={AllCategories} />
      <Stack.Screen
        name="GroupPurchase"
        component={GroupPurchase}
        options={{
          ...title("Group Purchase", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          ...title("Calendar", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen name="CreateEvent" component={CreateEvent} />
      <Stack.Screen
        name="SelectEvents"
        component={SelectEvents}
        options={{
          ...title(
            "Select Event Date & Contacts",
            17,
            Fonts.manrope.bold,
            true
          ),
        }}
      />
      <Stack.Screen
        name="GroupPurchaseDetails"
        component={GroupPurchaseDetails}
      />
      <Stack.Screen name="JuniorGiftDetail" component={JuniorGiftDetail} />
      <Stack.Screen
        name="ContactDetail"
        component={ContactDetail}
        options={{
          ...title("Contact Info", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="AddGroup"
        component={AddGroup}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="SaveURL"
        component={SaveURL}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          ...title("Edit Profile", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="EditContact"
        component={EditContact}
        options={{
          ...title("Edit Info", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="JuniorProfileListing"
        component={JuniorProfileListing}
        options={{
          ...title("Junior Profile", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          ...title("Change Password", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="ReferralLink"
        component={ReferralLink}
        options={{
          ...title("Referral Link", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="Rewards"
        component={Rewards}
        options={{
          ...title("Rewards", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          ...title("Settings", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="GroupDetail"
        component={GroupDetail}
        options={{
          ...title("Group Info", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContact}
        options={{
          ...title("Add Contact", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen name="AddMembers" component={AddMembers} />
      <Stack.Screen
        name="CreateGroup"
        component={CreateGroup}
        options={{
          ...title("Create Group", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="EditGroup"
        component={EditGroup}
        options={{
          ...title("Edit Info", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          ...title("Delete Account", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="DeactivateAccount"
        component={DeactivateAccount}
        options={{
          ...title("Delete Account", 17, Fonts.manrope.bold, true),
        }}
      />
      <Stack.Screen
        name="GiftRecommendation"
        component={GiftRecommendation}
        options={{
          ...title("Gift Recommendation", 17, Fonts.manrope.bold, true),
        }}
      />
    </Stack.Navigator>
  );
}

const AppContainer = () => {
  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <StackScreens />
    </NavigationContainer>
  );
};

export default AppContainer;

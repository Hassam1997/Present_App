/** @format */

import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { AppButton, Block, Text } from "../../common";
import { Colors, Images } from "../../theme";
import {
  LocationUtil,
  NavigationService,
  PermissionUtil,
  Util,
} from "../../utils";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { authUpdateProfile, getUserData } from "../../ducks/auth";
import Contacts from "react-native-contacts";
import { Loader } from "../../components";
import RNCalendarEvents from "react-native-calendar-events";

const AccountVerified = ({ route }: IsRouteRequiredProps) => {
  const dispatch = useDispatch();
  const isSocialLogin = route?.params?.isSocialLogin ?? false;
  const userData = useSelector(getUserData);
  const [fetchingCurrentLocation, setFetchingCurrentLocation] =
    useState<boolean>(false);

  const selectCurrentLocation = () => {
    if (!fetchingCurrentLocation && !userData?.latitude) {
      setFetchingCurrentLocation(true);
      LocationUtil.getCurrentLocation(
        (locationobj: any) => {
          RNCalendarEvents.requestPermissions().then((granted) => {
            PermissionUtil.checkMultiplePermission(
              PermissionUtil.types.CONTACTS,
              () => {}
            );
          });
          dispatch(
            authUpdateProfile.request({
              payloadApi: {
                latitude: locationobj.lat,
                longitude: locationobj.lng,
              },
              cb: (data: any) => {},
            })
          );
          setTimeout(() => {
            setFetchingCurrentLocation(false);
          }, 1000);
        },
        false,
        true,
        () => {
          setTimeout(() => {
            setFetchingCurrentLocation(false);
          }, 1000);
        }
      );
    }
  };

  useEffect(() => {
    selectCurrentLocation();
  }, []);

  return (
    <Block middle style={styles.container}>
      <Image source={Images.images.accountVerified} style={styles.imageView} />
      {route?.params?.isJunior ? (
        <>
          <Text
            bold
            size={20}
            color={Colors.TITLE_TEXT}
            style={styles.textView}
          >
            Junior Account Created!
          </Text>
          <Text p size={14} color={Colors.TITLE_TEXT} style={styles.subText}>
            You can see the content your child can access and more
          </Text>
        </>
      ) : (
        <>
          <Text
            bold
            size={20}
            color={Colors.TITLE_TEXT}
            style={styles.textView}
          >
            Account Verified!
          </Text>
          <Text p size={14} color={Colors.TITLE_TEXT} style={styles.subText}>
            Let’s sign in to your account to the app
          </Text>
        </>
      )}
      <AppButton
        title={"Continue"}
        containerStyle={styles.buttonStyle}
        onPress={() => {
          if (route?.params?.isJunior) {
            NavigationService.reset("ChooseAccount");
          } else {
            if (userData?.latitude && isSocialLogin == false) {
              NavigationService.reset("AddJuniorProfile");
            } else if (isSocialLogin == true) {
              NavigationService.reset("HomeScreen");
            } else {
              selectCurrentLocation();
            }
          }
        }}
      />
      {/* <Loader type={authUpdateProfile.type} /> */}
    </Block>
  );
};

export default AccountVerified;

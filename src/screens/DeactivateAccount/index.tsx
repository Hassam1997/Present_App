/** @format */

import React, { useState } from "react";
import { FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppButton, Block, CircleCheck, Text } from "../../common";
import { Loader } from "../../components";
import { UserUtil } from "../../dataUtils";
import { authDeactivate, getUserData } from "../../ducks/auth";
import { DELETE_ACCOUNT } from "../../dummyData";
import { Colors, Images, Metrics } from "../../theme";
import { NavigationService, Util } from "../../utils";
import styles from "./styles";

const DeactivateAccount = () => {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [selectedIdentifier, setSelectedIdentifier] = useState<{}[]>([]);

  const renderHeader = () => {
    return (
      <Block>
        <Block style={styles.headerContainer}>
          <Text p size={14} color={Colors.BLACK} style={styles.headerTextStyle}>
            {`You’ll receive an email to ${UserUtil.email(
              userData
            )} confirming when your
            account is deleted.`}
          </Text>
        </Block>
        <Block style={styles.headerView}>
          <Text samiBold size={16} color={Colors.TITLE_TEXT}>
            Why did you decide to leave Present?
          </Text>
          <Text
            p
            size={14}
            color={Colors.TITLE_TEXT}
            marginTop={10}
            marginBottom={26}
            width={Metrics.screenWidth * 0.8}
          >
            Share optional feedback to help to make Present better.
          </Text>
        </Block>
      </Block>
    );
  };

  const renderFooter = () => {
    return (
      <Block style={styles.footerStyle}>
        <AppButton
          title={"Done"}
          disabled={selectedIdentifier.length == 0}
          onPress={() => {
            dispatch(
              authDeactivate.request({
                payloadApi: {
                  delete_reason: selectedIdentifier,
                },
                cb: () => {
                  Util.showCustomMessage(
                    "Your account has been deleted!",
                    "success"
                  );
                  NavigationService.reset("Login");
                },
              })
            );
          }}
        />
      </Block>
    );
  };

  return (
    <Block style={styles.container}>
      <FlatList
        data={DELETE_ACCOUNT}
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        bounces={false}
        renderItem={({ item, index }: RenderItemProps) => {
          return (
            <Block
              key={index?.toString()}
              paddingHorizontal={Metrics.ratio(16)}
            >
              <CircleCheck
                containerStyle={styles.checkBoxStyle}
                key={index?.toString()}
                title={item.title}
                identifier={item.identifer}
                isSelected={selectedIdentifier.find(
                  (e: any) => e == item.identifer
                )}
                onPressButton={(identifer: any) => {
                  if (
                    selectedIdentifier.find(
                      (e: any) => e.identifer == identifer
                    )
                  ) {
                    const dummy = selectedIdentifier.filter(
                      (val: any) => val.identifer !== identifer
                    );
                    console.log(dummy);
                    setSelectedIdentifier([...dummy]);
                  } else {
                    selectedIdentifier.push(identifer);
                    setSelectedIdentifier([...selectedIdentifier]);
                  }
                }}
              />
            </Block>
          );
        }}
        ItemSeparatorComponent={() => <Block style={{ height: 15 }} />}
      />
      {renderFooter()}
      <Loader type={authDeactivate.type} />
    </Block>
  );
};

export default DeactivateAccount;

/** @format */

import React from "react";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import { View, StatusBar, ActivityIndicator } from "react-native";
import { getRequestFlag } from "../../ducks/requestFlags";
import { Colors } from "../../theme";
import styles from "./styles";

interface LoaderProps {
  type: string | Array<any>;
  showSpinner?: boolean;
  showLoading?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  type,
  showSpinner = true,
  showLoading,
}) => {
  const requestFlags = useSelector(getRequestFlag(type));
  const loading = requestFlags.loading || false;

  return loading || showLoading ? (
    <View>
      <StatusBar networkActivityIndicatorVisible={loading} />
      <Modal
        backdropTransitionOutTiming={0}
        style={styles.modal}
        backdropOpacity={showSpinner ? 0.7 : 0.1}
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={loading || showLoading}
      >
        <View style={styles.container}>
          {showSpinner && (
            <ActivityIndicator animating size="large" color={Colors.PRIMARY} />
          )}
        </View>
      </Modal>
    </View>
  ) : null;
};

export default React.memo(Loader);

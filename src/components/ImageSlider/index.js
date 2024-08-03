/** @format */

import React, { useState, useRef } from "react"
import { Animated, FlatList, Image } from "react-native"
import { Block } from "../../common"
import PropTypes from "prop-types"
import styles from "./styles"
import ImageView from "../ImageView"
import { Colors, Metrics } from "../../theme"
import PaginationDot from "react-native-animated-pagination-dot"

const ImageSlider = ({ data, paginationRender }) => {
  const slideRef = useRef(null)
  const scrollX = useRef(new Animated.Value(0)).current
  const [currentIndex, setCurrentIndex] = useState(0)

  const viewableitemChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index)
  }).current

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

  const renderPagination = (index, images) => {
    return (
      <Block style={styles.paginationContainer}>
        <PaginationDot
          activeDotColor={Colors.BLACK}
          inactiveDotColor={Colors.DOT_INACTIVE}
          curPage={index}
          maxPage={images?.length}
        />
      </Block>
    )
  }

  return (
    <Block style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={Metrics.screenWidth}
        pagingEnabled
        bounces={false}
        ref={slideRef}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={32}
        disableIntervalMomentum
        style={styles.flatlistStyle}
        snapToAlignment="center"
        legacyImplementation={false}
        onViewableItemsChanged={viewableitemChanged}
        viewabilityConfig={viewConfig}
        ListEmptyComponent={
          <ImageView
            source={{ uri: "" }}
            style={styles.bannerView}
            placeholderStyle={styles.bannerView}
            resizeMode="cover"
          />
        }
        renderItem={({ item, index }) => {
          return (
            <>
              <ImageView
                source={{ uri: item }}
                style={styles.bannerView}
                placeholderStyle={styles.bannerView}
                resizeMode="cover"
              />
            </>
          )
        }}
      />
      {paginationRender &&
        data?.length > 1 &&
        renderPagination(currentIndex, data)}
    </Block>
  )
}

ImageSlider.propTypes = {
  onPress: PropTypes.func,
  data: PropTypes.any,
  index: PropTypes.any,
  onButtonPress: PropTypes.func,
  paginationRender: PropTypes.bool,
}

ImageSlider.defaultProps = {
  onPress: undefined,
  data: null,
  index: null,
  onButtonPress: () => {},
  paginationRender: false,
}

export default ImageSlider

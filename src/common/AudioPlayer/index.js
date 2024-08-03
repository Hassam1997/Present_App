import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from "react-native";
import Video from "react-native-fast-video";
import { Colors, Images, Metrics } from "../../theme";
import Slider from "@react-native-community/slider";
import { Text } from "..";
const playIcon = Images.icons.playIcon;
const pauseIcon = Images.icons.pauseIcon;
const AudioPlayer = ({ audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const playerRef = useRef(null);
  useEffect(() => {
    if (isPlaying) {
      playerRef.current?.seek(currentTime);
    }
  }, [isPlaying]);
  const handleLoad = (metaData) => {
    setDuration(metaData.duration);
    setIsLoaded(true);
  };
  const handleEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };
  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playerRef.current?.seek(currentTime);
    }
  };
  const handleSeek = (value) => {
    setCurrentTime(value);
    if (isPlaying) {
      playerRef.current?.seek(value);
    }
  };
  const handleProgress = (progress) => {
    setCurrentTime(progress.currentTime);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };
  return (
    <View>
      <View style={styles.container}>
        {isLoaded ? (
          <TouchableOpacity onPress={handlePlayPause}>
            <Image
              style={styles.icon}
              source={isPlaying ? pauseIcon : playIcon}
            />
          </TouchableOpacity>
        ) : (
          <ActivityIndicator animating size="small" color={Colors.PRIMARY} />
        )}
        <Slider
          style={styles.slider}
          // step={1}
          minimumValue={0}
          // disabled={true}
          thumbTintColor={Colors.TRANSPARENT}
          maximumValue={duration}
          value={currentTime}
          onValueChange={handleSeek}
          minimumTrackTintColor={Colors.PRIMARY}
          maximumTrackTintColor={Colors.LIGHT_GREY}
        />
      </View>
      <Text
        style={styles.duration}
        size={13}
        color={Colors.HEAD_TEXT}
      >{`${formatTime(currentTime)} / ${formatTime(duration)}`}</Text>
      <Video
        source={{ uri: audio }}
        ref={playerRef}
        paused={!isPlaying}
        onLoad={handleLoad}
        onReadyForDisplay={handleLoad}
        onEnd={handleEnd}
        onProgress={handleProgress}
        playWhenInactive={true}
        playInBackground={false}
        resizeMode="contain"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 3,
  },
  slider: {
    width: Metrics.screenWidth * 0.54,
    marginHorizontal: 3,
  },
  duration: {
    marginTop: 5,
  },
});
export default AudioPlayer;

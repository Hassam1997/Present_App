/** @format */

// Fonts.js:
//  BoilerPlate
//
//  Created by ALI RAZA on 07/10/2022, 12:13:45 PM.
//  Copyright © 2022 HulHub. All rights reserved.
import { Metrics, Colors } from "."
export default class Fonts {
  static FontFamily = {
    default: "Manrope",
    secondary: "Manrope",
  }
  static Type = {
    Bold: "Bold",
    SemiBold: "SemiBold",
    Medium: "Medium",
    Regular: "Regular",
    Black: "Black",
    ExtraBold: "ExtraBold",
    ExtraLight: "ExtraLight",
    Light: "Light",
    Thin: "Thin",
  }
  static Size = {
    xxxSmall: 11,
    xxSmall: 13,
    xSmall: 14,
    small: 15,
    normal: 17,
    medium: 19,
    large: 21,
    xLarge: 23,
    xxLarge: 28,
    xxxLarge: 31,
    huge: 34,
    xhuge: 37,
    xxhuge: 40,
    xxxhuge: 43,
  }
  static font = (
    fontFamily = Fonts.FontFamily.default,
    type = Fonts.Type.Regular
  ) => {
    return {
      fontFamily: fontFamily + "-" + type,
    }
  }
  static SemiBoldFont = (size) => {
    return {
      ...Fonts.font(
        Fonts.FontFamily.default,
        Fonts.Type.SemiBold
        //size
      ),
    }
  }
  static RegularFont = (size) => {
    return {
      ...Fonts.font(
        Fonts.FontFamily.default,
        Fonts.Type.Regular
        // size
      ),
    }
  }
  static BoldFont = (size) => {
    return {
      ...Fonts.font(
        Fonts.FontFamily.default,
        Fonts.Type.Bold
        // size
      ),
    }
  }
  static MediumFont = (size) => {
    return {
      ...Fonts.font(
        Fonts.FontFamily.default,
        Fonts.Type.Medium
        // size
      ),
    }
  }
  static BlackFont = (size) => {
    return {
      ...Fonts.font(
        Fonts.FontFamily.default,
        Fonts.Type.Black
        // size
      ),
    }
  }
  static ExtraBoldFont = (size) => {
    return {
      ...Fonts.font(
        Fonts.FontFamily.default,
        Fonts.Type.ExtraBold
        // size
      ),
    }
  }
  static ExtraLightFont = (size) => {
    return {
      ...Fonts.font(
        Fonts.FontFamily.default,
        Fonts.Type.ExtraLight
        // size
      ),
    }
  }
  static LightFont = (size) => {
    return {
      ...Fonts.font(
        Fonts.FontFamily.default,
        Fonts.Type.Light
        // size
      ),
    }
  }
  static ThinFont = (size) => {
    return {
      ...Fonts.font(
        Fonts.FontFamily.default,
        Fonts.Type.Thin
        // size
      ),
    }
  }
}

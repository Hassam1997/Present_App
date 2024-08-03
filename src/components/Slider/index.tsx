/** @format */

import React from "react"
import MultiSlider, {
  MultiSliderProps,
} from "@ptomasroos/react-native-multi-slider" // Import the original MultiSliderProps

// Define the type for the slider values (change it to match your data type if needed)
type SliderValues = [number, number]

interface Props
  extends Omit<
    MultiSliderProps,
    "onValuesChange" | "values" | "customMarkerLeft"
  > {
  values: SliderValues
  onValuesChange: (values: SliderValues) => void
  customMarkerLeft?: (e: { currentValue: number }) => React.ReactNode
  customMarkerRight?: (e: { currentValue: number }) => React.ReactNode
}

const MyMultiSlider: React.FC<Props> = ({
  values,
  onValuesChange,
  customMarkerLeft,
  customMarkerRight,
  ...restProps
}) => {
  return (
    <MultiSlider
      values={values}
      onValuesChange={(values) => onValuesChange(values as SliderValues)} // Cast values to SliderValues
      customMarkerLeft={customMarkerLeft}
      customMarkerRight={customMarkerRight}
      {...restProps}
    />
  )
}

export default MyMultiSlider

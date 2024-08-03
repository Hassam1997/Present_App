/** @format */

import React, { useState, useEffect } from "react"
import Block from "../Block"
import { Text } from ".."
import styles from "./styles"
import { TextStyle } from "react-native"

const DateTimer: React.FC<any> = ({ date, containerStyle, textStyle }: any) => {
  const targetDate = new Date(date) // Replace with your target date
  targetDate.setHours(23, 59, 59, 999)

  const calculateTimeRemaining = () => {
    const currentDate = new Date()
    const timeDifference = targetDate.getTime() - currentDate.getTime()

    if (timeDifference <= 0) {
      // Target date has passed
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    const seconds = Math.floor((timeDifference / 1000) % 60)
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

    return {
      days,
      hours,
      minutes,
      seconds,
    }
  }

  const formatTime = (value: number) => {
    return value < 10 ? `0${value}` : `${value}`
  }

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <Block style={[containerStyle]}>
      <Text bold style={[styles.buttonText, textStyle] as TextStyle}>
        {`${formatTime(timeRemaining.days)}d : ${formatTime(
          timeRemaining.hours
        )}h : ${formatTime(timeRemaining.minutes)}m`}
      </Text>
    </Block>
  )
}

export default DateTimer

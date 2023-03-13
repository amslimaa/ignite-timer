import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'
import { CyclesContext } from '../..'
import { differenceInSeconds } from 'date-fns'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amauntSecondsPast,
    setSecondsPast,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmaunt * 60 : 0

  useEffect(() => {
    let interval: any
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPast(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPast(secondsDifference)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markCurrentCycleAsFinished,
    setSecondsPast,
  ])

  const currentSeconds = activeCycle ? totalSeconds - amauntSecondsPast : 0
  const minutesAmaunt = Math.floor(currentSeconds / 60)
  const secondsAmaunt = currentSeconds % 60

  const minutes = String(minutesAmaunt).padStart(2, '0')
  const seconds = String(secondsAmaunt).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Timer ${minutes}:${seconds}`
    }
  }, [seconds, minutes, activeCycle])
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}

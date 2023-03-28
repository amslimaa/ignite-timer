import { ReactNode, createContext, useState } from 'react'

interface CreateNewCycleData {
  task: string
  minutesAmaunt: number
}

interface Cycle {
  id: string
  task: string
  minutesAmaunt: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amauntSecondsPast: number
  setSecondsPast: (seconds: number) => void
  createNewCycle: (data: CreateNewCycleData) => void
  interruptNewCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}
export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amauntSecondsPast, setAmauntSecondsPast] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPast(seconds: number) {
    setAmauntSecondsPast(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function createNewCycle(data: CreateNewCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmaunt: data.minutesAmaunt,
      startDate: new Date(),
    }

    setCycles((cycles) => [...cycles, newCycle])
    setActiveCycleId(newCycle.id)
    setAmauntSecondsPast(0)

    // reset()
  }

  function interruptNewCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amauntSecondsPast,
        setSecondsPast,
        createNewCycle,
        interruptNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

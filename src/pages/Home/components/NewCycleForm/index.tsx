import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import * as zod from 'zod'

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmaunt: zod
    .number()
    .min(1, 'O ciclo precisa ser de no minimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no maximo 60 minutos'),
})

<<<<<<< HEAD
export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useFormm<NewCycleFormData>({
    resolver: zodResolverr(newCycleFormValidationSchema),
=======
export function NewCycleFom() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
>>>>>>> d0a1f0c7b4d63e1f71a5deef646da76d006ee2d0
    defaultValues: {
      task: '',
      minutesAmaunt: 0,
    },
  })
<<<<<<< HEAD
=======

>>>>>>> d0a1f0c7b4d63e1f71a5deef646da76d006ee2d0
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        list="taskList"
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
        disabled={!!activeCycle}
      />

      <datalist id="taskList">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
        <option value="Projeto 5" />
      </datalist>
      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmaunt', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}

import { useFormStatus } from 'react-dom'
 
export function SubmitButton(props) {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit"  onClick={props.onClick} className='bg-blue-800 text-white w-full p-2 mt-4 rounded-md'  disabled={pending}>
      {props.label}
    </button>
  )
}
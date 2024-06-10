 "use client"

export function SubmitButton(props) {
 
  return (
    <button type="submit"  onClick={props.onClick} className='flex items-center justify-center bg-blue-800 text-white w-full p-2 mt-4 rounded-md' disabled={props.isPending}>
      {props.mutation?.isPending?<i className="pi pi-spin pi-spinner me-2" style={{ fontSize: '1rem' }}></i>:props.label}
    </button>
  )
}
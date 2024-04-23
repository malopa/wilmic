import Link from "next/link"

export default function DashboardCard(props) {

  return (
    <div className='border w-[500px] items-center rounded-md border-1 mx-4 border-gray-200 rounded-sm 
    bg-gradient-to-r from-blue-900 to-green-500
    '>
        <div className='p-4 h-[120px] flex items-center' > <i className={`pi pi-${props.icon} border-1 border-gray-300 p-3 text-orange-600 text-xl m-2`}></i> <div>
            <div className="text-lg text-white">{props.title}</div>
            <div className='text-left text-gray-700 py-1 text-white'> {props.number}</div>
            </div>
        </div>
        <div className='border-y-1 text-white p-4 border-gray-400 text-end text-blue-900 cursor-pointer'><Link href={`${props.path}`} ><i className='pi pi-eye'></i> Preview</Link></div>
    </div>
  )
}

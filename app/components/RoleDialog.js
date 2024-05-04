import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';

export default function RoleDialog(props) {
  const [checked, setChecked] = useState(false);

  const [roles,setRoles] =useState()

  useEffect(()=>{
    // props.user.groups.filter(p=>)
    // const filteredArray = props.groups?.results?.filter(item => props?.user?.groups?.includes(item));
    // setRoles(filteredArray)

  },[props.user])

  return (
        <Dialog header="Assing Customer roles" 
        visible={props.visible} 
        maximizable style={{ width: '50vw',minHeight:'40vw' }} 
        onHide={() => props.setVisible(false)}>
        <div className='flex justify-between p-4'>
          <div className='border-right-1 w-1/2 border-gray-300'>
            {props?.groups?.results.map(p=>{
              return <div key={p.id}>  {p.name}</div>
            })}
          </div>
          <div>
            {/* {JSON.stringify(roles)} */}
            {JSON.stringify(props?.user?.groups)}
          </div>
        </div>
    </Dialog>
  )

}

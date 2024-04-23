
import React, { useRef } from 'react'
import { Menu } from 'primereact/menu';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { Button } from 'primereact/button';


export default function Header() {

  const router =useRouter()

  let items = [
    { label: 'Profile', 
    icon: 'pi pi-user-edit',
    command: () => {
      router.push("/profile")
    }
    },
    { label:'Change Password', icon:'pi pi-unlock' ,
    command: () => {
      router.push("/change-password")
    }},
    { label: 'Log Out', icon: 'pi pi-sign-out',
    command: () => {
      router.push("/")
    } }
];

const menuLeft = useRef(null);

  return (
    <div>
        <div className="flex justify-end items-center px-4 shadow-sm w-full h-[8vh]"><span className='px-4'>James</span><Button rounded outlined icon='pi pi-user text-xl cursor-pointer' onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup /></div>
        <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
    </div>
  )
}

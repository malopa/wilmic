
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


let items2 = [
  { label: 'Brand', 
  icon: 'pi pi-user-edit',
  command: () => {
    router.push("/brand")
  }
  },
  { label:'Model', icon:'pi pi-unlock' ,
  command: () => {
    router.push("/condition")
  }},
  { label: 'Condition', icon: 'pi pi-cog',
  command: () => {
    router.push("/model")
  } },
  { label: 'Car', icon: 'pi pi-car',
    command: () => {
    router.push("/car")
  } 
},
{ label: 'Country', icon: 'pi pi-car',
    command: () => {
    router.push("/country")
  } },
  { label: 'State', icon: 'pi pi-car',
    command: () => {
    router.push("/state")
  } },
  { label: 'Destination', icon: 'pi pi-cog',
    command: () => {
    router.push("/destination")
  } }
];

const menuLeft = useRef(null);
const menuRight = useRef(null);

  return (
    <div>
        <div className="flex justify-between items-center px-4 shadow-sm w-full h-[8vh]">
          <div className='flex  items-center'>
          {/* <Menu model={items} popup ref={menuLeft} id="popup_menu_left" /> */}
          <Button className='md:hidden lg:hidden' rounded outlined icon='pi pi-bars text-xl cursor-pointer' onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
            <img src='logo.jpg' className='lg:hidden  w-[100px] h-[40px]  mx-2 rounded-full' alt="image"/>
          </div>
          <div>
            <span className='px-4'>James</span><Button rounded outlined icon='pi pi-user text-xl cursor-pointer' onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup /></div>
          <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
          <Menu model={items2} popup ref={menuRight} id="popup_menu_left" />
        </div>
    </div>
  )
}

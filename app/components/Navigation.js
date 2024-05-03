"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { PanelMenu } from 'primereact/panelmenu';
import React, { useState } from 'react'

export default function Navigation(props) {

    const router = useRouter()
    const items = [     
        {
            label: 'Setting',
            icon: 'pi pi-cog',
            items: [
                {
                    label: 'Roles',
                    icon: 'pi pi-cog',
                    command: () => {
                        router.push("/roles")
                      }
                },
                {
                    label: 'Loan Interest',
                    icon: 'pi pi-cloud-download',
                    command: () => {
                        router.push("/loan-type")
                      }
                },
                {
                    label: 'Tax',
                    icon: 'pi pi-pound',
                    command: () => {
                        router.push("/tax")
                      }
                },
                
            ]
        },
    ];

    const [tabs] = useState([
        {
            header: 'Settings',
            children: <div className='flex flex-col'>
                <Link href="/roles" className="text-black no-underline w-full bg-red-500 p-2" >Roles</Link>
                <Link href="/loan-type" className="text-black no-underline w-full p-2" >Loan Type</Link>
                </div>
        },
        
    ]);

    const createDynamicTabs = () => {
        return tabs.map((tab, i) => {
            return (
                <AccordionTab key={tab.header} header={tab.header} disabled={tab.disabled}>
                    {tab.children}
                </AccordionTab>
            );
        });
    };

  return (
    <nav className='hidden block flex flex-col'>
        <Link className='p-2 text-white no-underline w-full my-0' href="/dashboard"> <i className='pi pi-home m-2 text-lg'></i>Dashboard</Link>
        <Link className='p-2 text-white no-underline w-full my-0' href="/user"> <i className='pi pi-user m-2 text-lg'></i> Users</Link>
        {/* <Link className='p-2 text-white no-underline w-full my-0' href="/customer"><i className='pi pi-users m-2 text-lg'></i> Customers</Link> 
        <Link className='p-2 text-white no-underline w-full my-0' href="/loan"><i className='pi pi-home m-2 text-lg'></i> Loans</Link>
        <Link className='p-2 text-white no-underline w-full my-0' href="/report"> <i className='pi pi-file-pdf m-2 text-lg'></i> Report</Link>  */}
          
        <Link className='p-2 text-white no-underline w-full my-0' href="/brand"> <i className='pi pi-cog m-2 text-lg'></i>Brands</Link>
        <Link className='p-2 text-white no-underline w-full my-0' href="/condition"> <i className='pi pi-cog m-2 text-lg'></i>Condition</Link>
        <Link className='p-2 text-white no-underline w-full my-0' href="/model"> <i className='pi pi-cog m-2 text-lg'></i>Models</Link>
        <Link className='p-2 text-white no-underline w-full my-0' href="/car"> <i className='pi pi-cog m-2 text-lg'></i>Cars</Link>
        <Link className='p-2 text-white no-underline w-full my-0' href="/country"> <i className='pi pi-cog m-2 text-lg'></i>Country</Link>
        <Link className='p-2 text-white no-underline w-full my-0' href="/state"> <i className='pi pi-cog m-2 text-lg'></i>States</Link>
        <Link className='p-2 text-white no-underline w-full my-0' href="/destination"> <i className='pi pi-cog m-2 text-lg'></i>Destinations</Link>
        <Link className='p-2 text-white no-underline w-full my-0' href="/features"> <i className='pi pi-cog m-2 text-lg'></i>Features</Link> 
        <Accordion className='bg-red-400'>{createDynamicTabs()}</Accordion>

        {/* <PanelMenu model={items} className="w-full bg-red-400" /> */}
  </nav>
  )
}

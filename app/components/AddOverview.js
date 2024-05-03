"use client"
import React, { useRef, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addEmployee, addLoan } from '../api/loan-request/api'
import { useTokenContext } from '../../context/TokenContext';
import { Toast } from 'primereact/toast';
import { create } from '../api/tku/app';
import { BASE_URL } from '../api/base';


let emptyProduct = {
    id: null,
    name:'',
    value:'',
};


const institution_type = [
    { name: 'Governament', code: 'GN' },
    { name: 'Private', code: 'PR' },
];
export default function AddOverview(props) {

   
    const {token} = useTokenContext()
    const [submitted, setSubmitted] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const toast = useRef()
 
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        console.log("---value ---",val)
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };


    let queryClient = useQueryClient()

    const mutation  = useMutation({mutationFn:create,
        onSuccess:(data)=>{
        props.setIsOverview(false)
        queryClient.invalidateQueries('employee'+props.id)
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer added successfully', life: 3000 });
    }})


    const saveProduct = () => {
        const data = {...product,url:`${BASE_URL}api/v1/overview`,car:+props.id,token}

        mutation.mutate(data)
    };

    const hideDialog = () => {
        setSubmitted(false);
        props.setIsOverview(false);
    };


    const contract_type = [
        { name: 'Renewable', code: 'Renewable' },
        { name: 'Permanent', code: 'Permanent' },
        { name: 'Contract', code: 'Contract' },
    ];



    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );

  return (
    <Dialog 
        visible={props.isOverview} 
        style={{ width: '32rem' }} 
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Overview Details" modal className="p-fluid" 
        footer={productDialogFooter} 
        onHide={hideDialog}
        >
            <Toast ref={toast} />

          


                  


                   
                  
                  

                    <div className='flex justify-between items-center'>


                        <div className="field">
                            <label htmlFor="super_phone" className="font-bold">
                                Name
                            </label>
                            <InputText id="super_phone" value={product.super_phone} onChange={(e) => onInputChange(e, 'super_phone')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.super_phone })} />
                        </div>

                        <div className="field">
                            <label htmlFor="email" className="font-bold">
                                Value
                            </label>
                            <InputText id="supervisor_email" value={product.supervisor_email} onChange={(e) => onInputChange(e, 'supervisor_email')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.supervisor_email })} />
                        </div>

                    </div>


                    <div className='flex justify-between items-center'>
                       

                      

                    </div>

</Dialog>

  )

}

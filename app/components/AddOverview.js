"use client"
import React, { useRef, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTokenContext } from '../../context/TokenContext';
import { Toast } from 'primereact/toast';
import { create } from '../api/tku/app';
import { BASE_URL } from '../api/base';


let emptyProduct = {
    id: null,
    name:'',
    value:'',
};


export default function AddOverview(props) {

   
    const {token} = useTokenContext()
    const [submitted, setSubmitted] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const toast = useRef()
 
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };


    let queryClient = useQueryClient()

    const mutation  = useMutation({mutationFn:create,
        onSuccess:(data)=>{
        queryClient.invalidateQueries('overview'+props.id)
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer added successfully', life: 3000 });
        hideDialog()

    }})


    const saveProduct = () => {
        setSubmitted(true)
        const data = {...product,url:`${BASE_URL}api/v1/overview/`,car:+props.id,token}
        mutation.mutate(data)
    };

    const hideDialog = () => {
        setSubmitted(false);
        props.setIsOverview(false);
    };



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
                            <InputText id="super_phone" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.name && <small className="p-error">Name is required.</small>}

                        </div>

                        <div className="field">
                            <label htmlFor="value" className="font-bold">
                                Value
                            </label>
                            <InputText id="value" value={product.value} onChange={(e) => onInputChange(e, 'value')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.value })} />
                            {submitted && !product.value && <small className="p-error">Value is required.</small>}

                        </div>

                    </div>


</Dialog>

  )

}

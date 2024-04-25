import React, { useRef, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAsset, addLoan } from '../api/loan-request/api'
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { useTokenContext } from '../../context/TokenContext';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';


let emptyProduct = {
    id: null,
    name:'',
    asset_value:'',
};


const institution_type = [
    { name: 'Governament', code: 'GN' },
    { name: 'Private', code: 'PR' },
];
export default function AssetsDialogy(props) {

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

    const queryClient = useQueryClient()

    const mutation  = useMutation({mutationFn:addAsset,
        onSuccess:(data)=>{
        props.setIsAsset(false)
        queryClient.invalidateQueries('assets'+props.id)
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer added successfully', life: 3000 });
    }})


    const saveProduct = () => {
        const data = {...product,customer:+props.id,token}
        mutation.mutate(data)
       
    };

    const hideDialog = () => {
        setSubmitted(false);
        props.setIsAsset(false);
    };



    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );

  return (
    <Dialog 
        visible={props.isAssetAdd} 
        style={{ width: '32rem' }} 
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="COLLATERAL" modal className="p-fluid" 
        footer={productDialogFooter} 
        onHide={hideDialog}
        >
            <Toast ref={toast} />

            <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Asset Name 
                        </label>
                        <InputText  id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.sponsor_name_1 })} />
                    </div>

                        <div className="field">
                            <label htmlFor="asset_value" className="font-bold">
                                Asset Value
                            </label>
                            <InputText id="asset_value" value={product.asset_value} onChange={(e) => onInputChange(e, 'asset_value')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.asset_value })} />
                        </div>


                        {/* <div className="field">
                            <label htmlFor="account" className="font-bold">
                                Bank Account
                            </label>
                            <InputText id="account" value={product.account} onChange={(e) => onInputChange(e, 'account')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.account })} />
                        </div> */}


                        {/* <div className="field">
                            <label htmlFor="account_name" className="font-bold">
                                Bank Name
                            </label>
                            <InputText id="account_name" value={product.account_name} onChange={(e) => onInputChange(e, 'account_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.account_name })} />
                        </div> */}


                   


</Dialog>

  )

}

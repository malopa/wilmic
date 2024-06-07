import React, { useRef, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLoan } from '../api/loan-request/api'
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { useTokenContext } from '../../context/TokenContext';
import { Toast } from 'primereact/toast';


var emptyProduct = {
    id: null,
    amount: '',
    return_date: '',
    customer:'',
    duration:''
};

export default function LoanDialog(props) {

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
    const mutation  = useMutation({mutationFn:addLoan,
        onSuccess:(data)=>{
            hideDialog()
        queryClient.invalidateQueries("customers")
        queryClient.invalidateQueries("loans")
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer added successfully', life: 3000 });
    }})


    const saveProduct = () => {
        const data = {...product,customer:+props.customer_id,token}
        mutation.mutate(data)
    };

    const hideDialog = () => {
        setSubmitted(false);
        props.setLoanVisible(false);
    };


    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };



    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon={`pi ${mutation.isPending?'pi-spin pi-spinner':'pi-check'} `} onClick={saveProduct} />
        </React.Fragment>
    );

  return (
    <Dialog 
        visible={props.loanVisible} 
        style={{ width: '32rem' }} 
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Loan Details" modal className="p-fluid" 
        footer={productDialogFooter} 
        onHide={hideDialog}
        >
            <Toast ref={toast} />

    <div className="field mt-4">
        <label htmlFor="amount" className="font-bold">
            Amount
        </label>
        <InputNumber id="amount" value={product.amount} onChange={(e) => onInputNumberChange(e, 'amount')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.amount })} />
        {submitted && !product.amount && <small className="p-error">Amount is required.</small>}
    </div>


    <div className="field mt-4">
        <label htmlFor="amount" className="font-bold">
            Return Duration in month
        </label>
        <InputText id="duration" value={product.duration} onChange={(e) => onInputChange(e, 'duration')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.duration })} />
        {submitted && !product.duration && <small className="p-error">Amount is required.</small>}
    </div>


    {/* <div className="field">
        <label htmlFor="return_date" className="font-bold">
            Return Date
        </label>
        <Calendar value={product.return_date} dateFormat="yy-mm-dd" onChange={(e) => onInputChange(e, 'return_date')}  className={classNames({ 'p-invalid': submitted && !product.return_date })}/>
        {submitted && !product.return_date && <small className="p-error">Return date is required.</small>}
    </div> */}


</Dialog>

  )

}

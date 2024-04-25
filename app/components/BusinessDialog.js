import React, { useRef, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useMutation } from '@tanstack/react-query';
import { addLoan } from '../api/loan-request/api'
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { useTokenContext } from '../../context/TokenContext';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';


let emptyProduct = {
    id: null,
    busines_type:'',
    busines_location:'',
    office_name:'',
    street:'',
    owenership:'',
    monthly_fee:'',
    business_duration:'',
    daily_income:'',
    montly_income:'',
    daily_expense:'',
    monthly_expense:'',
    another_business:'',
    another_income_month:'',

};


const institution_type = [
    { name: 'Rental', code: 'rental' },
    { name: 'Owner', code: 'owner' },
];
export default function BusinessDialog(props) {

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

    const mutation  = useMutation({mutationFn:addLoan,
        onSuccess:(data)=>{
        props.setLoanVisible(false)
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer added successfully', life: 3000 });
    }})


    const saveProduct = () => {
        
        const data = {...product,return_date:new Date(product.return_date).toISOString().split('T')[0],customer:+props.customer_id,token}
        mutation.mutate(data)
       
    };

    const hideDialog = () => {
        setSubmitted(false);
        props.setIsBusiness(false);
    };



    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );

  return (
    <Dialog 
        visible={props.isBusinessAdd} 
        style={{ width: '32rem' }} 
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Customer busines details" modal className="p-fluid" 
        footer={productDialogFooter} 
        onHide={hideDialog}
        >
            <Toast ref={toast} />

                    <div className="field">
                        <label htmlFor="sponsor_name_1" className="font-bold">
                            Busines Type 
                        </label>
                        <InputText  id="employee" value={product.employee} onChange={(e) => onInputChange(e, 'employee')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.sponsor_name_1 })} />
                    </div>



                    <div className="field">
                        <label htmlFor="work_place" className="font-bold">
                        Business Location
                        </label>
                        <InputText id="work_place" value={product.work_place} onChange={(e) => onInputChange(e, 'work_place')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.relation_1 })} />
                    </div>


                    <div className="field">
                        <label htmlFor="sponsor_phone_1" className="font-bold">
                        Office name/Number
                        </label>
                        <InputText id="work_place" value={product.work_place} onChange={(e) => onInputChange(e, 'work_place')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.relation_1 })} />

                    </div>


                    <div className="field">
                        <label htmlFor="sponsor_phone_1" className="font-bold">
                        Street
                        </label>
                        <InputText id="work_place" value={product.work_place} onChange={(e) => onInputChange(e, 'work_place')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.relation_1 })} />

                    </div>

                    <div className='flex justify-between items-center'>
                        <div className="field">
                            <label htmlFor="start_at" className="font-bold">
                                Ownership
                            </label>

                            <Dropdown value={product.institition_type} onChange={(e) => onInputChange(e, 'institition_type')} options={institution_type} optionLabel="name" 
                            placeholder="Select" className="w-full md:w-14rem" />
                            {submitted && !product.start_at && <small className="p-error">Contract start date is required.</small>}
                        </div>


                        <div className="field">
                            <label htmlFor="end_at" className="font-bold">
                                Monthly free
                            </label>
                            <Calendar value={product.end_at} dateFormat="yy-mm-dd" onChange={(e) => onInputChange(e, 'end_at')}  className={classNames({ 'p-invalid': submitted && !product.end_at })}/>
                            {submitted && !product.end_at && <small className="p-error">Contract end date is required.</small>}
                        </div>
                    </div>

                    <div className='flex justify-between items-center'>

                    <div className="field">
                        <label htmlFor="supervisor_name" className="font-bold">
                            Busines duration since you started?
                        </label>
                        <InputText id="supervisor_name" value={product.supervisor_name} onChange={(e) => onInputChange(e, 'supervisor_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.supervisor_name })} />
                    </div>


                    <div className="field">
                        <label htmlFor="supervisor_name" className="font-bold">
                            Daily Income?
                        </label>
                        <InputText id="supervisor_name" value={product.supervisor_name} onChange={(e) => onInputChange(e, 'supervisor_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.supervisor_name })} />
                    </div>

                    </div>


                    <div className='flex justify-between items-center'>

                    <div className="field">
                        <label htmlFor="supervisor_name" className="font-bold">
                            Monthly Income?
                        </label>
                        <InputText id="supervisor_name" value={product.supervisor_name} onChange={(e) => onInputChange(e, 'supervisor_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.supervisor_name })} />
                    </div>


                    <div className="field">
                        <label htmlFor="supervisor_name" className="font-bold">
                            Daily Expenses?
                        </label>
                        <InputText id="supervisor_name" value={product.supervisor_name} onChange={(e) => onInputChange(e, 'supervisor_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.supervisor_name })} />
                    </div>

                    </div>


                    <div className='flex justify-between items-center'>


                        <div className="field">
                            <label htmlFor="super_phone" className="font-bold">
                                Monthly Expenses
                            </label>
                            <InputText id="super_phone" value={product.super_phone} onChange={(e) => onInputChange(e, 'super_phone')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.super_phone })} />
                        </div>

                        <div className="field">
                            <label htmlFor="email" className="font-bold">
                                Another Business
                            </label>
                            <InputText id="supervisor_email" value={product.supervisor_email} onChange={(e) => onInputChange(e, 'supervisor_email')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.supervisor_email })} />
                        </div>

                    </div>


                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                            Other business income per month
                        </label>
                        <InputText id="work_position" value={product.work_position} onChange={(e) => onInputChange(e, 'work_position')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.work_position })} />
                    </div>

                    <div className='flex justify-between items-center'>
                        
                        {/* <div className="field">
                            <label htmlFor="name" className="font-bold">
                            Other business income per month
                            </label>
                            <InputText id="salary_before_tax" value={product.salary_before_tax} onChange={(e) => onInputChange(e, 'salary_before_tax')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.salary_before_tax })} />
                        </div> */}

                        {/* <div className="field">
                            <label htmlFor="name" className="font-bold">
                                Other business income per month
                            </label>
                            <InputText id="salary_after_tax" value={product.salary_after_tax} onChange={(e) => onInputChange(e, 'salary_after_tax')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.salary_after_tax })} />
                        </div> */}

                    </div>

</Dialog>

  )

}

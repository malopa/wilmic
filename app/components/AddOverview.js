"use client"
import React, { useRef, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addEmployee, addLoan } from '../api/loan-request/api'
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { useTokenContext } from '../../context/TokenContext';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';


let emptyProduct = {
    id: null,
    institition_type:'',
    employee:'',
    work_place:'',
    start_at:'',
    end_at:'',
    supervisor_name:'',
    salary_after_tax:'',
    salary_before_tax:'',
    supervisor_email:'',
    super_phone:'',
    work_position:'',
    customer:'',
    contract_type:''
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

    const mutation  = useMutation({mutationFn:addEmployee,
        onSuccess:(data)=>{
        props.setIsOverview(false)
        queryClient.invalidateQueries('employee'+props.id)
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer added successfully', life: 3000 });
    }})


    const saveProduct = () => {
        const data = {...product,institition_type:product.institition_type.code,start_at:new Date(product.start_at).toISOString().split('T')[0],end_at:new Date(product.end_at).toISOString().split('T')[0],customer:+props.id,token}

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

            <div className="field">
                        <label htmlFor="sponsor_name_1" className="font-bold">
                            Institution Name 
                        </label>
                        <InputText  id="employee" value={product.employee} onChange={(e) => onInputChange(e, 'employee')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.sponsor_name_1 })} />
                    </div>




                    <div className="field">
                        <label htmlFor="sponsor_phone_1" className="font-bold">
                            Institution
                        </label>

                        <Dropdown value={product.institition_type} onChange={(e) => onInputChange(e, 'institition_type')} options={institution_type} optionLabel="name" 
                        placeholder="Select" className="w-full" />
                    </div>


                    <div className="field">
                        <label htmlFor="work_place" className="font-bold">
                            Workplace
                        </label>
                        <InputText id="work_place" value={product.work_place} onChange={(e) => onInputChange(e, 'work_place')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.relation_1 })} />
                    </div>

                    <div className='flex justify-between items-center'>
                        <div className="field">
                            <label htmlFor="start_at" className="font-bold">
                                Work contract start at
                            </label>
                            <Calendar value={product.start_at} dateFormat="yy-mm-dd" onChange={(e) => onInputChange(e, 'start_at')}  className={classNames({ 'p-invalid': submitted && !product.start_at })}/>
                            {submitted && !product.start_at && <small className="p-error">Contract start date is required.</small>}
                        </div>


                        <div className="field">
                            <label htmlFor="end_at" className="font-bold">
                                Work contract end at
                            </label>
                            <Calendar value={product.end_at} dateFormat="yy-mm-dd" onChange={(e) => onInputChange(e, 'end_at')}  className={classNames({ 'p-invalid': submitted && !product.end_at })}/>
                            {submitted && !product.end_at && <small className="p-error">Contract end date is required.</small>}
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="supervisor_name" className="font-bold">
                            Contract Type 
                        </label>

                        <Dropdown value={product.Renewable} onChange={(e) => onInputChange(e, 'Renewable')} options={contract_type} optionLabel="name" 
                        placeholder="Select" className="w-full" />

                    </div>
                    
                    <div className="field">
                        <label htmlFor="supervisor_name" className="font-bold">
                            Supervisor Name 
                        </label>
                        <InputText id="supervisor_name" value={product.supervisor_name} onChange={(e) => onInputChange(e, 'supervisor_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.supervisor_name })} />
                    </div>

                    <div className='flex justify-between items-center'>


                        <div className="field">
                            <label htmlFor="super_phone" className="font-bold">
                                Supervisor Phone Number
                            </label>
                            <InputText id="super_phone" value={product.super_phone} onChange={(e) => onInputChange(e, 'super_phone')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.super_phone })} />
                        </div>

                        <div className="field">
                            <label htmlFor="email" className="font-bold">
                                Supervisor email
                            </label>
                            <InputText id="supervisor_email" value={product.supervisor_email} onChange={(e) => onInputChange(e, 'supervisor_email')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.supervisor_email })} />
                        </div>

                    </div>


                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                            Work Position
                        </label>
                        <InputText id="work_position" value={product.work_position} onChange={(e) => onInputChange(e, 'work_position')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.work_position })} />
                    </div>

                    <div className='flex justify-between items-center'>
                        <div className="field">
                            <label htmlFor="name" className="font-bold">
                                Salary befor tax
                            </label>
                            <InputText id="salary_before_tax" value={product.salary_before_tax} onChange={(e) => onInputChange(e, 'salary_before_tax')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.salary_before_tax })} />
                        </div>

                        <div className="field">
                            <label htmlFor="name" className="font-bold">
                                Salary after tax
                            </label>
                            <InputText id="salary_after_tax" value={product.salary_after_tax} onChange={(e) => onInputChange(e, 'salary_after_tax')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.salary_after_tax })} />
                        </div>

                    </div>

</Dialog>

  )

}

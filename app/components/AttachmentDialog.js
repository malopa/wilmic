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
import { FileUpload } from 'primereact/fileupload';


let emptyProduct = {
    id: null,
    name:'',
    asset_value:'',
};


const institution_type = [
    { name: 'Governament', code: 'GN' },
    { name: 'Private', code: 'PR' },
];
export default function AttachmentDialog(props) {

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
        props.setAttachment(false)
        queryClient.invalidateQueries('assets'+props.id)
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer added successfully', life: 3000 });
    }})


    const saveProduct = () => {
        const data = {...product,customer:+props.id,token}
        mutation.mutate(data)
       
    };

    const hideDialog = () => {
        setSubmitted(false);
        props.setAttachment(false);
    };


    // mfanyakazi ---salary slip  --- lazima
    // mfanyakazi ---bank statement --- lazima
    // mfanyakazi ---employemnt contract --- lazima
    // mfanyakazi ---work id -- lazima



    // mfanyabiashara
    // tax claerance
    // Business licence
    // brela search
    // Tin number
    // body resolution
    // memat
    // Picha ya mazingira ya biashara
    // Picha ya dhamana
    // certificate of incoparation

    const employee_attachment_options = [
        { name: 'Kadi ya gari', code: 'primary level' },
        { name: 'Home chattle', code: 'Secondary' },
        { name: 'Nyumba', code: 'University' },
        { name: 'Bank statment', code: 'University' },
        { name: 'Nida', code: 'University' },
        { name: 'work id', code: 'work id' },
        { name: 'Employement Contract', code: 'Employemnt Contract' },
        
    ];


    const busness_attachment_options = [
        { name: 'Kadi ya gari', code: 'primary level' },
        { name: 'Home chattle', code: 'Secondary' },
        { name: 'Nyumba', code: 'University' },
        { name: 'Bank statment', code: 'University' },
        { name: 'Nida', code: 'University' },
        { name: 'tax claerance', code: 'tax claerance' },
        { name: 'Business licence', code: 'Business licence' },
        { name: 'brela search', code: 'brela search' },
        { name: 'Tin number', code: 'Tin number' },
        { name: 'body resolution', code: 'body resolution' },
        { name: 'Picha ya mazingira ya biashara', code: 'Picha ya mazingira ya biashara' },
        { name: 'Picha ya dhamana', code: 'Picha ya dhamana' },
        { name: 'certificate of incoparation', code: 'certificate of incoparation' },
        
        
    ];
    



    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );

  return (
    <Dialog 
        visible={props.isAttachment} 
        style={{ width: '32rem' }} 
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Attachment" modal className="p-fluid" 
        footer={productDialogFooter} 
        onHide={hideDialog}
        >
            <Toast ref={toast} />

            <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Attachment Name 
                        </label>

                        <Dropdown value={product.owner} onChange={(e) => onInputChange(e, 'owner')} options={employee_attachment_options} optionLabel="name" 
                        placeholder="Select" className="w-full" />
                    </div>

                        <div className="field">
                            <label htmlFor="asset_value" className="font-bold">
                                Asset Value
                            </label>
                            <FileUpload mode="basic" />
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

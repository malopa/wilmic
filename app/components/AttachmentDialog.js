import React, { useRef, useState } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAsset, addAttachment, addLoan } from '../api/loan-request/api'
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
    const [isLoading, setIsLoading] = useState(false);
    const toast = useRef()
    const formData = new FormData()
    // const [options,setOptions] = useState()
    let options;
 
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        console.log("---value ---",val)
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };


    const queryClient = useQueryClient()

    const mutation  = useMutation({mutationFn:addAttachment,
        onSuccess:(data)=>{
            alert(JSON.stringify(data))
        props.setAttachment(false)
        queryClient.invalidateQueries('attachments'+props.id)
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer added successfully', life: 3000 });
    }})


    const saveProduct = () => {

        const data = {...product,name:product.name.name,customer:+props.id,token}
        // formData.append("name",product.name)
        // formData.append("token",token)
        // formData.append("customer",props.id)
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
        { name: 'Home chattle', code: 'Home chattle' },
        { name: 'Nyumba', code: 'Nyumba' },
        { name: 'Bank statment', code: 'Bank statment' },
        { name: 'Nida', code: 'Nida' },
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
    

    if(props.type === "busines"){
        options = busness_attachment_options
    }else{
        options = employee_attachment_options

    }

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        // formData.append("attachment",file)
        cloudinaryUpload(file);

        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
        };

    };



    const cloudinaryUpload = (photo) => {

        setIsLoading(true)
        const data = new FormData()
        data.append('file', photo)
        data.append('upload_preset', 'mjnbiwoy')
        data.append("cloud_name", "dgba3tcha")
        
        fetch("https://api.cloudinary.com/v1_1/dgba3tcha/upload", {
          method: "post",
          body: data
        }).then(res => res.json()).
          then(data => {

            console.log("----data----got",data.secure_url)

            setIsLoading(false)


            let _product = { ...product };

            _product[`attachment`] = data.secure_url;

            setProduct(_product)

  
          }).catch(err => {
            console.log("An Error Occured While Uploading",err)
          })
      }



    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon={`pi ${isLoading?'pi-spin pi-spinner':'pi-check'}`} onClick={saveProduct} />
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

                        <Dropdown value={product.name} 
                        onChange={(e) => onInputChange(e, 'name')} 
                        options={options} 
                        optionLabel="name" 
                        placeholder="Select" className="w-full"
                        
                        />
                    </div>

                        <div className="field">
                            <label htmlFor="asset_value" className="font-bold">
                                Asset Value
                            </label>
                            {/* <FileUpload
                             mode="basic" 
                            customUpload 
                            uploadHandler={customBase64Uploader}
                            /> */}



                        <FileUpload 
                        name="demo[]" url="/api/upload" 
                        multiple accept="image/*" maxFileSize={1000000}
                            customUpload 
                            uploadHandler={customBase64Uploader}
                            />
                                

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

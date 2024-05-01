"use client"
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService.js';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Tooltip } from 'primereact/tooltip';
import LoanDialog from './LoanDialog.js';
import Stepper from '../components/steps/index.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {addCustomer, deleteCustomers} from '../api/customer/api.js'
import { useTokenContext } from '../../context/TokenContext.js';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import Link from 'next/link.js';
        

const _steps =[
    {
    title: 'Basic Info',
    href: 'http://example1.com',
    onClick: (e) => {
      e.preventDefault()
      console.log('onClick', 1)
    }
  }, {
    title: 'Address',
    href: 'http://example2.com',
    onClick: (e) => {
      e.preventDefault()
      console.log('onClick', 2)
    }
  }, {
    title: 'Guarantor',
    href: 'http://example3.com',
    onClick: (e) => {
      e.preventDefault()
      console.log('onClick', 3)
    }
    ,
  
  },
  {
    disabled:true,
    title: 'Next of kin',
    href: 'http://example3.com',
    onClick: (e) => {
      e.preventDefault()
      console.log('onClick', 4)
    }
},



]

export default function CustomDatatable(props) {

    let emptyProduct = {
        id: null,
        fist_name: '',
        middle_name: '',
        last_name: '',
        phone_number: '',
        nida: '',
        gender: '',
        region: '',
        address: '',
        house: '',
        client_type:'',
        sponsor_name_1: '',
        sponsor_phone_1: '',
        sponsor_relation_1: '',
        sponsor_name_2:'',
        sponsor_phone_2:'',
        sponsor_relation_2:'',
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
        owner:'',
        education_level:'',
        next_of_kin_name:'',
        next_of_phone:'',

    };


    const {token} = useTokenContext()
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [loanVisible, setLoanVisible] = useState(false);
    const [steps, setSteps] = useState(_steps);
    const [currentStep,setCurrentStep] = useState(0)

    const toast = useRef(null);
    const dt = useRef(null);

    // useEffect(() => {
    //     ProductService.getProducts().then((data) => setProducts(data));
    // }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };


    const queryClient = useQueryClient()

    const mutation  = useMutation({mutationFn:addCustomer,onSuccess:(data)=>{
        setDeleteProductsDialog(false);
        hideDialog()
        setCurrentStep(0)
        queryClient.invalidateQueries("customers")
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer added successfully', life: 3000 });

    }})
    const saveProduct = () => {
        
        const data = {...product,owner:product.owner.code,education_level:product.education_level.code,token,
            sponsor:[
            {name:product.sponsor_name_1,phone_number:product.sponsor_phone_1,relation:product.sponsor_relation_1},
            {name:product.sponsor_name_2,phone_number:product.sponsor_phone_2,relation:product.sponsor_relation_2}],
           }

        mutation.mutate(data)
       
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const delMutation = useMutation({mutationFn:deleteCustomers,onSuccess:(data)=>{
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer deleted successfully', life: 3000 });
        setProduct(emptyProduct)
    }})

    const deleteProduct = () => {
        // let _products = products.filter((val) => val.id !== product.id);
        const data = {id:product.id,token}
        delMutation.mutate(data)
        // setProducts(_products);
        setDeleteProductDialog(false);
        // setProduct(emptyProduct);

        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        // let _products = products.filter((val) => !selectedProducts.includes(val));

        // setProducts(_products);
        const data = {id:product.id,token}
        delMutation.mutate(data)

        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['gender'] = e.value;
        setProduct(_product);
    };


    const onCategoryClientType = (e) => {
        let _product = { ...product };

        _product['client_type'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <div></div>
        // <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };

    const sponsorBodyTemplate = (rowData)=>{
        return (<div>{"sponsor-"+JSON.stringify(rowData.sponsor)}</div>)
    }
    const actionBodyTemplate = (rowData) => {
        return (
            <div className='flex'>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" 
                tooltip="Edit user" 
                tooltipOptions={{ position: 'top' }}
                onClick={() => editProduct(rowData)} />
                <Link href={`/customer-details/${rowData.id}`}>
                <Button icon="pi pi-eye" rounded outlined severity="success"  />
                </Link>
                {/* <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} /> */}
                <Button label="Request Loan"  className='ml-2' rounded outlined 
                severity="success" 
                disabled={rowData.loan_status == "active"?false:true}
                tooltip="Assign user role" 
                tooltipOptions={{ position: 'top' }} 
                onClick={() => {setLoanVisible(!loanVisible);setProduct(rowData)}} />
                
            </div>
        );
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Clients</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    )

    const productDialogFooter = (
        <React.Fragment>
            {
                currentStep > 0 && <Button label="Back" icon="pi pi-arrow-left" onClick={()=>onClickPrevious()} />
            }

            {(currentStep == 0 || currentStep == 1 || currentStep == 2) && <Button label="Next" icon="pi pi-arrow-right"  onClick={()=>onClickNext()} />}
           
            {(currentStep == 3 )&& <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
            </>}
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );

    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    const onClickNext = ()=> {
          setCurrentStep(p=>p+1)
    }

    const onClickPrevious = ()=> {
        setCurrentStep(p=>p-1)
    }


    const institition_type = [
        { name: 'Governament', code: 'GN' },
        { name: 'Private', code: 'PR' },
    ];

    const owenership = [
        { name: 'Rented', code: 'rented' },
        { name: 'Family', code: 'family' },
        { name: 'Owned', code: 'owned' },
    ];

    const education_level = [
        { name: 'Primary level', code: 'primary level' },
        { name: 'Secondary', code: 'Secondary' },
        { name: 'University', code: 'University' },
    ];


  return (
     <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={props?.customers} 
                        selection={selectedProducts} 
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id" 
                        scrollable scrollHeight="400px" 
                        paginator rows={20} 
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" 
                        globalFilter={globalFilter} 
                        header={header}>

                    <Column selectionMode="false" exportable={false}></Column>
                    <Column field="first_name" header="First Name"  style={{ minWidth: '200px' }} frozen sortable ></Column>
                    <Column field="middle_name" header="Middle Name"  sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="last_name" header="Last Name"  sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="gender" header="Gender" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="phone_number" header="phone_number" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="region" header="Region" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="address" header="Address"  style={{ minWidth: '10rem' }}></Column>
                    <Column field="house" header="House Number"  style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '18rem' }}></Column>

                </DataTable>

            </div>

{/* add product */}
            <Dialog 
                visible={productDialog} 
                style={{ width: '32rem' }} 
                breakpoints={{ '960px': '75vw', '641px': '90vw' }}
                header="Product Details" modal className="p-fluid" 
                footer={productDialogFooter} 
                onHide={hideDialog}
                >

                <Stepper steps={ steps } activeStep={ currentStep }  />
                {currentStep == 0 && <>
                <div className="field mt-4">
                    <label htmlFor="name" className="font-bold">
                        First Name
                    </label>
                    <InputText p={12} id="name" value={product.first_name} onChange={(e) => onInputChange(e, 'first_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.first_name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Middle Name
                    </label>
                    <InputText id="name" value={product.middle_name} onChange={(e) => onInputChange(e, 'middle_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.middle_name })} />
                    {submitted && !product.name && <small className="p-error">Middle Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Last Name
                    </label>
                    <InputText id="name" value={product.last_name} onChange={(e) => onInputChange(e, 'last_name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.last_name })} />
                    {submitted && !product.name && <small className="p-error">Last Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Nida Namba
                    </label>
                    <InputText id="name" value={product.nida} onChange={(e) => onInputChange(e, 'nida')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.nida })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Phone Number
                    </label>
                    <InputText id="name" value={product.phone_number} onChange={(e) => onInputChange(e, 'phone_number')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.phone_number })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>



                <div className="field">
                    <label className="mb-3 font-bold">Gender</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="gender" value="Male" onChange={onCategoryChange} checked={product.gender === 'Male'} />
                            <label htmlFor="category1">Male</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="gender" value="Female" onChange={onCategoryChange} checked={product.gender === 'Female'} />
                            <label htmlFor="category2">Female</label>
                        </div>
                    </div>
                </div>

                </>}

                {currentStep == 1 && <>

                    <div className='flex justify-between items-center'>
                    <div className="field mt-4">
                        <label htmlFor="name" className="font-bold">
                            District
                        </label>
                        <InputText id="name" value={product.region} onChange={(e) => onInputChange(e, 'region')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.region })} />
                    </div>

                    <div className="field mt-4">
                        <label htmlFor="name" className="font-bold">
                            Street
                        </label>
                        <InputText id="district" value={product.district} onChange={(e) => onInputChange(e, 'district')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.district })} />
                    </div>

                    </div>

                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                            Home address
                        </label>
                        <InputText id="name" value={product.address} onChange={(e) => onInputChange(e, 'address')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.address })} />
                    </div>

                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                            House Number
                        </label>
                        <InputText id="name" value={product.house} onChange={(e) => onInputChange(e, 'house')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.house })} />
                    </div>

                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                            Ownership
                        </label>

                        <Dropdown value={product.owner} onChange={(e) => onInputChange(e, 'owner')} options={owenership} optionLabel="name" 
                        placeholder="Select" className="w-full" />

                    </div>


                    <div className="field">
                        <label className="mb-3 font-bold">Client Type</label>
                        <div className="formgrid grid">
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="category11" name="client_type" value="busines" onChange={onCategoryClientType} checked={product.client_type === 'busines'} />
                                <label htmlFor="category11">Busines</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="category12" name="client_type" value="employee" onChange={onCategoryClientType} checked={product.client_type === 'employee'} />
                                <label htmlFor="category12">Employee</label>
                            </div>
                        </div>
                    </div>


                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                            Education level
                        </label>

                        <Dropdown 
                        value={product.education_level} 
                        onChange={(e) => onInputChange(e, 'education_level')} 
                        options={education_level} 
                        optionLabel="name" 
                        placeholder="Select" 
                        className="w-full" 
                        />

                        {/* <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} /> */}
                    </div>


                    <div className="field">
                        <label className="mb-3 font-bold">Marital Status</label>
                        <div className="formgrid grid">
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="category1" name="gender" value="Male" onChange={onCategoryChange} checked={product.gender === 'Male'} />
                                <label htmlFor="category1">Married</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="category2" name="gender" value="Female" onChange={onCategoryChange} checked={product.gender === 'Female'} />
                                <label htmlFor="category2">Not Married</label>
                            </div>
                        </div>
                    </div>

                    </>}



                {currentStep == 2 && <>
                    <div className='mt-4'> Guarantor 1</div>
                    <div className="field">
                        <label htmlFor="sponsor_name_1" className="font-bold">
                            Name 
                        </label>
                        <InputText  id="sponsor_name_1" value={product.sponsor_name_1} onChange={(e) => onInputChange(e, 'sponsor_name_1')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.sponsor_name_1 })} />
                    </div>


                    <div className="field">
                        <label htmlFor="sponsor_phone_1" className="font-bold">
                            Phone Number
                        </label>
                        <InputText id="sponsor_phone_1" value={product.sponsor_phone_1} onChange={(e) => onInputChange(e, 'sponsor_phone_1')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.sponsor_phone_1 })} />
                    </div>


                    <div className="field">
                        <label htmlFor="sponsor_relation_1" className="font-bold">
                            Relationship
                        </label>
                        <InputText id="sponsor_relation_1" value={product.sponsor_relation_1} onChange={(e) => onInputChange(e, 'sponsor_relation_1')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.relation_1 })} />
                    </div>

                    <div className='mt-4'> Guarantor 2</div>
                    <div className="field">
                        <label htmlFor="sponsor_name_2" className="font-bold">
                            Name 
                        </label>
                        <InputText id="sponsor_name_2" value={product.sponsor_name_2} onChange={(e) => onInputChange(e, 'sponsor_name_2')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.sponsor_name_2 })} />
                    </div>


                    <div className="field">
                        <label htmlFor="sponsor_phone_2" className="font-bold">
                            Phone Number
                        </label>
                        <InputText id="sponsor_phone_2" value={product.sponsor_phone_2} onChange={(e) => onInputChange(e, 'sponsor_phone_2')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.sponsor_phone_2 })} />
                    </div>


                    <div className="field">
                        <label htmlFor="name" className="font-bold">
                            Relationship
                        </label>
                        <InputText id="sponsor_relation_2" value={product.sponsor_relation_2} onChange={(e) => onInputChange(e, 'sponsor_relation_2')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.sponsor_relation_2 })} />
                    </div>

                </>}


                {currentStep == 3 && <>
                    {/* <div className='mt-4 font-bold'> Employee Infomation</div> */}
                    <div className="field">
                        <label htmlFor="sponsor_name_1" className="font-bold">
                            Full Name 
                        </label>
                        <InputText  id="employee" value={product.employee} onChange={(e) => onInputChange(e, 'employee')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.sponsor_name_1 })} />
                    </div>



                    <div className="field">
                        <label htmlFor="work_place" className="font-bold">
                            Phone Number
                        </label>
                        <InputText id="work_place" value={product.work_place} onChange={(e) => onInputChange(e, 'work_place')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.relation_1 })} />
                    </div>


                    

                    


                   

                    <div className='flex justify-between items-center'>
                       

                       

                    </div>


                </>}

            </Dialog>

        {loanVisible && 
            <LoanDialog customer_id={product.id}  loanVisible={loanVisible} setLoanVisible={setLoanVisible} />
        } 

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} 
                breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
                header="Confirm" modal 
                footer={deleteProductDialogFooter} 
                onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
  )
}

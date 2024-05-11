"use client"
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService.js';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import RoleDialog from './RoleDialog.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {addLoanType, returnLoan, updateLoan} from '../api/loan/api.js'
import { useTokenContext } from '../../context/TokenContext.js';
import { getCustomerLoan, getLoan } from '../api/loan-request/api.js';
import Spinner from './Spinner.js'
import Link from 'next/link.js';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
        

export default function LoanRequestTable(props) {

    const {token} = useTokenContext()
    
    const {isLoading,data} = useQuery({
        queryKey:['loans'],queryFn:async ()=> await getCustomerLoan(token)
      })

    let emptyProduct = {
        id: null,
        amount: '',
        amount_disbursed: '',
        customer_id: null,
        reason:''
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState();
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [visible, setVisible] = useState(false);
    const [status,setStatus] = useState('')
    const [interest,setInterest] = useState()
    const [loan_type,setLoanType] = useState("one")
    const [min_amount,setMinAmount] = useState()
    const [max_amount,setMaxAmount] = useState()
    const [disburseProductDialog,setDisturbsedDialog] = useState(false)
    const [messsage,setMessage] =useState()
    
    const [isEditProduct,setEditProduct] = useState(false)

    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []);

    const formatCurrency = (value) => {
        return (+value).toLocaleString('en-US', { style: 'currency', currency: 'TZS' });
    };

    const openNew = () => {
        setProduct();
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
        setDisturbsedDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };


   

    const client = useQueryClient()
    const mutation = useMutation({
        mutationFn:addLoanType,
        onSuccess:(data)=>{
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Loan added successfully', life: 3000 });
        }
    })

    const saveProduct = () => {
        let data = {loan_type,min_amount,max_amount,interest,token}
        mutation.mutate(data)
    };


    const updateMutation = useMutation({mutationFn:returnLoan,onSuccess:(data)=>{
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Deposited successfully successfully', life: 3000 });
        client.invalidateQueries("report")
    }})

    const updateProduct = () =>{
        let data = {amount:product.amount,loan:product.id,customer:product.customer.id,token}
        // alert(JSON.stringify(data))
        // return;
        updateMutation.mutate(data)
        setEditProduct(false);

    }
    const editProduct = (product) => {
        setProduct(product);
        setLoanType(product.loan_type)
        setInterest(product.interest)
        setMinAmount(product.interest)
        setMaxAmount(product.max_amount)

        setProductDialog(true);
        setEditProduct(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };


    const confirmDisburseProduct = (product) => {
        setProduct(product);
        setDisturbsedDialog(true);
    };



    const deleteMutation = useMutation({mutationFn:updateLoan,
        onSuccess:(data)=>{
        client.invalidateQueries("loans")

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Loan Updated sucessfully', life: 3000 });
    }})

    const disburseMutation = useMutation({mutationFn:updateLoan,
        onSuccess:(data)=>{
            client.invalidateQueries("loans")
    
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Loan Updated sucessfully', life: 3000 });
        }})

    const deleteProduct = () => {
        const data ={...product,customer:product.customer.id,status,token}
        if(!product.reason){
            return;
        }
        deleteMutation.mutate(data)
        setDeleteProductDialog(false);
    };


    const disburseProduct = () => {
        const data ={...product,customer:product.customer.id,status,token}

       if(!product.amount_disbursed){
            return;
       }

        disburseMutation.mutate(data)
        setDisturbsedDialog(false);
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
        let _products = products.filter((val) => !selectedProducts.includes(val));

        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        let _product = { ...product };

        if(+e.value > +product?.amount){
            setMessage("you can not exceed requested amount")
            return;
        }else{
            setMessage("")
            const val = e.value || 0;
        
            _product[`${name}`] = val;

            setProduct(_product);
        }

        
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

    const maxBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    };

    const minBodyTemplate = (rowData) => {
        return formatCurrency(rowData.min_amount);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={rowData.status=='pending'?'warning':rowData.status=='Canceled'?'danger':'success'}>{rowData.status}</Tag>;
    };


    // 

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/* <Button icon="pi pi-pencil" rounded outlined className="mr-2" 
                tooltip="Edit user" 
                tooltipOptions={{ position: 'top' }}
                onClick={() => editProduct(rowData)} /> */}

                <Button icon="pi pi-times-circle" disabled={rowData.status=='Canceled'?true:false} tooltip="Cancel Loan" tooltipOptions={{ position: 'top' }} rounded outlined severity="danger" onClick={() => {setProduct(rowData),setStatus("Canceled"),confirmDeleteProduct(rowData)}} />
                <Button icon="pi pi-check-circle"  className="mx-2" disabled={rowData.status=='Canceled'?true:false} tooltip="Approve Loan" tooltipOptions={{ position: 'top' }}  rounded outlined severity="success" onClick={() => {setProduct(rowData),setStatus("Approved"),confirmDisburseProduct(rowData)}} />
                {rowData.status=='Approved' && 
                    <Button label='Deposit' className='ml-2' tooltip="Deposit Return" tooltipOptions={{ position: 'top' }} rounded outlined severity="success" onClick={() => {setProduct(rowData),setProductDialog(true)}} />
                }
                {rowData.status=='Approved' && 

                    <Link  className='mx-2' href={`/client-loan/${rowData.customer.id}`}>
                        <Button icon="pi pi-eye" tooltip="View client loans" tooltipOptions={{ position: 'top' }} className='ml-2' rounded outlined severity="success" />
                    </Link>

                }
                {rowData.status !='Approved' && 
                    <Link href={`/customer-details/${rowData.id}`}>
                        <Button icon="pi pi-eye" rounded outlined severity="success" tooltip="View client details"  />
                    </Link>
                }

            </React.Fragment>
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
            <h4 className="m-0">Manage Loans</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Submit" icon="pi pi-check" onClick={updateProduct} />
            
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Reject" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );


    const disburseProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Disburse" icon="pi pi-check" severity="success" onClick={disburseProduct} />
        </React.Fragment>
    );

    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

  return (
     <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <center>
                    {isLoading && <Spinner />}
                </center>

                <DataTable ref={dt} value={data?.results} 
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
                    <Column field="customer.first_name" header="First Name" frozen sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="customer.first_name" header="Middle Name"    style={{ minWidth: '16rem' }}></Column>
                    <Column field="customer.last_name" header="Last Name"    style={{ minWidth: '16rem' }}></Column>
                    <Column field="customer.phone_number" header="Phone Number"    style={{ minWidth: '16rem' }}></Column>
                    <Column field="amount" header="Amount" body={maxBodyTemplate}></Column>
                    <Column field="return_date" header="Return Date"  sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="status" header="Status"  body={statusBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '20rem' }}></Column>

                </DataTable>
            </div>

{/* add product */}
            <Dialog 
            visible={productDialog} 
            style={{ width: '32rem' }} 
            breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
            header="Deposit" modal className="p-fluid" 
            footer={productDialogFooter} 
            onHide={hideDialog}>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Amount
                    </label>
                    <InputText id="loan_type" 
                    value={product?.amount} 
                    name="loan_type"
                    onChange={(e) => onInputChange(e,'amount')} 
                    required autoFocus 
                    />
                </div>


            </Dialog>

            <RoleDialog visible={visible} setVisible={setVisible} />

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} 
                breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
                header="Confirm" modal 
                footer={deleteProductDialogFooter} 
                onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">

                    <div className='py-2 font-bold'>Enter reason for rejecting loan</div>
                    <InputTextarea
                        name="reason"
                        className='w-full'
                        value={product?.reason}
                        onChange={(e) => onInputChange(e,'reason')} 
                        placeholder='Enter reject reason'
                    />
                    <div>                    
                    </div>

                </div>
            </Dialog>



            <Dialog visible={disburseProductDialog} style={{ width: '32rem' }} 
                breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
                header="Confirm" modal 
                footer={disburseProductDialogFooter} 
                onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <div className='py-2 font-bold'>Amount Requested --- {formatCurrency(product?.amount)}</div>

                    <div className='p-invalid text-red-400'>{messsage}</div>
                    <div className='font-bold py-2'>Enter amount to disburse</div>
                    <InputNumber
                        name="amount_disburse"
                        className='w-full'
                        value={product?.amount_disbursed}

                        onChange={(e) => onInputNumberChange(e,'amount_disbursed')} 
                        placeholder='Enter Amount to disburse'

                    />
                    <div>                    
                    </div>

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

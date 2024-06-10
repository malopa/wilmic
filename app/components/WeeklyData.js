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
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import RoleDialog from './RoleDialog.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {addLoanType, deleteLoanType, readLogs, returnLoan, updateLoan, updateLoanType} from '../api/loan/api.js'
import { revalidateTag } from 'next/cache'
import { useTokenContext } from '../../context/TokenContext.js';
import {getLoanData} from '../api/data/getdata.js'
import Link from 'next/link.js';
        

export default function WeekDataTable(props) {

    const token = useTokenContext();
    const {isLoading,data} = useQuery({queryKey:['report'],queryFn:async ()=> await readLogs(token)})
    

    let emptyProduct = {
        id: null,
        amount: '',
        customer_id: null,
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
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };


   

    const client = useQueryClient()
    const mutation = useMutation({
        mutationFn:addLoanType,
        onSuccess:(data)=>{
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Loan added successfully', life: 3000 });
            // client.invalidateQueries("loans-types")
        }
    })

    const saveProduct = () => {
        let data = {loan_type,min_amount,max_amount,interest,token}
        mutation.mutate(data)
    };


    const updateMutation = useMutation({mutationFn:returnLoan,onSuccess:(data)=>{
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Status updated successfully', life: 3000 });

    }})

    const updateProduct = () =>{
        let data = {amount:product.amount,customer:product.customer.id,token}
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


    const deleteMutation = useMutation({mutationFn:updateLoan,
    onSuccess:(data)=>{
        client.invalidateQueries("loans")

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Loan Updated sucessfully', life: 3000 });
    }})

    const deleteProduct = () => {
        const data ={...product,customer:product.customer.id,status,token}
        // alert(JSON.stringify(data))
        // return;
        deleteMutation.mutate(data)
        setDeleteProductDialog(false);
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
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                {/* <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} /> */}
                {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
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
        return formatCurrency(rowData.debit);
    };

    const creditBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={rowData.status=='pending'?'warning':rowData.status=='Canceled'?'danger':'success'}>{rowData.status}</Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Link href={`preview-loan/${rowData.loan.id}`}>
                    <Button icon="pi pi-eye" 
                        rounded outlined 
                        className="mr-2" 
                        tooltip="Edit user" 
                        tooltipOptions={{ position: 'top' }}
                        />
                </Link>
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
            <h4 className="m-0"></h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            {/* <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} /> */}
            {/* <Button label="Submit" icon="pi pi-check" onClick={updateProduct} /> */}
            
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

  return (
     <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <center>
                    {/* {isLoading && <Spinner />} */}
                </center>

                {JSON.stringify(data)}
                <DataTable ref={dt} value={props.data} 
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
                    <Column field="date" header="Date"  sortable style={{ minWidth: '8rem' }}></Column>

                    <Column field="customer.first_name" header="First Name" frozen sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="customer.middle_name" header="Middle Name"    style={{ minWidth: '16rem' }}></Column>
                    <Column field="customer.last_name" header="Last Name"    style={{ minWidth: '16rem' }}></Column>
                    <Column field="customer.phone_number" header="Phone number"    style={{ minWidth: '16rem' }}></Column>
                    <Column field="amount" header="Amont"  body={creditBodyTemplate}    style={{ minWidth: '16rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '16rem' }}></Column>

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
                    <InputNumber id="loan_type" 
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
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to change loan status <b>{product.name}</b>?
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

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
import RoleDialog from './RoleDialog.js';
import Input from './Input.js';
import { getSession } from '../api/lib.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {addLoanType, deleteLoanType, updateLoanType} from '../api/loan/api.js'
import { revalidateTag } from 'next/cache'
        

export default function LoanTable(props) {

    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
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

    const [token,setToken] = useState()
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
        return (+value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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


    useEffect(()=>{
        getSession()
        .then(res=>{
            setToken(res?.access)
        })
    },[])

    const client = useQueryClient()
    const mutation = useMutation({
        mutationFn:addLoanType,
        onSuccess:(data)=>{
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Loan added successfully', life: 3000 });
            client.invalidateQueries("loans-types")
        }
    })

    const saveProduct = () => {
        let data = {loan_type,min_amount,max_amount,interest,token}
        mutation.mutate(data)
    };


    const updateMutation = useMutation({mutationFn:updateLoanType,onSuccess:(data)=>{
        alert(JSON.stringify(data))
    }})

    const updateProduct = () =>{
        let data = {id:product.id,loan_type,min_amount,max_amount,interest,token}
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


    const deleteMutation = useMutation({mutationFn:deleteLoanType,
    onSuccess:(data)=>{
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Loan Type Deleted', life: 3000 });
        client.invalidateQueries("loans-types")
        revalidateTag("loans")
    }})

    const deleteProduct = () => {
        deleteMutation.mutate({id:product.id,token})
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
        return formatCurrency(rowData.max_amount);
    };

    const minBodyTemplate = (rowData) => {
        return formatCurrency(rowData.min_amount);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" 
                tooltip="Edit user" 
                tooltipOptions={{ position: 'top' }}
                onClick={() => editProduct(rowData)} />

                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => {setProduct(rowData),confirmDeleteProduct(rowData)}} />
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
            <h4 className="m-0">Manage Loan Type</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            {isEditProduct?<Button label="Update" icon="pi pi-check" onClick={updateProduct} />:<Button label="Save" icon="pi pi-check" onClick={saveProduct} />}
            
            
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
                <DataTable ref={dt} value={props.loans} 
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
                    <Column field="loan_type" header="Loan Type"  style={{ minWidth: '200px' }} frozen sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="min_amount" header="Min Amount" body={minBodyTemplate}  sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="max_amount" header="Max Amount" body={maxBodyTemplate}></Column>
                    <Column field="interest" header="Interest"  sortable style={{ minWidth: '8rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                </DataTable>
            </div>

{/* add product */}
            <Dialog 
            visible={productDialog} 
            style={{ width: '32rem' }} 
            breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
            header="Loan Type Details" modal className="p-fluid" 
            footer={productDialogFooter} 
            onHide={hideDialog}>

                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Loan Type
                    </label>
                    <Input id="loan_type" 
                    value={loan_type} 
                    name="loan_type"
                    onChange={(e) => setLoanType(e.target.value)} 
                    required autoFocus 
                    />
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Minimun Amount
                    </label>
                    <Input id="min_amount" value={min_amount} name="min_amount" 
                    onChange={(e) => setMinAmount(e.target.value)} 
                    required />
                </div>


                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Max Amount
                    </label>
                    <Input id="description" value={max_amount} name="max_amount" 
                    onChange={(e) => setMaxAmount(e.target.value)} 
                    required />
                </div>

                <div className="field">
                    <label htmlFor="interest" className="font-bold">
                        Interest
                    </label>
                    <Input 
                    value={interest} 
                    name="interest" 
                    onChange={(e) => setInterest(e.target.value)} 
                    required />
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

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
import Stepper from './steps/index.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {addCustomer, deleteCustomers} from '../api/customer/api.js'
import { useTokenContext } from '../../context/TokenContext.js';
import { create, deleteData, getData, update } from '../api/tku/app.js';
import { BASE_URL } from '../api/base.js';
        
export default function CountryDataTable(props) {

    let emptyProduct = {
        id: null,
        name: '',
        description: '',
        
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
    const [currentStep,setCurrentStep] = useState(0)
    const [edit,setIsEdit] = useState(false)


    const toast = useRef(null);
    const dt = useRef(null);

    const {isLoading,data} = useQuery({queryKey:['countries'],queryFn:async ()=>getData({token,url:`${BASE_URL}api/v1/country/`})})


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
        setIsEdit(false)
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const queryClient =useQueryClient()
    const mutation  = useMutation({mutationFn:create,onSuccess:(data)=>{
        setDeleteProductsDialog(false);
        hideDialog()
        queryClient.invalidateQueries("countries")
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer added successfully', life: 3000 });

    }})
    const saveProduct = () => {
        
        const data = {...product,token,url:`${BASE_URL}api/v1/country/`}

        mutation.mutate(data)

       
    };


    const updateMutation  = useMutation({mutationFn:update,onSuccess:(data)=>{
        setDeleteProductsDialog(false);
        hideDialog()
        setIsEdit(false)
        queryClient.invalidateQueries("countries")
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer added successfully', life: 3000 });

    }})

    const updateProduct  = ()=>{
        const url = `${BASE_URL}api/v1/country/${product.id}/`
        const data = {...product,token,url
        }

        updateMutation.mutate(data)
    }


    const editProduct = (product) => {
        setProduct({ ...product });
        setIsEdit(true)
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const delMutation = useMutation({mutationFn:deleteData,onSuccess:(data)=>{
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer deleted successfully', life: 3000 });
        queryClient.invalidateQueries("countries")
        setDeleteProductDialog(false);

        setProduct(emptyProduct)
    }})

    const deleteProduct = () => {
        const data = {id:product.id,token,url:`${BASE_URL}api/v1/country/${product.id}/`}
        delMutation.mutate(data)
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
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
                
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
            <h4 className="m-0">Manage Country</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
           <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            {edit?<Button label="Update" icon={`pi pi-check`} onClick={updateProduct} />:
            <Button label="Save" icon={`pi ${mutation.isLoading?'pi-spin pi-spinner':'pi-check'}`} onClick={saveProduct} />
            }
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

  return (
     <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
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
                    <Column field="name" header="Name"  style={{ minWidth: '200px' }} frozen sortable ></Column>
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

                <div className="field mt-4">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText p={12} id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>

               

            </Dialog>


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

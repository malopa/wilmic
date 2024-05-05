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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {addUser, deleteUser, getGroups, updateUser} from '../api/user/api.js';
import { deleteLoanType } from '../api/loan/api.js';
import { revalidatePath } from 'next/cache.js';
import { useTokenContext } from '../../context/TokenContext.js';
import { getgroups } from 'process';
        

export default function CustomDatatable(props) {


    const {token} = useTokenContext()
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
    const [user, setUser] = useState({});

    const [first_name,setFirstName] = useState(product?.first_name)
    const [last_name,setLastName] = useState(product?.last_name)
    const [email,setEmail] = useState(product?.email)
    const [phone_number,setPhoneNumber] = useState(product?.phone_number)

    const toast = useRef(null);
    const dt = useRef(null);

    const {isLoading,data:groups} = useQuery({queryKey:['groups'],queryFn:async ()=> getGroups(token)})


    useEffect(()=>{
            setFirstName(product?.first_name)
            setLastName(product?.last_name)
            setEmail(product?.email)
            setPhoneNumber(product?.phone_number)
    },[product])



    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };


    const queryClient = useQueryClient()

    const mutation = useMutation({mutationFn:addUser,onSuccess:(data)=>{
        setProductDialog(false)
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User added successfully', life: 3000 });
        queryClient.invalidateQueries("users")
        setEmail("")
        setLastName("")
        setPhoneNumber("")
        setFirstName("")
        revalidatePath('/user')

    }})

    const updateMutation = useMutation({mutationFn:updateUser,onSuccess:(data)=>{
        alert(JSON.stringify(data))
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User updated successfully', life: 3000 });

    }})

    const delMutation = useMutation({mutationFn:deleteLoanType,
        onSuccess:(data)=>{
        // alert(JSON.stringify(data))
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    }})
    

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

    const saveProduct = () => {

        let data = {first_name,last_name,email,token,username:email};
        mutation.mutate(data);

    };

    const editProduct = (product) => {
        setProduct(product)

        setLastName(product?.last_name)
        setFirstName(product?.first_name)
        setEmail(product?.email)

        // setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        // let _products = products.filter((val) => val.id !== product.id);

        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        delMutation.mutate({id:product.id,token:token})
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
        delMutation.mutate(product.id,token)
        queryClient.invalidateQueries("users")
        // setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
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
                onClick={() => {editProduct(rowData),setProduct(rowData)}} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => {confirmDeleteProduct(rowData),setProduct(rowData)}} />
                <Button icon="pi pi-arrow-right-arrow-left" className='ml-2' rounded outlined 
                severity="danger" 
                tooltip="Assign user role" 
                tooltipOptions={{ position: 'top' }} 
                onClick={() => {setVisible(!visible),setUser(rowData)}} />
                
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
            <h4 className="m-0">Manage Users</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label={`Save`} icon="pi pi-check" onClick={saveProduct} />
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
                <DataTable ref={dt} value={props?.users} 
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
                    <Column field="first_name" header="Last Name"  frozen sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="last_name" header="First Name"   style={{ minWidth: '16rem' }}></Column>
                    <Column field="email" header="Email" ></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

                </DataTable>
            </div>

            {/* add user */}

            <Dialog 
                visible={productDialog} 
                style={{ width: '32rem' }} 
                breakpoints={{'960px':'75vw','641px':'90vw'}} 
                header="User Details" modal className="p-fluid" 
                footer={productDialogFooter} 
                onHide={hideDialog}>


                <div className="field">
                    <label htmlFor="first_name" className="font-bold">
                        First Name
                    </label>
                    <input type="hidden" value={token} name="token"/>
                    <Input id="" name="first_name" 
                     required autoFocus
                     placeholder="First name"
                     value={first_name}
                     onChange={(e)=>setFirstName(e.target.value)}
                     />
                </div>
                <div className="field">
                    <label htmlFor="last_name" className="font-bold">
                        Last Name
                    </label>
                    <Input name="last_name"  
                     placeholder="Enter Last name"
                     value={last_name}
                     onChange={(e)=>setLastName(e.target.value)}
                    id="last_name" 
                    required
                     />

                </div>

                <div className="field">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <Input name="email" 
                    placeholder="email address"
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                     />
                </div>


                <div className="field">
                    <label htmlFor="phone-number" className="font-bold">
                        Phone Number
                    </label>
                    <Input name="phone_number" 
                    placeholder="user phone number"
                    type="tel"
                    id="phone-number" value={phone_number}
                     onChange={(e) => setPhoneNumber(e.target.value)} 
                     required 
                      />
                </div>

            </Dialog>

            <RoleDialog user={user} groups={groups}  visible={visible} setVisible={setVisible} />

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

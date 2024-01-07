import React, { useState, useEffect } from 'react';
import { useDeleteEmployeeMutation, useGetAllEmployeeQuery, useGetCategoryQuery, useGetDepartmentQuery, useGetProductsQuery, useUpdateEmployeeMutation } from './store/slices';
import { CommonModal } from './CommonModal';
import { RiEyeLine, RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';
import Pagination from './pagination/Pagination';
import { toast } from 'react-toastify';
import { capitalizeFirstLetter } from 'lib/common';
const Product = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const limit = 10
    const [totalPages, setTotalPages] = useState(1);
    const [updateEmployee] = useUpdateEmployeeMutation();
    const [deleteEmployee] = useDeleteEmployeeMutation();
    const [sortField, setSortField] = useState('location');
    const [sortOrder, setSortOrder] = useState('asc');
    const { data: depatmentOption } = useGetDepartmentQuery({
        page: currentPage,
        limit: limit,
    })
    const { data, error, isLoading, refetch } = useGetAllEmployeeQuery({
        page: currentPage,
        limit: limit,
        sortField: sortField,
        sortOrder: sortOrder,
    })
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        refetch()
    }, [sortField, sortOrder])

    useEffect(() => {
        if (data) {
            setProducts(data?.data?.employees)
            setTotalPages(Math.ceil(data?.data?.totalLength / 10))

        }
    }, [data])


    const openViewModal = (productId) => {
        const product = products.find((p) => p._id === productId);
        setSelectedProduct(product);
        setViewModalOpen(true);
    };

    const openUpdateModal = (productId) => {
        const product = products.find((p) => p._id === productId);
        setSelectedProduct(product);
        setUpdateModalOpen(true);
    };

    const closeModals = () => {
        setViewModalOpen(false);
        setUpdateModalOpen(false);
    };
    const handleView = (productId) => {
        const selectedProduct = products.find((product) => product._id === productId);
        setSelectedProduct(selectedProduct);
        openViewModal(productId);
    };

    const handleUpdate = (productId) => {
        const updatedProducts = products.map((product) =>
            product._id === productId ? { ...product, title: 'Updated Product' } : product
        );
        setProducts(updatedProducts);
        openUpdateModal(productId)
    };

    const handleDelete = async (productId) => {
        const updatedProducts = products.filter((product) => product._id !== productId);
        setProducts(updatedProducts);
        const res = await deleteEmployee(productId);
        if (res?.data) {
            toast.success('Employee deleted successfully')
        } else {
            toast.error('Error deleting employee');
        }
        refetch()
    };

    const handleInputChange = (e, field) => {
        const updatedProduct = { ...selectedProduct };
        updatedProduct[field] = e.target.value;
        setSelectedProduct(updatedProduct);
    };
    const handleUpdateEmployee = async () => {
        const res = await updateEmployee({ id: selectedProduct?._id, data: selectedProduct })
        if (res?.data) {
            toast.success('Employee updated successfully')
            closeModals()
        } else {
            toast.error('Error updating employee')
        }
        refetch()
    }

    const handleSort = (field) => {
        if (field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };
    const renderSortArrow = (field) => {
        if (field == sortField) {
            return sortOrder == 'asc' ? '↑' : '↓';
        }
        return null;
    };
    return (
        <>
            <div className="container mx-auto p-4">
                <table className="min-w-full bg-white border border-gray-300 rounded">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Employee Name</th>
                            <th className="py-2 px-4 border-b text-left">Employee Email</th>
                            <th className="py-2 px-4 border-b text-left">
                                <div className="flex items-center">
                                    Employee Location
                                    <button className='ml-2' onClick={() => handleSort('location')}>
                                        {renderSortArrow('location')}
                                    </button>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b text-left">Department</th>
                            <th className="py-2 px-4 border-b text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.length > 0 && products?.map((employee) => (
                            <tr key={employee?._id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b text-left">{employee?.name}</td>
                                <td className="py-2 px-4 border-b text-left">{employee?.email}</td>
                                <td className="py-2 px-4 border-b text-left">{employee?.location}</td>
                                <td className="py-2 px-4 border-b text-left">{employee?.department?.name ?? '-'}</td>
                                <td className="py-2 px-4 border-b text-left gap-2 flex">
                                    <button onClick={() => handleView(employee._id)}>
                                        <RiEyeLine className="text-blue-700" />
                                    </button>
                                    <button onClick={() => handleUpdate(employee._id)}>
                                        <RiPencilLine className="text-orange-500" />
                                    </button>
                                    <button onClick={() => handleDelete(employee._id)}>
                                        <RiDeleteBinLine className="text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
            <CommonModal
                isOpen={isViewModalOpen}
                onClose={closeModals}
                title="Employee Details"
                content={
                    selectedProduct && (
                        <>
                            <p>ID: {selectedProduct._id}</p>
                            <p>Name: {selectedProduct.name}</p>
                            <p>Email: {selectedProduct.email}</p>
                            <p>Department: {selectedProduct.department?.name}</p>
                        </>
                    )
                }
            />
            <CommonModal
                isOpen={isUpdateModalOpen}
                onClose={closeModals}
                title="Update Employee"
                content={
                    selectedProduct && (
                        <form onSubmit={() => handleUpdateEmployee()}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                                    Employee Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={selectedProduct.name}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                    className="mt-1 p-2 border rounded-md w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                                    Employee Email
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    value={selectedProduct.email}
                                    className="mt-1 p-2 border rounded-md w-full"
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <div className="mb-2 text-lg text-black/50">Department</div>
                                <select
                                    value={selectedProduct.department}
                                    onChange={(e) => handleInputChange(e, 'department')}
                                    className={`border-gray w-full rounded-3xl border-2 border-solid px-3 py-2 text-lg`}
                                >
                                    <option value={''}>{'Select option'}</option>
                                    {depatmentOption?.data?.departments?.length > 0 && depatmentOption?.data?.departments?.map((item, index) => {
                                        return (
                                            <>
                                                <option key={index} value={item?._id}>{capitalizeFirstLetter(item?.name)}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                Update
                            </button>
                        </form>
                    )
                }
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                    setCurrentPage(page)
                }}
            />
        </>
    );
};

export default Product;

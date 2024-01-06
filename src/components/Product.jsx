import React, { useState, useEffect } from 'react';
import { useGetAllEmployeeQuery, useGetCategoryQuery, useGetProductsQuery } from './store/slices';
import { CommonModal } from './CommonModal';
import { RiEyeLine, RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';
const Product = () => {
    const { data } = useGetAllEmployeeQuery();
    const { data: categoryData } = useGetCategoryQuery();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (data) {
            setProducts(data)
        }
    }, [data])



    const [filteredProducts, setFilteredProducts] = useState(products);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openViewModal = (productId) => {
        const product = data.find((p) => p._id === productId);
        setSelectedProduct(product);
        setViewModalOpen(true);
    };

    const openUpdateModal = (productId) => {
        const product = products.find((p) => p.id === productId);
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

    const handleDelete = (productId) => {
        const updatedProducts = products.filter((product) => product._id !== productId);
        setProducts(updatedProducts);
    };

    // useEffect(() => {
    //     const filteredData = products.filter(
    //         (product) =>
    //             product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    //             (selectedCategory === 'All' || product.category === selectedCategory)
    //     );
    //     setFilteredProducts(filteredData);
    // }, [searchTerm, selectedCategory, products]);
    console.log("sss", selectedProduct)
    return (
        <>
            <div className="container mx-auto p-4">
                <input
                    type="text"
                    placeholder="Search Product"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 mb-4 border rounded"
                />

                {/* <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-2 mb-4 border rounded"
                >
                    <option value="All">All Categories</option>
                    {categoryData?.map((item, index) => {
                        return (
                            <option value={item} key={index}>{item?.toUpperCase()}</option>
                        )
                    })}
                </select> */}

                <table className="min-w-full bg-white border border-gray-300 rounded">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Employee Name</th>
                            <th className="py-2 px-4 border-b">Employee Email</th>
                            <th className="py-2 px-4 border-b">Employee Location</th>
                            <th className="py-2 px-4 border-b">Department</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((employee) => (
                            <tr key={employee?._id} className="hover:bg-gray-100">
                                <td className="py-2 px-8 border-b text-center">{employee?.name}</td>
                                <td className="py-2 px-4 border-b text-center">{employee?.email}</td>
                                <td className="py-2 px-4 border-b text-center">{employee?.location}</td>
                                <td className="py-2 px-4 border-b text-center">{employee?.department?.name}</td>
                                <td className="py-2 px-4 border-b text-center gap-2 flex">
                                    <button
                                        onClick={() => handleView(employee._id)}
                                    >
                                        <RiEyeLine className="text-blue-700" />
                                    </button>
                                    <button
                                        onClick={() => handleUpdate(employee._id)}
                                    >
                                        <RiPencilLine className="text-orange-500" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(employee._id)}
                                    >
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
                title="Product Details"
                content={
                    selectedProduct && (
                        <>
                            <p>ID: {selectedProduct._id}</p>
                            <p>Namw: {selectedProduct.name}</p>
                            <p>Email: {selectedProduct.email}</p>
                            <p>Department: {selectedProduct.department?.name}</p>
                        </>
                    )
                }
            />
            <CommonModal
                isOpen={isUpdateModalOpen}
            //     onClose={closeModals}
            //     title="Update Product"
            //     content={
            //         selectedProduct && (
            //             <form onSubmit={() => closeModals()}>
            //                 <div className="mb-4">
            //                     <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            //                         Product Title
            //                     </label>
            //                     <input
            //                         type="text"
            //                         id="title"
            //                         name="title"
            //                         value={selectedProduct.title}
            //                         onChange={(e) => handleInputChange(e, 'title')}
            //                         className="mt-1 p-2 border rounded-md w-full"
            //                     />
            //                 </div>
            //                 <div className="mb-4">
            //                     <label htmlFor="price" className="block text-sm font-medium text-gray-600">
            //                         Product Price
            //                     </label>
            //                     <input
            //                         type="text"
            //                         id="price"
            //                         name="price"
            //                         value={selectedProduct.price}
            //                         onChange={(e) => handleInputChange(e, 'price')}
            //                         className="mt-1 p-2 border rounded-md w-full"
            //                     />
            //                 </div>
            //                 <div className="mb-4">
            //                     <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            //                         Product Description
            //                     </label>
            //                     <textarea
            //                         id="description"
            //                         name="description"
            //                         value={selectedProduct.description}
            //                         onChange={(e) => handleInputChange(e, 'description')}
            //                         className="mt-1 p-2 border rounded-md w-full"
            //                     />
            //                 </div>
            //                 <div className="mb-4">
            //                     <label htmlFor="category" className="block text-sm font-medium text-gray-600">
            //                         Product Category
            //                     </label>
            //                     <input
            //                         type="text"
            //                         id="category"
            //                         name="category"
            //                         value={selectedProduct.category}
            //                         onChange={(e) => handleInputChange(e, 'category')}
            //                         className="mt-1 p-2 border rounded-md w-full"
            //                     />
            //                 </div>
            //                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            //                     Update
            //                 </button>
            //             </form>
            //         )

            />
        </>
    );
};

export default Product;

// DepartmentPage.js
import CustomModal from 'components/CustomModal';
import Pagination from 'components/pagination/Pagination';
import { ProductApi, useCreateDepartmentMutation, useDeleteDepartmentMutation, useGetDepartmentQuery, useUpdateDepartmentMutation } from 'components/store/slices';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const DepartmentPage = () => {
    const [departments, setDepartments] = useState([]);
    const managerid = JSON.parse(localStorage.getItem('RoleInfo'))?.roleId
    const dispatch = useDispatch()
    const [newDepartment, setNewDepartment] = useState({ name: '', description: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState(null);
    const [updateDepartment] = useUpdateDepartmentMutation();
    const [deleteDepartment] = useDeleteDepartmentMutation();
    const [createDepartment] = useCreateDepartmentMutation();
    const openModal = () => {
        setIsModalOpen(true);
    };
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    const limit = 10
    const [totalPages, setTotalPages] = useState(1)
    const { data, error, isLoading, refetch } = useGetDepartmentQuery({
        page: currentPage,
        limit: limit,
    })

    const closeModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        if (data) {
            setDepartments(data?.data?.departments);
            setTotalPages(Math.ceil(data?.data?.totalLength / 10))
        }
    }, [data])
    const handleInputChange = (e) => {
        setNewDepartment({
            ...newDepartment,
            [e.target.name]: e.target.value,
        });
    };
    const handleEditClick = (department) => {
        setEditingDepartment(department);
        setNewDepartment({
            name: department.name,
            description: department.description,
        });
        openModal();
    };

    const handleDeleteClick = async (departmentId) => {
        try {
            await deleteDepartment(departmentId)
            refetch()
        } catch (error) {
            console.error('Error deleting department:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingDepartment) {
                await updateDepartment({ id: editingDepartment?._id, data: newDepartment })
            } else {
                let payload = {
                    ...newDepartment,
                    managerId: managerid
                }
                await createDepartment(payload)
            }
            closeModal();
            refetch()
            setNewDepartment({})
        } catch (error) {
            console.error('Error creating/editing department:', error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <div className='py-6' style={{ display: 'flex', justifyContent: "space-between", flexFlow: "row", alignItems: 'center' }}>
                <h1 className="text-2xl font-bold mb-4">Manage Departments</h1>
                <button
                    onClick={openModal}
                    className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-700 focus:outline-none"
                >
                    Create New Department
                </button>
            </div>
            
            <div>
                <h2 className="text-xl font-bold mb-4">Existing Departments</h2>
                <ul>
                    {departments?.length > 0 && departments.map((department) => (
                        <li key={department._id} className="mb-4 border p-4 rounded">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-lg font-bold">{department.name}</h3>
                                    <p className="text-gray-600">{department.description}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleEditClick(department)}
                                        className="bg-yellow-500 text-white px-3 py-1 mb-2 rounded hover:bg-yellow-700 focus:outline-none mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(department._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex-1	justify-center'>
                <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
                    <h2 className="text-xl font-bold mb-4">
                        {editingDepartment ? 'Edit Department' : 'Create New Department'}
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <label className="mb-2 text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={newDepartment.name}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded focus:outline-none focus:border-blue-400"
                            required
                        />

                        <label className="mb-2 text-gray-600">Description</label>
                        <textarea
                            name="description"
                            value={newDepartment.description}
                            onChange={handleInputChange}
                            className="mb-4 p-2 border rounded focus:outline-none focus:border-blue-400"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
                        >
                            {editingDepartment ? 'Save Changes' : 'Create Department'}
                        </button>
                    </form>
                </CustomModal>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                        setCurrentPage(page)
                    }}
                />

            </div>
        </div>
    );
};

export default DepartmentPage;

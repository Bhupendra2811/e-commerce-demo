import { useGetAllEmployeeQuery, useGetDepartmentQuery } from 'components/store/slices';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    // const [totalDepartments, setTotalDepartments] = useState(0);
    // const [totalEmployees, setTotalEmployees] = useState(0);
    const { data: employee } = useGetAllEmployeeQuery({
        page: 1,
        limit: 10,
        search: ''
    })
    const { data } = useGetDepartmentQuery({
        page: 1,
        limit: 10,
    })


    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <div className="grid grid-cols-2 gap-4">
                {/* Card for Total Departments */}
                <a href='/departments'>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Total Departments</h2>
                    <p className="text-3xl font-extrabold text-indigo-600">{data?.data?.totalLength}</p>
                </div>
                </a>
                {/* Card for Total Employees */}
                <a href='/employees'> 
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Total Employees</h2>
                    <p className="text-3xl font-extrabold text-green-600">{employee?.data?.totalLength}</p>
                </div>
                </a>
            </div>
        </div>
    );
};

export default Dashboard;

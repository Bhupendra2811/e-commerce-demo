import { ProductApi, useGetEmployeeDetailByIdQuery } from 'components/store/slices';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const EmployeeDetailsPage = () => {
  const [userDetails, setUserDetails] = useState({})
  const user = JSON.parse(localStorage.getItem('userInfo'))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(ProductApi.endpoints.getEmployeeDetailById.initiate({
      id: user?._id
    }, { forceRefetch: true })).unwrap()
      .then(res => setUserDetails(res?.data))
  }, [user])


  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email:</label>
          <p className="text-lg font-semibold text-gray-800">{userDetails.email}</p>
        </div>
        {/* Add other details as needed */}
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;

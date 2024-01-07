import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Card from './Card';
import { useDispatch } from 'react-redux';
import { login, useGetAllRolesQuery, useLogInMutation, useSignUpMutation } from './store/slices';
import { toast } from 'react-toastify';
import { setUserToken } from 'config/auth.util';
import { capitalizeFirstLetter } from 'lib/common';

const registerContent = {
    linkUrl: "/signin",
    linkText: "Already have an account?",
    header: "Create a new Account",
    subheader: "Just a few things to get started",
    buttonText: "Register",
};

const signinContent = {
    linkUrl: "/register",
    linkText: "Don't have an account?",
    header: "Welcome Back",
    subheader: "Enter your credentials to access your account",
    buttonText: "Sign In",
};

const initial = { email: "", password: "", username: "", confirmPassword: '' };
const AuthForm = ({ mode }) => {
    const [formState, setFormState] = useState({ ...initial });
    const [errors, setErrors] = useState({ email: '', password: '', username: '', confirmPassword: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logIn] = useLogInMutation()
    const [signUp] = useSignUpMutation()

    const { data } = useGetAllRolesQuery()
    const validateForm = (mode) => {
        if (mode === 'register') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmailValid = emailRegex.test(formState.email);
            const isUserNameValid = formState.username.trim() !== '';
            const isPasswordValid = formState.password.length >= 6;
            const isConfirmPasswordValid = formState.password === formState.confirmPassword;

            setErrors((prevErrors) => ({
                ...prevErrors,
                email: isEmailValid ? '' : 'Invalid email address',
                username: isUserNameValid ? '' : 'User name is required',
                password: isPasswordValid ? '' : 'Password must be at least 6 characters',
                confirmPassword: isConfirmPasswordValid ? '' : 'Passwords do not match',
            }));
            return isEmailValid && isUserNameValid && isPasswordValid && isConfirmPasswordValid;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isEmailValid = emailRegex.test(formState.email);
            const isPasswordValid = formState.password.length >= 6;

            setErrors((prevErrors) => ({
                ...prevErrors,
                email: isEmailValid ? '' : 'Invalid email address',
                password: isPasswordValid ? '' : 'Password must be at least 6 characters',
            }));
            return isEmailValid && isPasswordValid;
        }
    };
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (validateForm(mode)) {
                if (mode === 'register') {
                    let res = await signUp({ ...formState })
                    if (res?.message) {
                        toast.error(res?.message)
                    } else {
                        toast.success('Successfully registered!');
                        navigate('/signin');
                    }
                }
                else {
                    let payload = {
                        email: formState.email,
                        password: formState.password
                    }
                    const res = await logIn(payload);

                    if (res?.message) {
                        toast.error(res?.message)
                    } else {
                        setUserToken(res?.data?.data?.token);
                        let role = { roleName: res?.data?.data?.userExists?.roleName, roleId: res?.data?.data?.userExists?.roleId }
                        localStorage.setItem('RoleInfo', JSON.stringify(role))
                        localStorage.setItem('userInfo', JSON.stringify(res?.data?.data?.userExists))
                        dispatch(login());
                        toast.success('Successfully logged in!');
                        if (res?.data?.data?.userExists?.roleName == 'manager') {
                            navigate("/dashboard");
                        } else {
                            navigate('/employeedetails');
                        }

                    }

                }
            }
        },
        [formState, mode, dispatch, navigate]
    );

    const content = mode === 'register' ? registerContent : signinContent;
    useEffect(() => {
        setFormState({ ...initial })
        setErrors({ ...initial })
    }, [mode])
    let OptionData = data && data?.role?.filter(item => item.name !== 'department');
    return (
        <>
            <Card className="m-auto w-126 text-center">
                <span>For demo: Email:c.bhupendra12@gmail.com Pass:Admin@12345</span>
            </Card>
            <div className="flex h-full items-center justify-center">
                <Card className="m-auto w-96 text-center">
                    <div>
                        <div className="text-center">
                            <h2 className="mb-2 text-3xl">{content.header}</h2>
                            <p className="tex-lg text-black/25">{content.subheader}</p>
                        </div>
                        <form onSubmit={handleSubmit} className="w-full py-6">
                            {mode === 'register' && (
                                <div className="mb-4">
                                    <div className="">
                                        <div className="mb-2 text-lg text-black/50">User Name</div>
                                        <input
                                            type='text'
                                            placeholder="User Name"
                                            value={formState.username}
                                            className={`border-gray w-full rounded-3xl border-2 border-solid px-3 py-2 text-lg ${errors.username ? 'border-red-500' : ''
                                                }`}
                                            onChange={(e) => setFormState((s) => ({ ...s, username: e.target.value }))}
                                        />
                                        {errors.username && <div className="text-red-500 text-sm">{errors.username}</div>}
                                    </div>
                                </div>
                            )}
                            <div className="mb-4">
                                <div className="mb-2 text-lg text-black/50">Email</div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formState.email}
                                    className={`border-gray w-full rounded-3xl border-2 border-solid px-3 py-2 text-lg ${errors.email ? 'border-red-500' : ''
                                        }`}
                                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                                    onBlur={() => validateForm(mode)}
                                />
                                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                            </div>
                            <div className="mb-4">
                                <div className="mb-2 text-lg text-black/50">Password</div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={formState.password}
                                    className={`border-gray w-full rounded-3xl border-2 border-solid px-3 py-2 text-lg ${errors.password ? 'border-red-500' : ''}`}
                                    onChange={(e) => {
                                        setFormState((s) => ({ ...s, password: e.target.value })),
                                            setErrors((p) => ({ ...p, password: '' }))
                                    }}
                                />
                                {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                            </div>
                            {mode === 'register' && (
                                <>
                                    <div className="mb-4">
                                        <div className="mb-2 text-lg text-black/50">Confirm Password</div>
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={formState.confirmPassword}
                                            className={`border-gray w-full rounded-3xl border-2 border-solid px-3 py-2 text-lg ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                            onChange={(e) => setFormState((s) => ({ ...s, confirmPassword: e.target.value }))}
                                        />
                                        {errors.confirmPassword && <div className="text-red-500 text-sm">{errors.confirmPassword}</div>}
                                    </div>
                                    <div className="mb-4">
                                        <div className="mb-2 text-lg text-black/50">Role</div>
                                        <select
                                            value={formState.roleId}
                                            onChange={(e) => setFormState((s) => ({ ...s, roleId: e.target.value }))}
                                            className={`border-gray w-full rounded-3xl border-2 border-solid px-3 py-2 text-lg`}
                                        >
                                            {OptionData?.length > 0 && OptionData.map((item, index) => {
                                                return (
                                                    <option key={index} value={item?._id}>{capitalizeFirstLetter(item?.name)}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </>
                            )}
                            <div className="flex items-center justify-between">
                                <div>
                                    <span>
                                        <Link to={content.linkUrl} className="font-bold text-blue-600">
                                            {content.linkText}
                                        </Link>
                                    </span>
                                </div>
                                <div>
                                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-3xl">
                                        {content.buttonText}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default AuthForm;
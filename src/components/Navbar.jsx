import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import logo from '../public/assets/Logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/slices';

const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const { isLoggedIn } = useSelector(state => state.AuthData);
    const dispatch = useDispatch()
    console.log("dssdfsfd", isLoggedIn)
    const userName = JSON.parse(localStorage.getItem('userInfo'))?.firstName;
    const role = JSON.parse(localStorage.getItem('RoleInfo'))?.roleName
    console.log('ssdsdsdsd', role)
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}

                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <a href='/'><img className="h-8 w-auto" src={logo} alt="Logo" /></a>

                                <div className="hidden sm:ml-6 sm:block">

                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div className='flex items-center  text-white gap-3 cursor-pointer'>
                                        {role === 'manager' && (
                                            <>
                                                <a href="/departments" className="mx-2">Departments</a>
                                                <a href="/employees" className="mx-2">All Employees</a>
                                            </>
                                        )}
                                        {!isLoggedIn ? <div>
                                            <a href='signin'>Sign In</a>
                                            <span>/</span>
                                            <a href='register'>Sign Up</a>
                                        </div> : <Menu.Button className="relative flex items-center align-middle gap-2 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                            <span >{userName}</span>
                                        </Menu.Button>}

                                    </div>
                                    {isLoggedIn && <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/signin"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        onClick={() => { localStorage.removeItem('userInfo'), dispatch(logout()) }}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>}
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

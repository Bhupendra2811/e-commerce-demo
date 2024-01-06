import localStoreUtil from "./localstore.util";

export const getToken = () => localStoreUtil.get_data("token");

export const setUserToken = (token) => localStoreUtil.store_data("token", token);

export const getAdminToken = () => localStoreUtil.get_data("Admintoken");

export const setAdminToken = (token) => localStoreUtil.store_data("Admintoken", token);

export const logoutT = () => {
    localStoreUtil.remove_data("token");
    return true;
};

export const isLoggedIn = () => {
    const token = getToken();
    return !!token;
};

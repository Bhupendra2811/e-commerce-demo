const localStoreUtil = {
    store_data: (key, data) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        }
    },

    get_data: (key) => {
        if (typeof window != "undefined") {
            const item = localStorage.getItem(key);

            if (!item) return;

            return JSON.parse(item);
        }
    },

    remove_data: (key) => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(key);
            return true;
        }
    },

    remove_all: () => {
        if (typeof window !== "undefined") {
            localStorage.clear();
            return true;
        }
    },
};

export default localStoreUtil;

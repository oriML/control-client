import React from 'react'

function useLocalStorage() {

    function SetItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function GetItem(key: string) {
        return JSON.parse(localStorage.getItem(key) || '{}');
    }

    function RemoveItem(key: string) {
        localStorage.removeItem(key);
    }

    return { SetItem, GetItem, RemoveItem }
}

export default useLocalStorage;
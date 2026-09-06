// resources/js/Components/Toast.jsx
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Toast() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
        if (flash.warning) {
            toast(flash.warning, { icon: '⚠️' });
        }
        if (flash.info) {
            toast(flash.info, { icon: 'ℹ️' });
        }
    }, [flash]);

    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
            }}
        />
    );
}

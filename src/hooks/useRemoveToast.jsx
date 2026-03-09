import React from 'react';
import Swal from 'sweetalert2';

const useRemoveToast = () => {

    const removeToast = Swal.mixin({
        toast: true,
        position: 'bottom-end', // Usually near the cart summary
        showConfirmButton: false,
        timer: 1000,
        background: '#ffefef', // Light red background
        color: '#d33'          // Red text
    });

    return removeToast
};

export default useRemoveToast;
import React, { useState } from 'react';

const useAction = () => {
    const [loading, setLoading] = useState(false)

    return { loading, setLoading }
};

export default useAction;
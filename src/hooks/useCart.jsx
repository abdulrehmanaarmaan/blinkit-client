import React, { useMemo } from 'react';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {

    const instance = useAxios()

    const { data: cart = [], refetch } = useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const result = await instance.get('/cart')
            return result?.data
        }
    })

    const subTotal = useMemo(() => cart.reduce((acm, product) => acm + (product?.price * product?.quantity),
        0), [cart])

    const cartCount = useMemo(() => cart.reduce((acm, product) => acm + product?.quantity, 0), [cart])

    const threshold = 15.00; // The amount needed for free delivery 
    const deliveryCharge = subTotal >= threshold ? 0 : 2.50;

    return { cart, refetch, instance, subTotal, cartCount, deliveryCharge };
};

export default useCart;
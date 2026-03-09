import { CartContext } from './CartContext';
import useCart from '../hooks/useCart';

const CartProvider = ({ children }) => {

    const { cart, refetch, subTotal, cartCount, instance, isLoading } = useCart()

    return (
        <CartContext value={{ cart, refetch, subTotal, cartCount, instance, isLoading }}>
            {children}
        </CartContext>
    )
};

export default CartProvider;
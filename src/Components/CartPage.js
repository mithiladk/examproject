import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem, removeFromCart } from '../Redux/CoinSlice';
import {
    Box,
    Typography,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.Coin);

    // Handle quantity update
    const handleUpdateQuantity = (coin, quantity) => {
        if (quantity > 0) {
            dispatch(updateCartItem({ id: coin.id, quantity }));
        } else {
            handleRemoveItem(coin); // If quantity is 0 or less, remove the item
        }
    };

    // Remove item from cart
    const handleRemoveItem = (coin) => {
        dispatch(removeFromCart({ id: coin.id }));
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Your Cart</Typography>
            {cart.length === 0 ? (
                <Typography variant="h6">Your cart is empty.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Product</strong></TableCell>
                                <TableCell><strong>Price</strong></TableCell>
                                <TableCell><strong>Quantity</strong></TableCell>
                                <TableCell><strong>Total</strong></TableCell>
                                <TableCell><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((coin) => (
                                <TableRow key={coin.id}>
                                    <TableCell>{coin.name}</TableCell>
                                    <TableCell>{`$${parseFloat(coin.priceUsd).toFixed(2)}`}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleUpdateQuantity(coin, coin.quantity - 1)}>
                                            <RemoveIcon />
                                        </IconButton>
                                        {coin.quantity}
                                        <IconButton onClick={() => handleUpdateQuantity(coin, coin.quantity + 1)}>
                                            <AddIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{`$${(coin.priceUsd * coin.quantity).toFixed(2)}`}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleRemoveItem(coin)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default CartPage;

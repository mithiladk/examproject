import React, { useEffect, useState } from 'react'; 
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    TextField,
    Button,
    IconButton,
    Badge,
    TableSortLabel
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CoinModal from './CoinModal';
import { useDispatch, useSelector } from 'react-redux';
import { coinsList, resetCoins, addToCart, removeFromCart } from '../Redux/CoinSlice';
import { useNavigate } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const CoinsTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { coinApp, cart, loading, error } = useSelector((state) => state.Coin);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coinsData, setCoinsData] = useState([]);

    useEffect(() => {
        dispatch(coinsList());
    }, [dispatch]);

    useEffect(() => {
        setCoinsData(coinApp);
    }, [coinApp]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleAddToCart = (coin) => {
        dispatch(addToCart({ ...coin, quantity: 1 }));
    };

    const handleIncreaseQuantity = (coin) => {
        const existingItem = cart.find((item) => item.id === coin.id);
        if (existingItem) {
            dispatch(addToCart({ ...coin, quantity: existingItem.quantity + 1 }));
        }
    };

    const handleDecreaseQuantity = (coin) => {
        const existingItem = cart.find((item) => item.id === coin.id);
        if (existingItem && existingItem.quantity > 1) {
            dispatch(addToCart({ ...coin, quantity: existingItem.quantity - 1 }));
        } else {
            dispatch(removeFromCart(coin.id));
        }
    };

    const handleRowClick = (coin) => {
        setSelectedCoin(coin);
        setIsModalOpen(true);
    };

    const handleCloseModal = (updatedCoin) => {
        setIsModalOpen(false);
        if (updatedCoin) {
            setCoinsData((prevCoins) =>
                prevCoins.map((coin) => (coin.id === updatedCoin.id ? updatedCoin : coin))
            );
        }
        setSelectedCoin(null);
    };

    const handleCartRedirect = () => {
        navigate('/cart');
    };

    const filteredCoins = coinsData.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedCoins = [...filteredCoins].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleRefresh = () => {
        dispatch(resetCoins());
        dispatch(coinsList());
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Typography
                variant="h4"
                sx={{ mb: 3, fontFamily: 'Verdana, sans-serif', fontWeight: 'bold', color: '#333' }}
            >
                Cryptocurrency List
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <TextField
                    label="Search by Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ width: '300px' }}
                />
                <IconButton onClick={handleCartRedirect} sx={{ color: '#333' }}>
                    <Badge badgeContent={cart.length} color="secondary">
                        <ShoppingCartIcon fontSize="large" />
                    </Badge>
                </IconButton>
            </Box>

            <Button
                variant="contained"
                onClick={handleRefresh}
                sx={{ mb: 2, backgroundColor: '#86654B', '&:hover': { backgroundColor: '#A0522D' } }}
            >
                Refresh
            </Button>

            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">Failed to load data: {error}</Typography>}

            {!loading && !error && sortedCoins.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell onClick={() => handleSort('rank')} style={{ cursor: 'pointer' }}>
                                    <TableSortLabel
                                        active={sortConfig.key === 'rank'}
                                        direction={sortConfig.direction}
                                        IconComponent={sortConfig.direction === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
                                    >
                                        <strong>Rank</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                                    <TableSortLabel
                                        active={sortConfig.key === 'name'}
                                        direction={sortConfig.direction}
                                        IconComponent={sortConfig.direction === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
                                    >
                                        <strong>Name</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell onClick={() => handleSort('symbol')} style={{ cursor: 'pointer' }}>
                                    <TableSortLabel
                                        active={sortConfig.key === 'symbol'}
                                        direction={sortConfig.direction}
                                        IconComponent={sortConfig.direction === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
                                    >
                                        <strong>Symbol</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell onClick={() => handleSort('priceUsd')} style={{ cursor: 'pointer' }}>
                                    <TableSortLabel
                                        active={sortConfig.key === 'priceUsd'}
                                        direction={sortConfig.direction}
                                        IconComponent={sortConfig.direction === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
                                    >
                                        <strong>Price (USD)</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell onClick={() => handleSort('marketCapUsd')} style={{ cursor: 'pointer' }}>
                                    <TableSortLabel
                                        active={sortConfig.key === 'marketCapUsd'}
                                        direction={sortConfig.direction}
                                        IconComponent={sortConfig.direction === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon}
                                    >
                                        <strong>Market Cap (USD)</strong>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <strong>Actions</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedCoins.map((coin) => (
                                <TableRow key={coin.id}>
                                    <TableCell>{coin.rank}</TableCell>
                                    <TableCell>{coin.name}</TableCell>
                                    <TableCell>{coin.symbol}</TableCell>
                                    <TableCell>{`$${parseFloat(coin.priceUsd).toFixed(2)}`}</TableCell>
                                    <TableCell>{`$${parseFloat(coin.marketCapUsd).toLocaleString()}`}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleRowClick(coin)}
                                            sx={{ marginRight: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        {cart.some((item) => item.id === coin.id) ? (
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <IconButton
                                                    sx={{ color: '#ff5722', padding: '5px' }}
                                                    onClick={() => handleDecreaseQuantity(coin)}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography sx={{ marginX: 1 }}>
                                                    {cart.find((item) => item.id === coin.id)?.quantity}
                                                </Typography>
                                                <IconButton
                                                    sx={{ color: '#4caf50', padding: '5px' }}
                                                    onClick={() => handleIncreaseQuantity(coin)}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        ) : (
                                            <Button variant="contained" onClick={() => handleAddToCart(coin)}>
                                                Add to Cart
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <CoinModal
                open={isModalOpen}
                onClose={handleCloseModal}
                selectedCoin={selectedCoin}
            />
        </Box>
    );
};

export default CoinsTable;

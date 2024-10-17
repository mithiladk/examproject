import React, { useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,Grid
} from '@mui/material';

const CoinModal = ({ open, onClose, selectedCoin }) => {
    const [coin, setCoin] = useState({});

    useEffect(() => {
        if (selectedCoin) {
            setCoin(selectedCoin);
        }
    }, [selectedCoin]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCoin({ ...coin, [name]: value });
    };

    const handleSave = () => {
        onClose(coin); 
    };

    const handleClose = () => {
        onClose(null); 
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ 
                padding: 4, 
                backgroundColor: 'white', 
                borderRadius: 2, 
                maxWidth: 400, 
                margin: 'auto', 
                mt: '10%', 
            }}>
                <Typography variant="h6" component="h2">
                    Edit Coin
                </Typography>
                <TextField
                    label="Name"
                    name="name"
                    value={coin.name || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Symbol"
                    name="symbol"
                    value={coin.symbol || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Price (USD)"
                    name="priceUsd"
                    type="number"
                    value={coin.priceUsd || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Market Cap (USD)"
                    name="marketCapUsd"
                    type="number"
                    value={coin.marketCapUsd || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <Button 
                            variant="contained" 
                            onClick={handleSave} 
                            fullWidth
                        >
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button 
                            variant="outlined" 
                            onClick={handleClose} 
                            fullWidth
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default CoinModal;

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";

const Orderfood = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [cart, setCart] = useState({ items: [] });

    function addToCart(id, name, price) {
        setCart((prev) => ({
            ...prev,
            items: [
                ...prev.items,
                {
                    foodItemId: id,
                    name: name,
                    price: price,
                    quantity: 1,
                },
            ],
        }));
    }

    useEffect(() => {
        console.log(cart);
    }, [cart]);

    const fetchAll = () => {
        axios.get("http://localhost:3000/fooditems").then((res) => {
            console.log(res.data);
            setFoodItems(res.data);
        });
    };

    const confirmOrder = () => {
        axios
            .post("http://localhost:3000/orders", {
                ...cart,
            })
            .then((res) => {
                console.log(res.data);
                setmsg("Order placed");
                setErr(null);
            })
            .catch((e) => {
                setErr("Failed. Try Again!");
                setmsg(null);
            });
    };

    const [msg, setmsg] = useState();
    const [err, setErr] = useState();
    useEffect(() => {
        fetchAll();
    }, []);
    return (
        <Box display={"flex"}>
            <Box p={3} flex={"3"}>
                <Typography mb={3}>Digital Menu</Typography>

                <Grid container spacing={2}>
                    {foodItems.map((food, idx) => (
                        <Grid item key={idx} xs={2}>
                            <Card elevation={5} sx={{ p: 2 }}>
                                <Box
                                    display={"flex"}
                                    justifyContent={"space-between"}
                                    mb={3}
                                >
                                    <Typography>{food.name}</Typography>
                                    <Typography>rs.{food.price}</Typography>
                                </Box>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() =>
                                        addToCart(
                                            food._id,
                                            food.name,
                                            food.price
                                        )
                                    }
                                >
                                    Add to Cart{" "}
                                </Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box
                p={2}
                flex={"1"}
                display={"flex"}
                justifyContent={"space-between"}
                flexDirection={"column"}
                bgcolor={"#e7e7e7"}
                minHeight={"70vh"}
                borderLeft={"1px solid #b3b3b3"}
            >
                <Typography mb={1}>Your Cart</Typography>
                <Divider />
                <Box p={2}>
                    {cart.items?.map((item, idx) => (
                        <Box
                            p={1}
                            display={"flex"}
                            justifyContent={"space-between"}
                        >
                            <Typography>{item.name}</Typography>
                            <Typography>Rs.{item.price}</Typography>
                        </Box>
                    ))}
                </Box>
                <Divider />
                <Box
                    px={3}
                    py={2}
                    display={"flex"}
                    justifyContent={"space-between"}
                >
                    <Typography>Total</Typography>
                    <Typography>
                        Rs.
                        {cart.items.reduce(
                            (accumulator, item) => accumulator + item.price,
                            0
                        )}
                    </Typography>
                </Box>

                <TextField
                    sx={{ mt: "auto" }}
                    type="number"
                    label="Table No"
                    fullWidth
                    onChange={(e) =>
                        setCart((prev) => ({
                            ...prev,
                            tableNo: e.target.value,
                        }))
                    }
                />
                {msg && (
                    <Alert sx={{ mt: 3 }} severity="success">
                        {msg}
                    </Alert>
                )}
                {err && (
                    <Alert sx={{ mt: 3 }} severity="error">
                        {err}
                    </Alert>
                )}
                <Button
                    variant="contained"
                    sx={{ mt: 1 }}
                    fullWidth
                    onClick={() => confirmOrder()}
                >
                    Confirm Order
                </Button>
            </Box>
        </Box>
    );
};

export default Orderfood;

import { Box, Card, Grid, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const login = () => {
    const [user, setuser] = useState({
        email: "",
        password: "",
    });

    const auth = useAuth();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/login", {
                ...user,
            })
            .then((res) => {
                console.log(res.data);
                localStorage.setItem('user',JSON.stringify({...res.data.user}));
                auth.setuser((prev) => ({ ...prev, ...res.data.user }));
                navigate('/')
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setuser((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={"100vh"}
        >
            <Card
                elevation={5}
                sx={{ p: 5, width: { xs: "100%", sm: "30rem" } }}
            >
                <Typography variant="h5">Welcome Again 👋</Typography>
                <Typography variant="caption">
                    Fill the details to login
                </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Email"
                                name="email"
                                required
                                value={user.email}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Password"
                                type="password"
                                name="password"
                                required
                                value={user.password}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={6} />
                        <Grid item xs={6}>
                            <Button variant="contained" fullWidth type="submit">
                                Log In
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <Typography textAlign={"center"} mt={3} variant="body2">
                    Don't have an account?<Link to="/register">Regster</Link>
                </Typography>
            </Card>
        </Box>
    );
};

export default login;

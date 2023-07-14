import { Box, Card, Grid, TextField, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Singup = () => {
    const [user, setuser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/signup", {
            ...user,
        }).then(res=>{
            console.log(res.data)
        }).catch(e=>{
            console.error(e.response.data)
        })
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
            p={3}
        >
            <Card
                elevation={5}
                sx={{ p: 5, width: { xs: "100%", sm: "30rem" } }}
            >
                <Typography variant="h5">
                    Welcome to Our Resturant 🚀
                </Typography>
                <Typography variant="caption">
                    Fill the details to register
                </Typography>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Name"
                                name="name"
                                required
                                value={user.name}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
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
                                required
                                name="password"
                                value={user.password}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Confirm Password"
                                type="password"
                                required
                                name="confirmPassword"
                                value={user.confirmPassword}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth type="submit">
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Typography textAlign={"center"} mt={3} variant="body2">
                    Already have an account?<Link to="/login">login</Link>
                </Typography>
            </Card>
        </Box>
    );
};

export default Singup;

import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Home = () => {
    const auth = useAuth();

    return (
        <Box padding={2}>
            <Typography variant="h5">
                Welcome to our resturant {auth.user?.name}
            </Typography>
            <Grid container sx={{ mt: 2 }} spacing={2}>
                <Grid item>
                    <Link to={"/reservation"}>
                        <Card
                            elevation={5}
                            sx={{
                                padding: 5,
                                bgcolor: "#DA70D6",
                                cursor: "pointer",
                            }}
                        >
                            <Typography>Book a Table</Typography>
                        </Card>
                    </Link>
                </Grid>
                <Grid item>
                    <Link to={"/order"}>
                        <Card
                            elevation={5}
                            sx={{
                                padding: 5,
                                bgcolor: "#4169E1",
                                cursor: "pointer",
                            }}
                        >
                            <Typography>Order Food</Typography>
                        </Card>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;

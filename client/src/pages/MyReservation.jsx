import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Button,
    Card,
    Chip,
    Container,
    Divider,
    Grid,
    Icon,
    Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const MyReservation = () => {
    const navigate = useNavigate();
    const [reservations, setreservations] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        if (auth.user == null) navigate("/");
        else {
            axios
                .get(`http://localhost:3000/reservations/${auth.user.email}`)
                .then((res) => {
                    setreservations(res.data);
                    console.log(res);
                });
        }
    }, []);

    return (
        <Box p={10}>
            <Grid container spacing={5}>
                {reservations?.map((reserve, idx) => (
                    <Grid item>
                        <Card sx={{ p: 3 }} elevation={3}>
                            <Typography>{reserve.name}</Typography>
                            <Typography
                                variant="subtitle2"
                                color={"text.secondary"}
                            >
                                {reserve.email}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item xs={6}>
                                    <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        gap={0.5}
                                    >
                                        <CalendarMonthIcon fontSize="small" />
                                        <Typography
                                            variant="subtitle1"
                                            color={"text.secondary"}
                                        >
                                            {reserve.date}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        gap={0.5}
                                    >
                                        <AccessTimeIcon fontSize="small" />
                                        <Typography
                                            variant="subtitle1"
                                            color={"text.secondary"}
                                        >
                                            {reserve.time}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        sx={{
                                            p: 1,
                                            border:'1px solid blue',
                                            textAlign: "center",
                                            borderRadius: 1,
                                            color: "blue",
                                        }}
                                    >
                                        {reserve.status}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button color="error" variant="contained" fullWidth>Cancel</Button>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MyReservation;

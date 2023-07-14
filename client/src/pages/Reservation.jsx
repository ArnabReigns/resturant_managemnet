import {
    Box,
    Button,
    Card,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import dayjs from "dayjs";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
    const menuItems = [];

    for (let i = 1; i <= 10; i++) {
        menuItems.push(
            <MenuItem sx={{ width: "100%" }} key={i} value={i}>
                {i}
            </MenuItem>
        );
    }
    const { user } = useAuth();
    const navigate = useNavigate();

    const [reservation, setreservation] = useState({
        name: user?.name,
        email: user?.email,
        date: dayjs().format("DD:MM:YYYY")  ,
        time: "",
        personCount: 1,
    });

    useEffect(() => {
        console.log(reservation);
    }, [reservation]);

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/reservation", {
                ...reservation,
            })
            .then((res) => {
                console.log(res.data);
                navigate('/');
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setreservation((prev) => ({ ...prev, [name]: value }));
    };
    const handleDateChange = (e) => {
        setreservation((prev) => ({ ...prev, date: e.format("DD:MM:YYYY") }));
    };
    const handleTimeChange = (e) => {
        setreservation((prev) => ({ ...prev, time: e.format("h:mm A") }));
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
                <Typography variant="h5">Book Your Table 🍕</Typography>
                <Typography variant="caption">Fill the details</Typography>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="name"
                                name="name"
                                required
                                value={reservation.name}
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="email"
                                name="email"
                                required
                                value={reservation.email}
                                type="email"
                                onChange={(e) => handleChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Person Count</InputLabel>
                                <Select
                                    fullWidth
                                    id="demo-simple-select-autowidth"
                                    value={reservation.personCount}
                                    onChange={handleChange}
                                    name="personCount"
                                    autoWidth
                                    label="Person Count"
                                >
                                    {menuItems}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker
                                label="Select Date"
                                required
                                disablePast
                                defaultValue={dayjs()}
                                views={["year", "month", "day"]}
                                onChange={(e) => handleDateChange(e)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TimePicker
                                required
                                label="Select Time"
                                onChange={(e) => handleTimeChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                sx={{ textTransform: "capitalize" }}
                            >
                                Reqest Reservation
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Box>
    );
};

export default Reservation;

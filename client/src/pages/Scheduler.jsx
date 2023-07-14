import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";

const weekDaysEnum = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const Scheduler = () => {
    const [schedule, setschedule] = useState({
        staff_name: null,
        schedule: {},
    });

    const [Allschedules, setAllSchedule] = useState([]);

    const fetchAll = () => {
        axios.get("http://localhost:3000/schedules").then((res) => {
            console.log("all schedules", res.data);
            setAllSchedule(res.data);
        });
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setschedule((prev) => ({ ...prev, [name]: value }));
    };

    const handleShiftChange = (e) => {
        const { name, value } = e.target;
        setschedule((prev) => ({
            ...prev,
            schedule: { ...prev.schedule, [name]: value },
        }));
    };

    const reset = () => {
        setschedule({
            staff_name: null,
            schedule: {},
        });
    };

    useEffect(() => {
        console.log(schedule);
    }, [schedule]);

    const handleSubmit = () => {
        if (Object.keys(schedule.schedule).length > 0)
            axios
                .post("http://localhost:3000/schedules", {
                    staff_name: schedule.staff_name,
                    schedule: schedule.schedule,
                })
                .then((res) => {
                    console.log(res);
                    setopen(false);
                    fetchAll();
                });
        else closeDialog();

        reset();
    };

    const [open, setopen] = useState(false);

    const closeDialog = () => {
        setopen(false);
    };
    return (
        <>
            <Box p={5} display={"flex"} flexDirection={"column"} gap={1}>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    p={1}
                    px={2}
                    bgcolor={"primary.dark"}
                    borderRadius={1}
                    color={"white"}
                >
                    <Typography>Staff Scheduler</Typography>
                    <Box className="actions" display={"flex"} gap={"1rem"}>
                        <Button
                            variant="contained"
                            onClick={() => setopen(true)}
                        >
                            Add
                        </Button>
                    </Box>
                </Box>
                {Allschedules.map((sch, idx) => (
                    <Box
                        key={idx}
                        display={"flex"}
                        alignItems={"center"}
                        gap={1}
                        p={1}
                        px={2}
                    >
                        <Typography mr={5}>{sch.staff_name}</Typography>
                        <Box className="shedules" display={"flex"} gap={"1rem"}>
                            {Object.entries(sch.schedule).map(
                                ([day, shift], idx) => (
                                    <Box
                                        display={"flex"}
                                        gap={1}
                                        color={"white"}
                                        bgcolor={"primary.dark"}
                                        p={1}
                                        borderRadius={1}
                                        key={idx}
                                    >
                                        <Typography>{day}</Typography>
                                        <Divider orientation="vertical" />
                                        <Typography>{shift}</Typography>
                                    </Box>
                                )
                            )}
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* dialouge */}

            <div>
                <Dialog open={open} onClose={() => setopen(false)}>
                    <DialogTitle>Add New Staff</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    id="name"
                                    label="Staff Name"
                                    type="text"
                                    fullWidth
                                    value={schedule.staff_name}
                                    variant="standard"
                                    name="staff_name"
                                    onChange={(e) => handleChange(e)}
                                />
                            </Grid>
                            {weekDaysEnum.map((day, idx) => (
                                <Grid item xs={3} key={idx}>
                                    <FormControl
                                        variant="standard"
                                        sx={{ m: 1, minWidth: 120 }}
                                        fullWidth
                                    >
                                        <InputLabel id="demo-simple-select-standard-label">
                                            {day}
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            name={day}
                                            onChange={(e) =>
                                                handleShiftChange(e)
                                            }
                                            label={day}
                                            defaultValue={"none"}
                                        >
                                            <MenuItem value={"none"}>
                                                None
                                            </MenuItem>
                                            <MenuItem value={"day"}>
                                                Day
                                            </MenuItem>
                                            <MenuItem value={"night"}>
                                                Night
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            ))}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            onClick={() => closeDialog()}
                            color="error"
                        >
                            cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleSubmit()}
                        >
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default Scheduler;

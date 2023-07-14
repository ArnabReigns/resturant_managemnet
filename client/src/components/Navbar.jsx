import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
    const auth = useAuth();

    console.log(auth);

    return (
        <>
            <Box
                p={2}
                display={"flex"}
                alignItems={"center"}
                bgcolor={"primary.dark"}
                color="white"
                gap="1rem"
                justifyContent={"space-between"}
            >
                <Link to={"/"}>
                    <Typography variant="h6" margin={0}>
                        Reignsturent
                    </Typography>
                </Link>

                <Link to={"/myReservations"}>
                    <Typography variant="body1" margin={0} ml={5}>
                        Reservations
                    </Typography>
                </Link>

                {auth.user?.role != "client" && (
                    <>
                    <Link to={"/dashboard"}>
                        <Typography variant="body1" margin={0}>
                            Dashboard
                        </Typography>
                    </Link>
                    <Link to={"/shedule"}>
                        <Typography variant="body1" margin={0}>
                            Sheduler
                        </Typography>
                    </Link>
                    </>
                )}

                <Box mr="auto"></Box>
                <Box display={"flex"} gap="1rem">
                    {auth.user == null ? (
                        <ButtonGroup
                            variant="contained"
                            aria-label="outlined primary button group"
                        >
                            <Button component={Link} to="/login">
                                Log In
                            </Button>
                            <Button component={Link} to="/register">
                                Sign Up
                            </Button>
                        </ButtonGroup>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => {
                                localStorage.removeItem("user");
                                auth.setuser(null);
                            }}
                        >
                            Logout
                        </Button>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Navbar;

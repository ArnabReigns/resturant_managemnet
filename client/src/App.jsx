import { useEffect, useState } from "react";
import "./App.css";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Home from "./pages/Home";
import { ThemeProvider, createTheme } from "@mui/material";
import UserProvider from "./context/UserProvider";
import Reservation from "./pages/Reservation";
import Orderfood from "./pages/Orderfood";
import MyReservation from "./pages/MyReservation";
import Dashboard from "./pages/Dashboard";
import Scheduler from "./pages/Scheduler";
import { useAuth } from "./hooks/useAuth";

const NavLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

const Admin = () => {
    const auth = useAuth();
    const nav = useNavigate();
    useEffect(() => {
        console.log(auth.user)
        if (auth.user?.role == "client") nav("/");
    }, []);

    return <Outlet />;
};

function App() {
    const [count, setCount] = useState(0);
    const theme = createTheme({});
    return (
        <>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <UserProvider>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Signup />} />

                            <Route path="/" element={<NavLayout />}>
                                <Route index element={<Home />}></Route>
                                <Route
                                    path="/reservation"
                                    element={<Reservation />}
                                ></Route>
                                <Route
                                    path="/myReservations"
                                    element={<MyReservation />}
                                ></Route>
                                <Route
                                    path="/order"
                                    element={<Orderfood />}
                                ></Route>

                                <Route element={<Admin />}>
                                    <Route
                                        path="/dashboard"
                                        element={<Dashboard />}
                                    />
                                    <Route
                                        path="/Shedule"
                                        element={<Scheduler />}
                                    />
                                </Route>
                            </Route>
                        </Routes>
                    </UserProvider>
                </LocalizationProvider>
            </ThemeProvider>
        </>
    );
}

export default App;

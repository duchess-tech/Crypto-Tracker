import React, { useState } from 'react';
// import AppAuth from '../utils/auth';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
const Login = ({ onLogin }) => {


    const [open, setOpen] = React.useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        if (username === '' && password === '') {
            const token = AppAuth.generateToken({ username })
            localStorage.setItem('token', token)
            onLogin()
        } else {
            alert("invalid")
        }
    }

    const handleOpen = () => setOpen(!open);


    // return (



    //     <>
    //         <Button onClick={handleOpen} variant="gradient">
    //             Open Dialog
    //         </Button>
    //         <Dialog open={open} handler={handleOpen}>
    //             <DialogHeader>Its a simple dialog.</DialogHeader>
    //             <DialogBody>
    //                 <div>
    //                     <h2>Login</h2>
    //                     <label>
    //                         Username:
    //                         <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    //                     </label>
    //                     <label>
    //                         Password:
    //                         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //                     </label>
    //                     <button onClick={handleLogin}>Login</button>
    //                 </div>
    //             </DialogBody>
    //             <DialogFooter>
    //                 <Button
    //                     variant="text"
    //                     color="red"
    //                     onClick={handleOpen}
    //                     className="mr-1"
    //                 >
    //                     <span>Cancel</span>
    //                 </Button>
    //                 <Button variant="gradient" color="green" onClick={handleOpen}>
    //                     <span>Confirm</span>
    //                 </Button>
    //             </DialogFooter>
    //         </Dialog>
    //     </>













    // );
};

export default Login

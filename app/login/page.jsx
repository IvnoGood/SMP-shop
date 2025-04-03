'use client'

import { useState, useEffect } from 'react'
import "@/app/components/style.css";

export default function HandleLogin() {
    const [password, setPassword] = useState()
    const [error, setError] = useState("none")

    function HandleLoginPress() {
        if (password == "1234") {
            localStorage.setItem("isconnected", true)
            window.location.reload()
        } else {
            setError("block")
        }
    }

    function HandlePasswordChange(event) {
        setPassword(event.target.value)
    }

    return (
        <div className='main'>
            <div className='form'>
                <div className='loginForm'>
                    <div className=''>
                        <h1 className='LoginFormTitle'>Welcome Back !</h1>
                        <p className='mb-5 text-zinc-300'>Connecte toi pour acceder à ta boutique</p>
                    </div>
                    <div className='passwordForm mb-1'>
                        <label htmlFor="">Password</label>
                        <a href="">Forgot the Pin ?</a>
                    </div>
                    <input value={password} onKeyDown={(e) => {
                        if (e.key === "Enter")
                            HandleLoginPress();
                    }} onChange={(event) => HandlePasswordChange(event)} placeholder='••••••••••' type="password" name="password" id="passswordinput" />
                    <button className='loginbtn' onClick={() => HandleLoginPress()}>Login</button>
                    <div className='otherOptlogin relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border after:border-[#4b4b4b]' >
                        <span className='text-xs otherOptloginspan bg-[#18181b] z-200 relative p-1 text-[#ababab]'>Ou continue avec</span>
                    </div>
                    <p className="text-red-500" style={{ display: error }}>An error occured </p>
                </div>
                <div className='imagePartLogin'>
                    <img src="/minecraft-lilbox.png" alt="" className='lilimageloginform' />
                </div>
            </div>
            <footer className='flex absolute bottom-7'>
                <a href="./About.html" className='text-white' onClick={() => {
                    localStorage.setItem("isAbt", true);
                    window.location.reload();
                }}>A propos de ce projet</a>
            </footer>
        </div>
    )
}
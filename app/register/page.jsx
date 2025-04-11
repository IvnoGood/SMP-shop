'use client'

import { useState, useEffect } from 'react'
import { supabase } from "@/app/components/auth/supabaseClient";
import "@/app/components/css/Auth.css";
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/app/components/ui/LoginForm'
import Link from 'next/link'

export default function HandleRegister() {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const HandleRegisterPress = async (e) => {
        e.preventDefault()
        const { error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        } else {
            setSuccess(true)
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) {
                router.push("/");
            }
        });
    }, [])

    return (
        <div className='main'>
            <div className='form'>
                <div className='loginForm'>
                    <div>
                        <h1 className='LoginFormTitle'>New Here ?</h1>
                        <p className='mb-5 text-zinc-300'>Crée un compte pour créer une boutique personnalisée</p>
                    </div>
                    {/* <div className='passwordForm mb-1'>
                        <label htmlFor="">Password</label>
                        <a href="">Forgot the Pin ?</a>
                    </div> */}

                    {/* <LoginForm /> */}
                    <Link href="/login">Already have an account ?</Link>

                    <form action="" className='flex flex-col gap-2'>
                        <label htmlFor="" className='mr-auto font-bold'>Email :</label>

                        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder='email@email.com' type="email" name="password" id="passswordinput" />

                        <label htmlFor="" className='mr-auto font-bold'>Password :</label>

                        <input value={password} onKeyDown={(e) => {
                            if (e.key === "Enter") HandleRegisterPress(e);
                        }} onChange={(event) => setPassword(event.target.value)} placeholder='••••••••••' type="password" name="password" id="passswordinput" />


                        <button className='loginbtn' onClick={(e) => HandleRegisterPress(e)}>Register</button>
                    </form>

                    {/* <div className='otherOptlogin relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border after:border-[#4b4b4b]' >
                        <span className='text-xs otherOptloginspan bg-[#18181b] z-200 relative p-1 text-[#ababab]'>Ou continue avec</span>
                    </div> */}
                    {error ? <p className="text-red-500">An error occured: {error} </p> : <></>}
                    {success && <p className="text-green-500 mb-2">Check your email to verify!</p>}
                </div>
                {/* <div className='imagePartLogin'>
                    <img src="/minecraft-lilbox.png" alt="" className='lilimageloginform' />
                </div> */}
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
'use client'

import { useState, useEffect } from 'react'
import { supabase } from "@/app/components/auth/supabaseClient";
import "@/app/components/css/Auth.css";
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function HandleLogin() {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const router = useRouter()

    const HandleLoginPress = async (e) => {
        e.preventDefault()
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        } else {
            router.push('/')
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
                    <div className=''>
                        <h1 className='LoginFormTitle'>Welcome Back !</h1>
                        <p className='mb-5 text-zinc-300'>Connecte toi pour acceder à ta boutique</p>
                    </div>

                    <form action="" className='flex flex-col gap-2'>

                        <div className='flex'>
                            <Link href="/">Forgot your password ?</Link>
                            <Link href="/register" className='ml-auto'>Don't have an account ?</Link>
                        </div>

                        <label htmlFor="" className='mr-auto font-bold'>Email :</label>

                        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder='email@email.com' type="email" name="password" id="passswordinput" />

                        <label htmlFor="" className='mr-auto font-bold'>Password :</label>

                        <input value={password} onKeyDown={(e) => {
                            if (e.key === "Enter") HandleLoginPress(e);
                        }} onChange={(event) => setPassword(event.target.value)} placeholder='••••••••••' type="password" name="password" id="passswordinput" />


                        <button className='loginbtn' onClick={(e) => HandleLoginPress(e)}>Login</button>
                    </form>

                    {/* <div className='otherOptlogin relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border after:border-[#4b4b4b]' >
                        <span className='text-xs otherOptloginspan bg-[#18181b] z-200 relative p-1 text-[#ababab]'>Ou continue avec</span>
                    </div> */}
                    {error ? <p className="text-red-500">An error occured: {error} </p> : <></>}
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
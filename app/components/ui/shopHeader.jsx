'use client'
import { supabase } from "@/app/components/auth/supabaseClient";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import "@/app/components/css/Header.css"

export function Header() {
    const router = useRouter();
    const [session, setSession] = useState(null);

    useEffect(() => {
        // Get session on load
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
        });

        // Listen for auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();


    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login"); // Redirect to login after logout
    };

    return (
        <header className='header'>
            <Link href={"/"} className='headerButtons text-center'><p className='headerbuttonstext'>Home</p></Link>
            <button className='headerButtons'><p className='headerbuttonstext'>Shops</p></button>
            <button className='headerButtons'><p className='headerbuttonstext'>Pubs</p></button>
            {session && (<Link href={"/shop"} className='headerButtons text-center'><p className='headerbuttonstext'>Dashboard</p></Link>)}

            {session ? (
                <>
                    <button className="Btn" onClick={handleLogout}>
                        <div className="sign">
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                        </div>
                        <div className="text">Logout</div>
                    </button>
                    <div className='usrInfo'>
                        {/* <img src="/user.jpg" alt="" className='userImage' /> */}
                        <h4>{session.user.email}</h4>
                    </div>
                </>
            ) : (
                <button className="Btn !bg-[#67b957]" onClick={handleLogout}>
                    <div className="sign">
                        <span className="material-symbols-outlined">
                            login
                        </span>
                    </div>
                    <div className="text">Login</div>
                </button>
            )
            }
        </header >
    )
}
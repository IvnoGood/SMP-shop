'use client'
import { supabase } from "@/components/auth/supabaseClient";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import "@/components/css/Header.css"
import ProfileEditor from '@/components/ui/ProfileEditor'

export function Header() {
    const DropDownMenuClosedX = "-175px";

    const router = useRouter();
    const [session, setSession] = useState(null);
    const [dropdownX, setDropdownX] = useState(DropDownMenuClosedX);
    const [dropdownOverlay, setDropdownOverlay] = useState("none");
    const [ProfileEditorDp, setProfileEditorDp] = useState("none")
    const [username, setUsername] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const [userId, setUserId] = useState("")


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

    useEffect(() => {
        GetUserInfo()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login"); // Redirect to login after logout
    };

    async function GetUserInfo() {
        const { data: { user }, error1 } = await supabase.auth.getUser()
        if (error1) {
            console.error(error1)
            return
        }

        const { data, error } = await supabase
            .from('Users')
            .select('*')
            .eq('identifier', user?.id);

        if (error) {
            console.error("Error while parsing users", error)
            return
        }
        setUsername(data[0].Username)

        if (data[0].ProfilePicture) {
            setAvatarUrl(data[0].ProfilePicture)
        } else {
            setAvatarUrl("/User.png")
        }

        setUserId(data[0].identifier)
        return data
    }

    return (
        <header className='header'>

            <div className="PageOverlay" style={{ display: dropdownOverlay }} onClick={() => {
                if (dropdownX == "0") {
                    setDropdownX(DropDownMenuClosedX);
                    setDropdownOverlay("none");
                    setProfileEditorDp("none")
                }
            }}></div>

            <Link href={"/"} className='headerButtons text-center'><p className='headerbuttonstext'>Home</p></Link>
            <button className='headerButtons'><p className='headerbuttonstext'>Shops</p></button>
            <button className='headerButtons'><p className='headerbuttonstext'>Pubs</p></button>
            {session && (<Link href={"/shop"} className='headerButtons text-center'><p className='headerbuttonstext'>Dashboard</p></Link>)}

            {session ? (
                <div className='usrInfo'>
                    <img src={avatarUrl} className='userImage' />
                    <h4>{username || session.user.email}</h4>

                    <div className="DropDownMenuOverlay" onClick={() => {
                        if (dropdownX == "0") {
                            setDropdownX(DropDownMenuClosedX);
                        } else {
                            setDropdownX("0");
                            setDropdownOverlay("block")
                        }
                    }}></div>

                    <div>
                        <ul className="DropDownMenuHeader" style={{ right: dropdownX }}>
                            <li>
                                <button className="pointer" onClick={() => {
                                    setProfileEditorDp("block")
                                }}>Profile Settings</button>
                            </li>
                            <button className="Btn mt-2" onClick={handleLogout}>
                                <div className="sign">
                                    <span className="material-symbols-outlined">
                                        logout
                                    </span>
                                </div>
                                <div className="text">Logout</div>
                            </button>
                        </ul>
                    </div>
                </div>
            ) : (
                <button className="Btn !bg-[#67b957]" onClick={handleLogout}> {/*Log in button*/}
                    <div className="sign">
                        <span className="material-symbols-outlined">
                            login
                        </span>
                    </div>
                    <div className="text">Login</div>
                </button>
            )
            }
            <ProfileEditor
                display={ProfileEditorDp}
            />
        </header >
    )
}
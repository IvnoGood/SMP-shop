'use client'

import { useState, useEffect } from 'react'
import { supabase } from "@/components/auth/supabaseClient"; // Import the singleton client
import Image from 'next/image';
import { useRouter } from 'next/navigation'

/* import mcData from "minecraft-data";
TODO: make this faster (before: ~2s, now: 900ms)
const items = mcData("1.20").itemsArray; */

import "@/components/css/Shop.css"
import SellCardList from "@/components/ui/SellCardList";

function LandingPage() {
    const [data, setData] = useState([]);
    const [formlleft, setFormleft] = useState("-300px");
    const [openformlogo, setOpenformlogo] = useState("left_panel_open")
    const router = useRouter();
    const [session, setSession] = useState(null);

    async function getInstruments() {

        let { data, error } = await supabase
            .from('sellitems')
            .select('*')

        if (error) {
            console.error("Error fetching data:", error.message);
            return;
        }

        if (data.length == 0) {
            return;
        }

        setData(data);
    }

    async function GetUserName() {
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
        document.getElementById('usernameForm').value = data[0].Username
        return data[0]
    }

    async function addInstrument(event) {
        event.preventDefault(); // Prevent page refresh

        const formData = new FormData(event.target); // Collect form data
        const formValues = Object.fromEntries(formData.entries()); // Convert to object


        const { data, error } = await supabase
            .from("sellitems") // Table name
            .insert([
                { title: formValues.title, image_url: formValues.image, username: formValues.username, price: formValues.price, qte: formValues.qte } // New row data
            ]);

        if (error) {
            console.error("Insert Error:", error.message);
        } else {
            window.location.reload()
        }
        getInstruments()
    }

    useEffect(() => {
        GetUserName()
        getInstruments()
        supabase.auth.getSession().then(({ data }) => {
            if (!data.session) {
                router.push("/login");
            }
        });
    }, []);

    return (
        <>
            <main className='mainLanding flex-grow flex-1'>

                <div className='flex gap-3'>
                    <button className='drawerButton' onClick={() => {
                        if (formlleft === "-300px") {
                            setFormleft("0px")
                            setOpenformlogo("left_panel_close")
                        } else {
                            setFormleft("-300px")
                            setOpenformlogo("left_panel_open")
                        }
                    }}>
                        <span className="material-symbols-outlined">
                            {openformlogo}
                        </span>
                    </button>

                    <h1 className='text-xl font-bold capitalize'>Objets a vendre: </h1>
                </div>

                <form className='addForm' onSubmit={addInstrument} style={{ left: formlleft }}>
                    <h1 className="font-bold text-lg text-center">Formulaire de vente</h1>

                    <div className="input-group">
                        <input type="text" name='image' required className="input" />
                        <label className="user-label">Image (url uniquement)</label>
                    </div>

                    <div className="input-group">
                        <input type="text" name='title' required className="input" />
                        <label className="user-label">Titre de l'article</label>
                    </div>

                    <div className="input-group">
                        <input type="number" name='qte' required className="input" />
                        <label className="user-label">Quantitée</label>
                    </div>

                    <div className="input-group hidden">
                        <input type="text" name='username' required className="input" id='usernameForm' />
                        <label className="user-label">Nom d'utilisateur</label>
                    </div>

                    <div className="input-group">
                        <input type="text" name='price' required className="input" />
                        <label className="user-label">Prix de l'article</label>
                    </div>

                    {/* <div className="input-group">
                        <select required className="input w-[193]">
                            <option value="default">
                                Bloc au choix
                            </option>
                            {items.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.displayName}
                                </option>
                            ))}
                        </select>
                    </div> */}

                    <button type="submit" className='formsubmit'>Submit</button>
                </form>


                <SellCardList data={data} />
            </main>
        </>
    )
}

export default LandingPage

'use client'

import { useState, useEffect } from 'react'
import { supabase } from "@/app/components/supabaseClient"; // Import the singleton client
import { Header } from "@/app/components/shopHeader";
/* import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared' */

import "@/app/components/style.css"

function LandingPage() {
    const [data, setData] = useState([]);
    const [formlleft, setFormleft] = useState("-300px");
    const [openformlogo, setOpenformlogo] = useState("left_panel_open")

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


    async function addInstrument(event) {
        event.preventDefault(); // Prevent page refresh

        const formData = new FormData(event.target); // Collect form data
        const formValues = Object.fromEntries(formData.entries()); // Convert to object


        const { data, error } = await supabase
            .from("sellitems") // Table name
            .insert([
                { title: formValues.title, image_url: formValues.image, username: formValues.username, price: formValues.price } // New row data
            ]);

        if (error) {
            console.error("Insert Error:", error.message);
        } else {
            window.location.reload()
        }
        getInstruments()
    }

    useEffect(() => {
        getInstruments()
    }, [])

    return (
        <>
            <Header></Header>

            <main className='mainLanding'>
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

                <form className='addForm' onSubmit={addInstrument} style={{ left: formlleft }}>
                    <h1 className="font-bold text-lg text-center">Formulaire de vente</h1>

                    <div className="input-group">
                        <input type="text" name='username' required className="input" />
                        <label className="user-label">Nom d'utilisateur</label>
                    </div>

                    <div className="input-group">
                        <input type="text" name='title' required className="input" />
                        <label className="user-label">Titre de l'article</label>
                    </div>

                    <div className="input-group">
                        <input type="text" name='price' required className="input" />
                        <label className="user-label">Prix de l'article</label>
                    </div>

                    <div className="input-group">
                        <input type="text" name='image' required className="input" />
                        <label className="user-label">Image (url uniquement)</label>
                    </div>

                    <button type="submit" className='formsubmit'>Submit</button>
                </form>


                <h1>Objets a vendre: </h1>
                <ul className='listitems'>
                    {data.map((data) => (
                        <li className='SellCard' key={data.id}>
                            <h1 className='SellCardTitle'>{data.title}</h1>
                            <img src={data.image_url} alt="image-descriptive" className='desc-image' />
                            <p className='SellCardDesc'><a href={"https://fr.namemc.com/profile/" + data.username}>{data.username}</a> - {data.price}</p>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}

export default LandingPage

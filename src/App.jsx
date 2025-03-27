import { useState, useEffect } from 'react'
import { supabase } from "./supabaseClient"; // Import the singleton client

import "./style.css"

function HandleLogin() {
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

function AboutPage() {
  return (
    <>
      <h1>Pourquoi créer ce projet ?</h1>
      <p>Ce site est une plateforme SaaS (Software as a Service) conçue pour offrir aux administrateurs un outil clé en main leur permettant de créer et gérer un espace de vente en ligne dédié aux membres de leur communauté ou serveur.

        Grâce à cette solution, les administrateurs peuvent déployer rapidement une boutique en ligne où les membres peuvent acheter, vendre ou échanger des produits et services de manière fluide et sécurisée.

        Les fonctionnalités incluent :

        Personnalisation de la boutique (design, catégories, gestion des produits/services).
        Système de gestion des paiements sécurisé, avec intégration de différentes méthodes (cartes bancaires, PayPal, cryptomonnaies, etc.).
        Gestion des utilisateurs et permissions pour contrôler les rôles et les accès au sein de la boutique.
        Outils analytiques pour suivre les performances des ventes et les interactions des utilisateurs.

        En résumé, ce SaaS vise à faciliter la mise en place d’un espace e-commerce interne, permettant aux membres d'un serveur de mener des transactions en toute simplicité, tout en offrant aux administrateurs un contrôle total sur l'environnement commercial. 🚀 </p>
      <button onClick={() => {
        localStorage.removeItem("isAbt");
        window.location.reload();
      }}>Exit </button>
    </>
  )
}

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
      console.log("empty")
      return;
    }

    setData(data);
    console.log("Fetched Data:", data);
  }


  async function addInstrument(event) {
    event.preventDefault(); // Prevent page refresh

    const formData = new FormData(event.target); // Collect form data
    const formValues = Object.fromEntries(formData.entries()); // Convert to object

    console.log("Form Data:", formValues);

    const { data, error } = await supabase
      .from("sellitems") // Table name
      .insert([
        { title: formValues.title, image_url: formValues.image, username: formValues.username, price: formValues.price } // New row data
      ]);

    if (error) {
      console.error("Insert Error:", error.message);
    } else {
      console.log("Inserted Data:", data);
    }

    getInstruments()
  }

  useEffect(() => {
    getInstruments()
  }, [])

  return (
    <>
      <header className='header'>
        <button className='headerButtons'><p className='headerbuttonstext'>Shops</p></button>
        <button className='headerButtons'><p className='headerbuttonstext'>Pubs</p></button>

        <button class="Btn" onClick={() => {
          localStorage.removeItem("isconnected")
          window.location.reload()
        }}>
          <div class="sign">
            <svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg>
          </div>
          <div class="text">Logout</div>
        </button>

        <div className='usrInfo'>
          <img src="/user.jpg" alt="" className='userImage' />
          <h4>Bob</h4>
        </div>
      </header>

      <main className='mainLanding'>
        <button className='drawerButton' onClick={() => {
          console.log(formlleft)
          if (formlleft === "-300px") {
            setFormleft("0px")
            console.log("1")
            setOpenformlogo("left_panel_close")
          } else if (formlleft === "0px") {
            setFormleft("-300px")
            console.log("2")
            setOpenformlogo("left_panel_open")
          } else {
            console.log("3")
          }
        }}>
          <span class="material-symbols-outlined">
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

function SetPage() {
  if (localStorage.getItem("isAbt")) {
    return (AboutPage())
  }
  else if (localStorage.getItem("isconnected")) {
    return (LandingPage())
  } else {
    return (HandleLogin())
  }
}

function App() {
  return (
    SetPage()
  )

}

export default App

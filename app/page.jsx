'use client'

import Image from "next/image";
import "@/app/components/style.css"

export default function Home() {
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
  );
}

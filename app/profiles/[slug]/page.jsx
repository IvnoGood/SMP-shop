'use client'

import { use, useEffect, useState } from "react";
import { supabase } from "@/components/auth/supabaseClient";
import SellCardList from "@/components/ui/SellCardList";

export default function Page({ params }) {
    const { slug } = use(params); // unwrap the promise

    const [UserInfo, setUserInfo] = useState();
    const [UserSellCards, setUserSellCards] = useState()
    const [error, setError] = useState(false);
    const [pagerender, Setpagerender] = useState(<p>Loading ...</p>)

    async function GetListsOfArticles() {

        let { data, error } = await supabase
            .from('sellitems')
            .select('*')
            .eq('username', slug)

        if (error) {
            console.error("Error fetching data:", error.message);
            return;
        }

        if (data.length == 0) {
            return;
        }

        setUserSellCards(data)
    }

    async function getUsersUsername(src) {
        const { data, error } = await supabase
            .from('Users')
            .select(src)
            .eq('Username', slug);

        if (error) {
            console.error("Error fetching data:", error.message);
            setError(true);
            console.log("notfound");
            return;
        }
        setUserInfo(data[0])
    }

    useEffect(() => {
        const fetchData = async () => {
            await getUsersUsername('*')
        }
        fetchData()
        GetListsOfArticles()
    }, []);

    useEffect(() => {
        if (UserInfo) {
            const date = new Date(UserInfo.created_at);
            const formatted = date.toISOString().split("T")[0];
            Setpagerender(
                <article className="z-10 flex">
                    <div className="border-r-1 border-[#545461] p-2">
                        <img className="size-64 rounded-full" src={UserInfo.ProfilePicture || "/User.png"} alt="userPicture" />
                        <h1 className="text-3xl font-bold text-center mt-3">{UserInfo.Username}</h1>
                        <h3 className="text-l text-center">User since: {formatted}</h3>
                    </div>
                    <div className="p-2">
                        <h1 className="text-3xl font-bold text-center mt-3">Items selling :</h1>
                        <SellCardList data={UserSellCards} />
                    </div>
                </article>
            )
        }
    }, [UserInfo]);

    return (
        <>
            <main className="flex-grow flex-1 text-white flex-column flex">
                {error ? (
                    <article className="z-10 flex">
                        <div>User not found</div>
                    </article>
                ) : (
                    <>
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/minecraft-bg2.jpg"
                                alt="Minecraft background"
                                className="w-full h-full object-cover text-center brightness-50"
                            />
                            <div className="absolute inset-0 bg-black opacity-50" />
                        </div>
                        {pagerender}
                    </>
                )}
            </main>
        </>
    );

}
'use client'
import { useEffect, useState } from 'react'
import { supabase } from "@/components/auth/supabaseClient";

export default function ProfileEditor({ display }) {
    const [username, setUsername] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")
    const [userId, setUserId] = useState("")
    const [loading, setLoading] = useState(false);
    const [UserInfo, setUserInfo] = useState();
    const [uploadedImg, setUploadedImg] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const { data: uploadData, error: uploaderrror } = await supabase
            .from('Users')
            .update({ Username: username }) // or signedUrl
            .eq('identifier', userId);

        if (uploaderrror) {
            console.error("Error uploading signed URL:", uploaderrror.message);
            return;
        }
        await SavePP(uploadedImg)

        setLoading(false)
    }

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

    function toBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // THIS will give you a Base64 URL
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    async function HandlePPChange(e) {
        const file = e.target.files[0]
        setUploadedImg(file);
        const base64 = await toBase64(file);
        setAvatarUrl(base64)

    }

    async function SavePP(file) {
        const { data: bucketcontent, error: bucketcontenterr } = await supabase
            .storage
            .from('avatars')        // your bucket name
            .list(`user-avatars/${userId}/`); // optional path inside the bucket

        if (bucketcontenterr) {
            console.error("Error happened while retrieving data from bucket", bucketcontenterr)
            return;
        }

        bucketcontent.map(async (element) => {
            if (element.name.includes("profilePic")) {
                /* console.warn("About to delete:", `user-avatars/${userId}/${element.name}`); */
                const { data, error } = await supabase
                    .storage
                    .from('avatars') // your bucket name
                    .remove([`user-avatars/${userId}/${element.name}`]);
                if (error) {
                    console.error("Error happened while uploading to bucket", error)
                    return;
                }
                return;
            } else {
                return;
            }
        })

        //Uplaod the file
        const { data, error } = await supabase
            .storage
            .from('avatars')
            .upload(`user-avatars/${userId}/profilePic-${file.name}`, file, {
                upsert: true,
            });

        if (error) {
            console.error("Error happened while uploading to bucket", error)
            return;
        }

        //Create URL
        const { data: signedData, error: signederror } = await supabase
            .storage
            .from('avatars')
            .getPublicUrl(`user-avatars/${userId}/profilePic-${file.name}`);

        if (signederror) {
            console.error("Error creating signed URL:", signederror.message);
            return;
        }

        //Upload URL to db
        const { data: uploadData, error: uploaderrror } = await supabase
            .from('Users')
            .update({ ProfilePicture: signedData.publicUrl }) // or signedUrl
            .eq('identifier', userId);

        if (uploaderrror) {
            console.error("Error uploading signed URL:", uploaderrror.message);
            return;
        }
        setAvatarUrl(signedData.publicUrl)
    }

    async function HandleUsernameChange(e) {
        setUsername(e.target.value)
    }

    useEffect(() => {
        GetUserInfo()
    }, [display])

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-zinc-900 p-6 rounded-2xl shadow-xl space-y-5 text-white fixed top-[30%] left-[40%]" style={{ display: display }}>
            <span className="material-symbols-outlined absolute cursor-pointer" onClick={() => {
                display = "none"
            }}>
                close
            </span>
            <h2 className="text-2xl font-semibold text-center">Edit Profile</h2>

            <div className="flex flex-col items-center space-y-3">
                <img
                    src={avatarUrl || "/User.png"}
                    alt="avatar"
                    className="w-24 h-24 rounded-full border border-gray-600"
                />
                <input
                    type="file"
                    placeholder="Avatar Image URL"
                    onChange={(e) => HandlePPChange(e)}
                    className="w-full px-4 py-2 bg-zinc-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-white"

                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                    type="text"
                    placeholder="Your username"
                    value={username}
                    onChange={(e) => HandleUsernameChange(e)}
                    className="w-full px-4 py-2 bg-zinc-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-white hover:scale-105 text-black font-semibold rounded-lg transition cursor-pointer"
            >
                {loading ? "Saving..." : "Save Changes"}
            </button>
        </form>
    )
}

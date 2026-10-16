import React, { useContext, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { authContext } from './context/AuthContext';
import type { user } from './user';
import { Avatar } from 'flowbite-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export default function Addpost() {
    const [text, setText] = useState("");
    const [imageFile, setImagefile] = useState();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    let { userdata }: { userdata: user } = useContext(authContext)
    const handleEmojiClick = (emojiObject: any) => {
        setText(text + emojiObject.emoji);
    };

let queryClient=useQueryClient()
  let {mutate,isPending}=  useMutation({
        mutationFn: handlePost,
        mutationKey:['addpost'],
        onSuccess:(data)=>{
             Swal.fire({
                        title: 'Success!',
                        text: data?.data.message,
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
            console.log(data)
           
            queryClient.invalidateQueries({queryKey:['posts']})
        },
        onError:(err)=>{
            console.log(err.message)
        }
    })

    function handlePost() {
        let formData = new FormData()
        text && formData.append("body", text)
        imageFile && formData.append("image", imageFile[0])
        return axios.post(`https://route-posts.routemisr.com/posts`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        }) 
    }
    return (
        <>

            <div className="rounded-2xl border border-slate-200  bg-white my-5 mx-auto shadow p-3 w-1/2">

                <div className="mb-3 flex items-start gap-3">
                    <Avatar
                        rounded
                        size='md'
                        img={userdata?.photo}
                    />

                    <div className="flex-1">
                        <p className="text-base font-extrabold text-slate-900">
                            {userdata?.name}
                        </p>

                        <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                            <i className="fa-solid fa-earth-americas text-[12px]"></i>

                            <select className="bg-transparent outline-none">
                                <option value="public">Public</option>
                                <option value="following">Followers</option>
                                <option value="only_me">Only me</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <textarea
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={`What's on your mind, ${userdata?.name}?`}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
                    ></textarea>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">

                    <div className="relative flex items-center gap-2">

                        <label className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
                            <i className="fa-solid fa-image text-[18px] text-emerald-600"></i>

                            <span className="hidden sm:inline">
                                Photo/video
                            </span>

                            <input
                                onChange={(e) => setImagefile(e.target.files)}
                                accept="image/*"
                                className="hidden"
                                type="file"
                            />
                        </label>


                        <button
                            type="button"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                        >
                            <i className="fa-solid fa-face-smile text-[18px] text-amber-500"></i>

                            <span className="hidden sm:inline">
                                Feeling/activity
                            </span>
                        </button>

                        {showEmojiPicker && (
                            <div className="absolute left-0 top-full z-50 mt-2">
                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                            </div>
                        )}


                    </div>

                    <div >
                     {isPending ?   <button 

                            className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] "
                        >
                           Loading.......
                            <i className="fa-solid fa-paper-plane text-[16px]"></i>
                        </button>:<button onClick={()=>mutate()}

                            className="flex items-center gap-2 rounded-lg bg-[#1877f2] px-5 py-2 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-[#166fe5] "
                        >
                            Post
                            <i className="fa-solid fa-paper-plane text-[16px]"></i>
                        </button>   }
                    </div>

                </div>

            </div>


        </>
    )
}

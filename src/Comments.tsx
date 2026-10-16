
import React, { useContext, useState } from 'react'
import type { Post } from './Interfaces/Posts'
import axios from 'axios'
import { Link} from "react-router";
import { authContext } from './context/AuthContext';
export default function Comments({ commentDetails }: { commentDetails: Post }) {

    let { topComment, sharesCount, likesCount, commentsCount, _id ,likes,user} = commentDetails
    let [commentslist, setcomments] = useState<comments[] | null>(null)
    let {userdata}=useContext(authContext)
    async function getComments(id: string) {
        let { data } = await axios.get(`https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
        setcomments(data.data.comments)
        console.log(data);
    }

    async function handleLikes() {
        let {data}=await axios.put(`https://route-posts.routemisr.com/posts/${_id}/like`,"",{
             headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }

        })
        console.log(data)
        window.location.reload()
        
    }
    return (
        <>
            <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
                <div className="flex flex-wrap items-center justify-between gap-2">

                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
                            <i className="fa-solid fa-thumbs-up text-[12px]"></i>
                        </span>

                        <button
                            type="button"
                            className="font-semibold transition cursor-pointer hover:text-[#1877f2] hover:underline"
                        >
                            {likesCount} likes
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
                        <span className="inline-flex items-center gap-1">
                            <i className="fa-solid fa-repeat text-[13px]"></i>
                            {sharesCount} shares
                        </span>

                        <span>{commentsCount} comments</span>

                        <Link to={`/post/`+ _id} className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">
                            View details
                        </Link>
                    </div>

                </div>
            </div>
            <div className='mx-4 border-t border-slate-200'></div>

            <div className="grid grid-cols-3 gap-1 p-1">

                <button onClick={handleLikes} className={`${likes.length> 0 && likes.find((el)=> el==userdata._id)?"text-blue-700":"text-gray-600"}
                    cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm  hover:bg-slate-100`}>
                    <i className="fa-regular fa-thumbs-up text-[18px]"></i>
                    <span>Like</span>
                </button>

                <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm  hover:bg-slate-100">
                    <i className="fa-regular fa-comment text-[18px]"></i>
                    <span>Comment</span>
                </button>

                <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm  hover:bg-slate-100">
                    <i className="fa-solid fa-share-nodes text-[18px]"></i>
                    <span>Share</span>
                </button>

            </div>

            {topComment && !commentslist && <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">

                <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                    Top Comment
                </p>


                <div className="flex items-start gap-2">
                    <img
                        alt={topComment?.commentCreator.name}
                        className="h-7 w-7 rounded-full object-cover mt-0.5"
                        src={topComment?.commentCreator.photo}
                    />

                    <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2">
                        <p className="truncate text-xs font-bold text-slate-900">
                            {topComment?.commentCreator.name}
                        </p>

                        <p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">
                            {topComment?.content}
                        </p>
                    </div>
                </div>
                <button onClick={() => getComments(_id)} className="mt-2 text-xs font-bold text-[#1877f2] hover:underline">
                    View all comments
                </button>

            </div>}

            {commentslist &&
                commentslist?.map((comment) => {
                    return <div className="flex items-start gap-2">
                        <img
                            alt={topComment?.commentCreator.name}
                            className="h-7 w-7 rounded-full object-cover mt-0.5"
                            src={comment.commentCreator.photo}
                        />

                        <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2">
                            <p className="truncate text-xs font-bold text-slate-900">
                                {comment.commentCreator.name}
                            </p>

                            <p className="mt-0.5 whitespace-pre-wrap text-sm text-slate-700">
                                {comment.content}
                            </p>
                        </div>
                    </div>

                })
            }
        </>
    )
}

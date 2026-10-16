import React, { useContext } from 'react'
import type { Post } from './Interfaces/Posts'
import Comments from './Comments'
import { Dropdown, DropdownItem } from "flowbite-react";
import { authContext } from './context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2'
import { UpdatePost } from './UpdatePost';
export default function Singlepost({ postData, refetch }: { postData: Post }) {
    let { id, image, body, createdAt, user: { _id, name, username, photo } } = postData
    let { userdata } = useContext(authContext)

    async function deletePost(id: string) {
        let { data } = await axios.delete(`https://route-posts.routemisr.com/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
        Swal.fire({
            title: 'Success!',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'Cool'
        })
        setTimeout(() => {
            refetch()
        }, 2000)
        console.log(data)
    }

    return (
        <>
       
            <div>
                <div key={id}
                    className='bg-white my-5 mx-auto rounded-2xl shadow p-3 w-1/2'>
                    <div className='avatar'>
                        <div className="flex items-center space-x-4">
                            <div className="shrink-0">
                                <img
                                    alt="Neil image"

                                    src={photo}
                                    width="32"
                                    className="rounded-full"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900 ">{name}</p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">{username}</p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">{new Date(createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 ">

                                <Dropdown label="" dismissOnClick={false} renderTrigger={() => <i className='fa-solid fa-ellipsis'></i>}>
                                    <DropdownItem>Save post</DropdownItem>
                                    {_id == userdata._id && <>
                                        <DropdownItem><UpdatePost /></DropdownItem>
                                        <DropdownItem onClick={() => deletePost(id)}>Delete</DropdownItem>
                                    </>}
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className='postBody'>
                        <h2>{body}</h2>
                        <img src={image} className='w-full rounded-2xl' alt={body} />
                    </div>
                    <div className='postComment'>
                        <Comments commentDetails={postData} />
                    </div>

                </div>
            </div></>

    )
}

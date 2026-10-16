import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Singlepost from './Singlepost'
import { useQuery } from '@tanstack/react-query'
import type { Post } from './Interfaces/Posts'
import { ScaleLoader } from "react-spinners";
export default function PostDetail() {

    let { id } = useParams()

    let { isLoading, isError, error, data } = useQuery({
        queryKey: ["postDetails",id],
        queryFn: getDetails
    })

    function getDetails() {
        return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
    }
    if (isLoading) {
        return <ScaleLoader color="#36d7b7" />
    }
    if (isError) {
        <h2 className='text-red-950'>{error?.message}</h2>
    }
    let post: Post = data?.data.data.post
    return (
        <>
        <title>
          Post | {post.user.name}
        </title>
            {post && <Singlepost postData={post} />}
        </>
    )
}

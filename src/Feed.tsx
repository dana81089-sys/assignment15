import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Comments from './Comments'
import type { Post } from './Interfaces/Posts'
import Addpost from './Addpost'
import Singlepost from './Singlepost'
import { useQuery } from '@tanstack/react-query'
import { ScaleLoader } from "react-spinners";
export default function Feed() {

  // let [postsList, setPosts] = useState<Post[]|null>(null)
  // async function getPosts() {
  //   try {
  //     let { data } = await axios.get(`https://route-posts.routemisr.com/posts`, {
  //       headers:
  //       {
  //         Authorization: `Bearer ${localStorage.getItem("userToken")}`
  //       }

  //     })
  //     console.log(data)
  //     setPosts(data.data.posts)
  //   } catch (err:any) {
  //     console.log(err.response)
  //   }

  // }

  // useEffect(() => {
  //   getPosts()
  // }, [])

  function Handlegetposts() {
    return axios.get(`https://route-posts.routemisr.com/posts`, {
      headers:
      {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    })
  }

  let { data, isLoading, isError, error, refetch } = useQuery(
    {
      queryKey: ['posts'],
      queryFn: Handlegetposts
    }
  )
  if (isLoading) {
    return <ScaleLoader color="#36d7b7" />
  }
  if(isError){
    <h2 className='text-red-950'>{error?.message}</h2>
  }
  let postslist: Post[] = data?.data.data.posts
  return (
    <>
    <title>Feed</title>
      <Addpost />

      {postslist?.map((post) => {
        return (
          <Singlepost
            key={post._id}
            postData={post}
            refetch={refetch}
          />
        )
      })}
    </>
  )
}

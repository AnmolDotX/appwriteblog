import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
// import appwriteService from '../appwrite/config'
import { useSelector } from 'react-redux';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const data = useSelector((state) => state.post.allPosts)
    useEffect(()=>{
        setPosts(data.documents)
    },[])

    // We no more need the following api call in every compoenent, its done in postSlice.js we can get it using useSelector()

    // useEffect(()=>{
    //     appwriteService.getPosts([]).then((posts)=>{
    //         if(posts) {
    //             setPosts(posts.documents)
    //         }
    //     })
    // },[])


  return (
    <div className='w-full py-8'>
        <Container>
            <div className="flex flex-wrap">
            {
                posts.map((post)=>(
                    <div className='p-2 w-1/4' key={post.$id}>
                        <PostCard {...post}/>
                    </div>
                ))
            }
            </div>
        </Container>
    </div>
  )
}

export default AllPosts
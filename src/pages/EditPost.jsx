import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
// import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditPost = () => {
  const [post, setPost] = useState(null);
  // const { slug } = useParams();
  const navigate = useNavigate();



  // useEffect(()=>{
  //   if(slug) {
  //     appwriteService.getPost(slug).then((post)=>{
  //       if(post) {
  //         setPost(post)
  //       }
  //     })
  //   } else {
  //     navigate("/")
  //   }
  // },[slug, navigate])

  const data = useSelector(state => state.post.onePost)
    
    useEffect(() => {
        if(post === null) {
            if(data) {
                setPost(data)
            } else {
                navigate('/')
            }
        }
    }, [post, navigate]);
  
  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost
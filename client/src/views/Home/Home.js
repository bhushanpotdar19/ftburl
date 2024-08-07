import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import form from './form.png'
import link from './link.png'



function Home() {

    const [user, setUser] = useState({})
    // const [links, setLinks] = useState([])

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (currentUser) {
            setUser(currentUser)
        }

        if (!currentUser) {
            window.location.href = "/login"
        }
    }, [])

    //     const loadLinks=async ()=>{
    // if(!user._id){
    //     return
    // }
    // toast.loading("Loading Links")
    // const response=await axios.get(`${process.env.REACT_APP_API_URL}/links?userId=${user._id}`)
    // setLinks(response.data.data)
    // toast.dismiss()
    //     }

    // useEffect(()=>{
    //     loadLinks()
    // },[user])

    const [linkData, setLinkData] = useState([])

    const shortenUrl = async () => {
        const { title, target, slug } = linkData
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/link`, {
            title,
            target,
            slug,
            user
        })

        if (response.data.success) {
            toast.success("Link Shortened Successfully")
            setLinkData({
                title: "",
                target: "",
                slug: "",
            });
        }

        else {
            toast.error(response.data.message)
        }
    }
    return (

        <div><h2 style={{position:'fixed'}}>Hello {user.fullname} 👋</h2>

            <button className='logout' onClick={() => {
                localStorage.clear()
                toast.success('Logout Successfully')
                setTimeout(() => {
                    window.location.href = '/login'
                }, 2000)
            }} type='button'>Logout</button>
            <div className='title-header'>
                <h1>URL Shortner</h1><img src={link} className='link-img-head'alt='link' />
            </div><p >Let's Convert the Long URL into Short URL</p>

            <div className='main'>
                <div>
                    <form >
                        <div className='parent'>
                            <input type='text'
                                className='text-input'
                                placeholder='Title'
                                value={linkData.title}
                                onChange={(e) => setLinkData({ ...linkData, title: e.target.value })} />

                            <input type='text'
                                className='text-input'
                                placeholder='Target'
                                value={linkData.target}
                                onChange={(e) => setLinkData({ ...linkData, target: e.target.value })} />

                            <input type='text'
                                className='text-input'
                                placeholder='Slug'
                                value={linkData.slug}
                                onChange={(e) => setLinkData({ ...linkData, slug: e.target.value })} />

                            <button type='button' onClick={shortenUrl} className='btn'>Create</button>
                        </div>
                    </form>

                    <div className='btn-link'><img src={link} alt='link' className='img'></img><Link to="/CardView" className='link'>Show My Links</Link></div>
                </div>
                <img src={form} className='img-show' />
            </div>


            <Toaster />


            {/* <Link to=''></Link> */}
        </div>


    )


}

export default Home
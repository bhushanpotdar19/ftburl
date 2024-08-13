import React, { useState, useEffect } from 'react'
import Card from '../../components/Card/Card'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import link1 from './../Home/link.png'

import './CardView.css'
function CardView() {
    const [user, setUser] = useState('')
    const [links, setLinks] = useState([])

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        if (currentUser) {
            setUser(currentUser)
        }

        if (!currentUser) {
            window.location.href = "/login"
        }
    }, [])

    const loadLinks = async () => {
        if (!user._id) {
            return
        }
        toast.loading("Loading Links")
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/links?userId=${user._id}`)

        const allLinks = response.data.data


        setLinks(allLinks)

        toast.dismiss()
        toast.success('Links Loaded')
    }

    useEffect(() => {
        loadLinks()
    }, [user])

    // const [cardView, setCardView] = useState([])
    // const fetchAllLinks = async () => {
    //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/links`)

    //     setCardView(response.data.data)
    //     toast.success("Link Fetchesd Successfully")
    // }


    // useEffect(() => {
    //     fetchAllLinks()
    // }, [])


    return (
        <div>
            <h2>Hello {user.fullname} 👋</h2>

            <span className='logout' onClick={() => {
                localStorage.clear()
                toast.success('Logout Successfully')
                setTimeout(() => {
                    window.location.href = '/login'
                }, 2000)
            }}>Logout</span>

            <h1 className='link-title'>Your Links <img src={link1} style={{height:"30px"}} /> </h1>
            <div className='scroller'>

                {
                    links.map((link) => {
                        const { _id, title, target, slug, views, createdAt } = link
                        return (<Card
                            key={_id}
                            _id={_id}
                            slug={slug}
                            title={title}
                            target={target}
                            views={views}
                            createdAt={createdAt} />)
                    }
                    )}</div>
            <Toaster />

          
        </div>

    )
}


export default CardView
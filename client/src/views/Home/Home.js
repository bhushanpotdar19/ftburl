import React, { useState } from 'react'
import './Home.css'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'



function Home() {

    const [linkData, setLinkData] = useState({
        title: "",
        target: "",
        slug: ""
    })

    const shortenUrl = async () => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/link`, linkData)

        if (response.data.success) {
            toast.success("Link Shortened Successfully")
            setLinkData({
                title: "",
                target: "",
                slug: ""
            });
        }

        else {
            toast.error(response.data.message)
        }
    }
    return (

        <div>
            <h1>Don't </h1>
            <p>Hello</p>

            <form>
                <input type='text'
                    placeholder='Title'
                    value={linkData.title}
                    onChange={(e) => setLinkData({ ...linkData, title: e.target.value })} />

                <input type='text'
                    placeholder='Target'
                    value={linkData.target}
                    onChange={(e) => setLinkData({ ...linkData, target: e.target.value })} />

                <input type='text'
                    placeholder='Slug'
                    value={linkData.slug}
                    onChange={(e) => setLinkData({ ...linkData, slug: e.target.value })} />

                <button type='button' onClick={shortenUrl}>Submit</button>

            </form>
            <Toaster />
        </div>
    )
}

export default Home
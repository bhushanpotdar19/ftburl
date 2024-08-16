
import './Card.css'
import url from '../../views/Home/link.png'
import earth from './web.png'
import QRCode from 'react-qr-code'
import {Toaster,toast} from 'react-hot-toast'
import { useState } from 'react'
import copyimg from './copy.png'
import check from './check.png'




function Card({ _id, title, slug, target, views, createdAt }) {
  const slugURL=`${process.env.REACT_APP_API_URL}/${slug}`
  const [copied, setCopied] = useState(false)
  const copyToClipboard= async()=>{
    try{
      await navigator.clipboard.writeText(slugURL)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000);
  }
  catch(err){
    console.error('Failed to copy: ', err)

  }

  }


  return (

    <div className='link-card'>
      <h2 className='title-link'>{title || "No Title"}</h2>

      <p className='new-url'>
        <img src={url} className='icon' alt='icon' />
        <a href={`${process.env.REACT_APP_API_URL}/${slug}`} target='_blank' className='slug'>{slugURL} </a>
        <img src={copyimg} onClick={copyToClipboard} className='copy'/>

        {copied && <img src={check} alt='copied' className='copied'/>}
        
        
      </p>
      <p className='new-url'>
        <img src={earth} className='icon' alt='icon' />
        {target && (
          <a href={target} className='target' target='_blank'>{target.substring(0, 35)}{target.length > 35 ? "..." : null}</a>
        )}
     
      <span class='view'>👁  {views}</span>
       </p>
       {(<QRCode value={`${process.env.REACT_APP_API_URL}/${slug}`} size={40} className='qr'/>)}
      <span class='time'>{new Date(createdAt).toLocaleString()}</span>
     

      
      
<Toaster/>

    </div>


  )
}

export default Card 
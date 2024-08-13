
import './Card.css'
import url from '../../views/Home/link.png'
import earth from './web.png'
import QRCode from 'react-qr-code'

function Card({ _id, title, slug, target, views, createdAt }) {
  return (

    <div className='link-card'>
      <h2 className='title-link'>{title || "No Title"}</h2>

      <p className='new-url'>
        <img src={url} className='icon' alt='icon' />
        <a href={`${process.env.REACT_APP_API_URL}/${slug}`} target='_blank' className='slug'>{process.env.REACT_APP_API_URL}/{slug}</a>
      </p>
      <p className='new-url'>
        <img src={earth} className='icon' alt='icon' />
        {target && (
          <a href={target} className='target' target='_blank'>{target.substring(0, 35)}{target.length > 35 ? "..." : null}</a>
        )}
      </p>
      <span class='view'>👁  {views}</span>
      <span class='time'>{new Date(createdAt).toLocaleString()}</span>
     

      {target &&(<QRCode value={`${process.env.REACT_APP_API_URL}/${slug}`} size={200} />)}
      


    </div>


  )
}

export default Card
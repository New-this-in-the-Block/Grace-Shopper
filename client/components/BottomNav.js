import React from 'react'

const BottomNav = () => {
  return (
    <div className='bottomNav'>
        <h6 id="signature">© 2020, Craft Beer and Wine</h6>
        <img id='bottomLogo' src="/img/logo.jpg"/>
        <p id='blurb'>Craft Beer & Wine has the best selection of draft beer and wine. With environmentally friendly packaging, and safe shipping, you'll be enjoying your favorite drink in no time!</p>
        <div id='contact'>
            <p >For any questions or help on choosing the perfect beer, or about our awesome e-commerce app, email us at newthisintheblock@gmail.com</p>
            <h6 id='terms'>Terms & Conditions</h6>
            <h6 id='privacy'>Privacy Policy</h6>
        </div>
        <div id='social'>
            <h6>Built By</h6>
            <div id='iconsLK' >
                <div className='personIcon'>
                    <img className='linkedin' src='https://cdn0.iconfinder.com/data/icons/social-line-transparent/46/LinkedIn-line-transparent-512.png'/>
                    <p><small>Lo</small></p>
                </div>
                <div className='personIcon'>
                    <img className='linkedin' src='https://cdn0.iconfinder.com/data/icons/social-line-transparent/46/LinkedIn-line-transparent-512.png'/>
                    <p><small>Michael</small></p>
                </div>
                <div className='personIcon'>
                    <img className='linkedin' src='https://cdn0.iconfinder.com/data/icons/social-line-transparent/46/LinkedIn-line-transparent-512.png'/>
                    <p><small>Diana</small></p>
                </div>
            </div>
        </div>
  </div>
  )
}

export default BottomNav

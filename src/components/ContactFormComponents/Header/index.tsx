import React from 'react'
import './styles.scss'

interface IHeaderProps{
    stepIndex:number
}

const Header:React.FunctionComponent<IHeaderProps>=({stepIndex})=> {
  return (
      <div className='contact-container'> 
        <div className='left'>
            <img src='/assets/logos/oddysey.svg' alt='logo' className='logo'/>
            <div className='txt'>Step {stepIndex} of 2 to contact Odyssey Bank </div>
        </div>
        <div className='right'>
            <button className='btn btn-green'>FAQs</button>
        </div>
    </div>
  )
}

export default Header
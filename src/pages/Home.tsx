import React from 'react'
import banner from '../assets/logo.png'
import bgimg from '../assets/bgimg.png'
import { AuroraBackgroundDemo } from '../components/AuroraBackgroundDemo'
import { FlipWordsDemo } from '../components/FlipWordsDemo'
import { WobbleCardDemo } from '../components/WobbleCardDemo'
import { StickyScrollRevealDemo } from '../components/StickyScrollRevealDemo'

const Home = () => {
  return (
    <div className=''>
     <AuroraBackgroundDemo/>
     <div className="bg-gray-900">
      <FlipWordsDemo/>
     </div>
     <div className="bg-gray-300">
     <WobbleCardDemo/>
     </div>
     <StickyScrollRevealDemo/>
    </div>
  )
}

export default Home
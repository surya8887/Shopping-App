import React from 'react'
import Herro from '../components/Herro'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Herro/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewLetterBox/>
    </div>
  )
}

export default Home
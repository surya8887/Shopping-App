import React from 'react'
import Herro from '../components/Herro'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'

const Home = () => {
  return (
    <div>
      <Herro/>
      <LatestCollection/>
      <BestSeller/>
    </div>
  )
}

export default Home
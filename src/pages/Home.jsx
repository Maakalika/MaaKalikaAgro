import React from 'react'
import Navbar from '../sections/Navbar'
import Footer from '../sections/Footer'
import CopyRight from '../sections/CopyRight'
import Contact from '../sections/Contact'
import NewsAndArticle from '../sections/NewsAndArticle'
import Faqs from '../sections/Faqs'
import OurServices from '../sections/OurServices'
import About from '../sections/About'
import Hero from '../sections/Hero'
import Team from '../sections/Team'
import Partner from '../sections/Partner'

function Home() {
  return (
    <>
    <Navbar/>
    <Hero />
    <About />
    <OurServices />
    <Faqs />
    <Team />
    <NewsAndArticle />
    <Contact />
    <Partner />
    <Footer />
    <CopyRight />
    </>
  )
}

export default Home
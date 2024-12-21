import React from 'react'
import CategoryList from '../components/CategoryList'
import SubCategoryList from '../components/SubCategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import VerticalSubCardProduct from '../components/VerticalSubCardProduct'
import VerticalHotDealCard from '../components/VerticalHotDealCard'


function Home() {
  return (
    <div className='mt-8 lg:mt-2'>
      {/* <CategoryList/> */}
    
      <BannerProduct/>
      <VerticalHotDealCard hotDeal={"Hot_Deal"} heading={"Hot Deal"}/>

      {/* <VerticalSubCardProduct subCategory={"Item7"} /> */}
      {/* <VerticalSubCardProduct subCategory={"Nutri_C"} /> */}
      <VerticalCardProduct category={"food"} />


      

      {/* <VerticalCardProduct subCategory={"Item7"} /> */}
      {/* <VerticalCardProduct category={"watches"} /> */}
      
      <VerticalCardProduct  category={"mobiles"} />
      {/* <VerticalCardProduct  category={"mouse"} heading={"Mouse"}/> */}
      <VerticalCardProduct  category={"televisions"} />
      <VerticalCardProduct  category={"camera"} />
      <VerticalCardProduct  category={"earphones"} />
      <VerticalCardProduct  category={"printers"} />

      <HorizontalCardProduct category={"speakers"} heading={"Popular Speakers"}/>
      <HorizontalCardProduct category={"mobiles"} heading={"mobiles"}/>

      <VerticalCardProduct  category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct  category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct  category={"trimers"} heading={"Trimers"}/>
      <VerticalCardProduct  category={"processor"} heading={"Processor"}/>
    </div> 
  )
}

export default Home
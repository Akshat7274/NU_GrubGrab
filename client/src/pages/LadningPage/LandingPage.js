import React from 'react'
import Layout from '../../components/Layout/Layout'
import "../LadningPage/LandingPage.css"
const LandingPage = () => {
  return (
    <Layout title={"NU GrubGrab"}>
        <div className="row Home ">
          
          <div classname="row Home" style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
            <div classname="col-md-6" style={{margin:"10rem 3rem", maxWidth:"40rem"}}>
              <h4 className="text-center mt-2 fw-light blockquote">
                NIIT UNIVERSITY'S FOOD ORDERING WEBSITE
              </h4>
              <img
                src={require(`./logogg.png`)}
                alt="logo"
                style={{ width: "100%"}}
            />
              <p className="text-center mt-3">
              Your Ultimate Food Order Hub for All University Cravings!
              </p>
            </div>
            <div classname="col-md-6" style={{ }}>
            <div className='d-flex align-items-center justify-content-center' >
            
            <div className='row megadiv mx-auto d-flex justify-content-center'>
                <div className='col-md-4 subdiv d-flex justify-content-center'>
                    <a href="/nescafe" className="btn button d-flex align-items-center justify-content-center">NESCAFE</a>
                </div>
                <div className="col-md-4 subdiv d-flex justify-content-center">
                    <a href="/coming-soon-tmp" className="btn button d-flex align-items-center justify-content-center">TERA MERA POINT</a>
                </div>
                <div className="col-md-4 subdiv d-flex justify-content-center">
                    <a href="/coming-soon-apno" className="btn button d-flex align-items-center justify-content-center">APNO GAON</a>
                </div>
                <div className="col-md-4 subdiv d-flex justify-content-center">
                    <a href="/coming-soon-silver" className="btn button d-flex align-items-center justify-content-center">SILVER SPOONS</a>
                </div>
            </div>
        </div> 
            </div>
          </div>
      </div>
        {/* <div className='d-flex align-items-center justify-content-center' >
            
            <div className='row megadiv mx-auto d-flex justify-content-center'>
                <div className='col-md-2 subdiv d-flex justify-content-center'>
                    <a href="/nescafe" className="btn button mb-2 mt-4">Nescafe</a>
                </div>
                <div className="col-md-2 subdiv d-flex justify-content-center">
                    <a href="/coming-soon-tmp" className="btn button mb-2 mt-4">Tera Mera Point</a>
                </div>
                <div className="col-md-2 subdiv d-flex justify-content-center">
                    <a href="/coming-soon-apno" className="btn button mb-2 mt-4">Apno Gaon</a>
                </div>
                <div className="col-md-2 subdiv d-flex justify-content-center">
                    <a href="/coming-soon-silver" className="btn button mb-2 mt-4">Silver Spoons</a>
                </div>
            </div>
        </div> */}
    </Layout>
  )
}

export default LandingPage
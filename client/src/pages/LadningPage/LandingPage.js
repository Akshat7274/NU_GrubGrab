import React from 'react'
import Layout from '../../components/Layout/Layout'
import "../LadningPage/LandingPage.css"

const LandingPage = () => {
  return (
    <Layout>
        <div className='d-flex align-items-center justify-content-center' >
            <div className='row megadiv mx-auto d-flex justify-content-center'>
                <div className='col-md-4 subdiv d-flex justify-content-center'>
                    <div className="card " style={{width: "30rem"}}>
                    
                    <div className="card-body">
                        <h3 className="card-title mb-4 mt-2">NESCAFE</h3>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="/nescafe" className="btn button mb-2 mt-4">Visit Page</a>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 subdiv d-flex justify-content-center">
                    <div className="card" style={{width: "30rem"}}>
                    
                    <div className="card-body">
                        <h3 className="card-title mb-4 mt-2 mb-4 mt-2">TERA MERA POINT</h3>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="/coming-soon" className="btn button mb-2 mt-4">Visit Page</a>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 subdiv d-flex justify-content-center">
                    <div className="card" style={{width: "30rem"}}>
                    
                    <div className="card-body">
                        <h3 className="card-title mb-4 mt-2">APNO GAON</h3>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="/coming-soon" className="btn button mb-2 mt-4">Visit Page</a>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 subdiv d-flex justify-content-center">
                    <div className="card" style={{width: "30rem"}}>
                    
                    <div className="card-body">
                        <h3 className="card-title mb-4 mt-2">SILVER SPOONS</h3>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="/coming-soon" className="btn button mb-2 mt-4">Visit Page</a>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default LandingPage
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
                        <h3 className="card-title mb-4 mt-2">NESCAFÉ</h3>
                        <p className="card-text">Start your day with a perfect brew at our Nescafé outlet, fueling your study sessions!</p>
                        <a href="/nescafe" className="btn button mb-2 mt-4">Visit Page</a>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 subdiv d-flex justify-content-center">
                    <div className="card" style={{width: "30rem"}}>
                    
                    <div className="card-bodyv2">
                        <h3 className="card-title mb-4 mt-2 mb-4 mt-2">TERA MERA POINT</h3>
                        <p className="card-text">Craving a late-night bite? TMP's your go-to food outlet, serving delicious eats when everyone else is asleep!</p>
                        <a href="/coming-soon-tmp" className="btn button mb-2 mt-4">Visit Page</a>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 subdiv d-flex justify-content-center">
                    <div className="card" style={{width: "30rem"}}>
                    
                    <div className="card-bodyv3">
                        <h3 className="card-title mb-4 mt-2">APNO GAON</h3>
                        <p className="card-text">Indulge in the mouthwatering curries, a tantalizing blend of flavors that will leave you craving for more!</p>
                        <a href="/coming-soon-apno" className="btn button mb-2 mt-4">Visit Page</a>
                    </div>
                    </div>
                </div>
                <div className="col-md-4 subdiv d-flex justify-content-center">
                    <div className="card" style={{width: "30rem"}}>
                    
                    <div className="card-body">
                        <h3 className="card-title mb-4 mt-2">SILVER SPOON</h3>
                        <p className="card-text">Experience the best of both worlds at our food outlet, where fast food meets flavorful curries!</p>
                        <a href="/coming-soon-silver" className="btn button mb-2 mt-4">Visit Page</a>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default LandingPage
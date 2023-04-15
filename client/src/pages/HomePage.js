import React from 'react'

const HomePage = () => {
  return (
    <div>
        <h1>This is the Home Page!</h1>
        <div className='row'>
            <div className='col-md-3'>
                <a href='/nescafe'><button className='btn btn-dark'>Nescafe</button></a>
            </div>
            <div className='col-md-3'>
                <a href='/apno-gaon'><button className='btn btn-dark'>Apno Gaon</button></a>
            </div>
            <div className='col-md-3'>
                <a href='/silver-spoon'><button className='btn btn-dark'>Silver Spoon</button></a>
            </div>
            <div className='col-md-3'>
                <a href='/tmp'><button className='btn btn-dark'>Tera Mera Point (TMP)</button></a>
            </div>
        </div>
    </div>
  )
}

export default HomePage
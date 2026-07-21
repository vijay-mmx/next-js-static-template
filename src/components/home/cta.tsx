import React from 'react'
import SectionHead from '../global/section-head';
import Button from '../global/button';

const CTA = () => {
  return (
    <div className='cta'>

        <div className='cta-container'>
        <SectionHead
            className="text-center mb-3"
            title={
                <>
                    Bring Nature&apos;s Finest  <br /> Blooms Home 
                </>
            }
            
            subtitle={"FROM OUR FARMS TO YOU"}
          
        />
        <div className='cta-para'>
            <p>Fresh Fragrant Forever Yours</p>
            <p className='pt-3'>Discover hand-selected flowers and indoor plants sourced directly from our global farms across Kenya, Ethiopia, and beyond — delivered fresh to your door.</p>
        </div>

        <div className='cta-btn d-flex gap-4 justify-center mt-2'>
            <div className='cta-btn-1'>
            <Button text="Trade Enquiry " className="mt-5" as="a" href="/" />
            </div>
        </div>
                
        </div>
    </div>
  )
}

export default CTA;
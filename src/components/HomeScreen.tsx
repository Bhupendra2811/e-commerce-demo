import React from 'react'
import GlassPane from './GlassPane'
import ImageCarousel from './ImageCaraousel'

const HomeScreen = () => {
    return (
        <GlassPane className="candy-mesh h-screen w-screen p-6">
            <div className='mr-4 flex items-center justify-end p-4 '>
                <ImageCarousel />
            </div>
        </GlassPane >
    )
}

export default HomeScreen
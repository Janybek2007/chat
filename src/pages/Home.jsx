import React from 'react'

import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

import Navbar from '../components/Navbar'

const Home = () => {
	return (
		<div className='home'>
			<div className='content'>
				<div className='flex h-[7%] xl:h-[9%] sm:h-[9%] tx:h-[10.5%]  relative w-full'>
					<Navbar />
				</div>
				<div className='container relative w-full h-full'>
					<Sidebar />
					<Chat />
				</div>
			</div>
		</div>
	)
}

export default Home

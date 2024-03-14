import React from 'react'
import Search from './Search'
import Chats from './Chats'
import { useSelector } from 'react-redux'

const Sidebar = () => {
	const { sideBar } = useSelector((s) => s)

	return (
		<div
			className={`sidebar ${
				sideBar
					? 'lg:w-[22%] sd:w-[24%] sm:w-[35%] ss:w-[40%] xs:w-[60%] xt:w-[96%] tx:w-[97.5%]'
					: '-translate-x-72 lg:w-[20%] sd:w-[24%] sm:w-[25%] ss:w-[30%] xs:w-[40%] tx:w-[76%]'
			}   absolute xs:top-3 xs:left-3 xt:top-2 tx:top-1 tx:left-1 xt:left-2 xt:h-[97%] rounded-[10px] xs:duration-[.7s] tx:duration-[1s] sd:z-10 tx:z-20`}
		>
			<Search />
			<Chats />
		</div>
	)
}

export default Sidebar

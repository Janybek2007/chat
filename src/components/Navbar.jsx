import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { useDispatch } from 'react-redux'
import { CiLogout } from 'react-icons/ci'

const Navbar = () => {
	const { currentUser } = useContext(AuthContext)

	return (
		<div className='navbar'>
			<div className='containers sd:w-[93%] ss:w-[90%] xs:w-[95%] xt:w-[90%] tx:w-[90%] mx-auto flex items-center justify-between h-full'>
				<div className='flex items-center gap-3'>
					<span className='logo font-bold ss:text-xl xt:text-sm tx:text-sm'>
						./Chat Room!
					</span>
				</div>
				<div className='user'>
					<img className='w-[50px]' src={currentUser.photoURL} alt='' />
					<span className=''>{currentUser.displayName}</span>
					<button className='ss:block tx:hidden' onClick={() => signOut(auth)}>
						Log Out
					</button>
					<button
						style={{ background: 'transparent' }}
						className='ss:hidden tx:block'
						onClick={() => signOut(auth)}
					>
						<CiLogout className='text-[#000000] font-black text-xl' />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Navbar

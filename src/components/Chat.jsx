import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'
import { useDispatch, useSelector } from 'react-redux'
import {
	TbLayoutSidebarLeftExpandFilled,
	TbLayoutSidebarLeftCollapseFilled
} from 'react-icons/tb'
import { toggleSidebar } from '../redux/action'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
const Chat = () => {
	const { data } = useContext(ChatContext)
	const { sideBar } = useSelector((s) => s)
	const dispatch = useDispatch()

	const handleDeleteMessages = async () => {
		try {
			await deleteDoc(doc(db, 'chats', data.chatId))

			await updateDoc(doc(db, 'userChats', data.user.uid), {
				[data.chatId]: {
					lastMessage: null,
					date: null
				}
			})

			await updateDoc(doc(db, 'userChats', data.user.uid), {
				[data.chatId]: {
					lastMessage: null,
					date: null
				}
			})
		} catch (error) {
			console.error('Error deleting messages:', error)
		}
	}
	return (
		<div
			className={`chat ${
				sideBar
					? ' lg:w-[75%] sd:w-[72%] sm:w-[96.5%] ss:w-[96%] xs:w-[94.5%] xt:w-[95.5%] tx:w-[95.5%]'
					: 'xl:w-[98%] lm:w-[97%] ms:w-[97.5%] lg:w-[97.5%] sm:w-[96.5%] ss:w-[96%] xs:w-[94.5%] xt:w-[95.5%] tx:w-[95.5%]'
			} absolute lm:h-[97%] sm:h-[98.5%] tx:h-[98.5%] rounded-[10px] overflow-hidden xs:top-3 xs:right-3 xt:top-2 tx:top-1 tx:right-1 xt:right-2 duration-[.5s] sd:z-20 sm:z-10`}
		>
			<div className='chatInfo '>
				<button onClick={() => dispatch(toggleSidebar())}>
					{sideBar ? (
						<TbLayoutSidebarLeftCollapseFilled
							className={'text-[#000000] text-[26px]'}
						/>
					) : (
						<TbLayoutSidebarLeftExpandFilled
							className={'text-[#000000] text-[26px]'}
						/>
					)}
				</button>
				<div className='flex items-center gap-3'>
					<span className=''>{data.user?.displayName}</span>
				</div>
			</div>
			<Messages />
			<Input />
		</div>
	)
}

export default Chat

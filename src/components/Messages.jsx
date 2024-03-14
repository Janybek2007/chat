import React, { useContext, useEffect, useState, useRef } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'

const Messages = () => {
	const [messages, setMessages] = useState([])
	const { data } = useContext(ChatContext)
	const messagesEndRef = useRef(null)

	const dispatch = useDispatch()
	const { messageChatBackground } = useSelector((s) => s)

	useEffect(() => {
		const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
			if (doc.exists() && doc.data().messages) {
				setMessages(doc.data().messages)
			} else {
				setMessages([])
			}
		})

		return () => {
			unSub()
		}
	}, [data.chatId, dispatch])

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	useEffect(() => {
		const thisUploadImage = JSON.parse(localStorage.getItem('this_Image')) || ''
		if (thisUploadImage) {
			dispatch({ type: 'INITIAL_STATE', payload: thisUploadImage })
		}
	}, [dispatch])
	return (
		<div
			style={{ backgroundImage: `url(${messageChatBackground})` }}
			className='messages bg-[center]'
		>
			{messages.map((m) => (
				<Message message={m} key={m.id} />
			))}
			<div ref={messagesEndRef}></div>
		</div>
	)
}

export default Messages

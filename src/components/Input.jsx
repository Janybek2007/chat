import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import {
	arrayUnion,
	doc,
	serverTimestamp,
	Timestamp,
	updateDoc
} from 'firebase/firestore'
import { db, storage } from '../firebase'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import { LuImagePlus } from 'react-icons/lu'

const Input = () => {
	const [text, setText] = useState('')
	const [img, setImg] = useState(null)

	const { currentUser } = useContext(AuthContext)
	const { data } = useContext(ChatContext)

	const handleSend = async () => {
		if (!text && !img) {
			return
		}

		setText('')
		try {
			if (img) {
				const storageRef = ref(storage, uuid())
				const uploadTask = uploadBytesResumable(storageRef, img)

				await uploadTask

				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)

				await updateDoc(doc(db, 'chats', data.chatId), {
					messages: arrayUnion({
						id: uuid(),
						text,
						senderId: currentUser.uid,
						date: Timestamp.now(),
						img: downloadURL
					})
				})
			} else {
				await updateDoc(doc(db, 'chats', data.chatId), {
					messages: arrayUnion({
						id: uuid(),
						text,
						senderId: currentUser.uid,
						date: Timestamp.now()
					})
				})
			}

			await updateDoc(doc(db, 'userChats', currentUser.uid), {
				[data.chatId + '.lastMessage']: {
					text
				},
				[data.chatId + '.date']: serverTimestamp()
			})

			await updateDoc(doc(db, 'userChats', data.user.uid), {
				[data.chatId + '.lastMessage']: {
					text
				},
				[data.chatId + '.date']: serverTimestamp()
			})

			setImg(null)
		} catch (error) {
			console.error('Error during message sending:', error)
		}
	}

	function onKeySendMessage(e) {
		if (e.keyCode === 13) {
			handleSend()
		}
	}

	return (
		<div className='input'>
			<input
				type='text'
				placeholder='Your Message...'
				onKeyDown={(e) => onKeySendMessage(e)}
				onChange={(e) => setText(e.target.value)}
				value={text}
			/>
			<div className='send'>
				<input
					type='file'
					style={{ display: 'none' }}
					id='file'
					onChange={(e) => setImg(e.target.files[0])}
				/>
				<label className='' htmlFor='file'>
					<LuImagePlus className='text-[#000000] text-2xl' />
				</label>
				<button onClick={handleSend}>Send</button>
			</div>
		</div>
	)
}

export default Input

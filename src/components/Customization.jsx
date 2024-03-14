import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UpLoadImage, closeCustom } from '../redux/action'
import { IoClose } from 'react-icons/io5'

export const Custom = () => {
	const { chatImageBackground } = useSelector(s => s)
	const dispatch = useDispatch()
	const [newBackground, setNewBackground] = useState('')

	const addNewBackground = () => {
		if (newBackground.trim() !== '') {
			const upLoadImageRemoves = chatImageBackground.some(
				item => item.image === newBackground
			)
			if (!upLoadImageRemoves) {
				const newBackgroundObj = {
					id: chatImageBackground.length + 1,
					image: newBackground
				}

				dispatch({
					type: 'ADD_BACKGROUND',
					payload: newBackgroundObj
				})

				//dispatch(closeCustom())
				setNewBackground('')
			} else {
				alert('Error!!!')
				//dispatch(closeCustom())
			}
		}
	}
	useEffect(() => {
		const upLoadChatImage =
			JSON.parse(localStorage.getItem('chatImageBackground')) || []
		if (upLoadChatImage) {
			dispatch({ type: 'INITIAL_CHAT_STATE', payload: upLoadChatImage })
		}
	}, [dispatch])

	return (
		<>
			<div
				style={{
					transition: 'all .3s'
				}}
				className={`opacity-0 scale-y-0 invisible flex flex-col items-start p-4 custom fixed top-[5%] left-[calc(100% - 50%] md:w-[75%] sd:w-[85%] xs:w-[95%] md:h-[95%] tx:w-[95%] tx:h-[85%] bg-white z-[60] rounded-[10px]`}
			>
				<div className='flex items-center justify-between px-3 mb-3 w-full'>
					<h4 className='font-semibold md:text-lg sd:text-base'>
						./Chat Room Background
					</h4>
					<button onClick={() => dispatch(closeCustom())}>
						<IoClose className='text-2xl' />
					</button>
				</div>
				<div
					style={{ height: 'calc(100% - 38px)' }}
					className='flex flex-col items-center w-full  border-2 rounded-[10px] border-solid border-[#87eb9e] gap-5  pb-5 ss:p-3 xt:p-1 ss:pb-0 xs:pb-3 tx:p-2'
				>
					<div className='flex-wrap items-start flex 2xl:gap-5 ms:gap-2 ss:gap-1 tx:gap-[2px] customContainer overflow-hidden pb-5'>
						{chatImageBackground.map(el => (
							<BackgroundCard key={el.id} img={el.image} id={el.id} />
						))}
					</div>
					<div className='flex items-center flex-wrap xs:gap-0 tx:gap-2 w-full justify-center pb-3'>
						<input
							type='text'
							placeholder='Enter Image URL'
							value={newBackground}
							onChange={e => setNewBackground(e.target.value)}
							className='ms:p-2 tx:p-1 ms:text-base tx:text-sm border border-gray-300 rounded'
						/>
						<button
							onClick={addNewBackground}
							className='ms:py-2 ms:px-3 ms:text-base tx:text-sm xt:py-1 xt:px-2'
						>
							Add
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export const BackgroundCard = ({ img, id }) => {
	const dispatch = useDispatch()
	function UploadImages() {
		setTimeout(() => {
			dispatch(UpLoadImage(img))
		}, 1800)
		dispatch(closeCustom())
	}
	return (
		<div
			key={id}
			style={{
				backgroundImage: `url('${img}')`
			}}
			onClick={() => {
				UploadImages()
			}}
			className='2xl:w-[442px] 2xl:h-[250px] xl:w-[345px] xl:h-[190px] lg:w-[305px] lg:h-[180px] lm:w-[275px] lm:h-[160px] ms:w-[245px] ms:h-[140px] md:w-[225px] md:h-[130px] sd:w-[235px] sd:h-[120px] sm:w-[220px] sm:h-[120px] ss:w-[260px] ss:h-[150px] xs:w-[200px] xs:h-[120px] xt:w-[335px] xt:h-[200px] tx:w-[255px] tx:h-[150px] bg-cover bg-no-repeat cursor-pointer'
		>
			<div className='w-full h-full hover:bg-[#00000080] duration-[.4s]'></div>
		</div>
	)
}

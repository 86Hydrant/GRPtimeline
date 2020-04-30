import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './InformationBoxLayout.module.css';
import InformationBox from '../../component/InformationBox/InformationBox';
import arrowButton from '../../assets/arrow-button.svg';

const InformationBoxLayout = ({ clickedYear }) => {
	const [activeYear, setActiveYear] = useState([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [chunksAmountInArray, setChunkAmountInArray] = useState(0);
	const [chunkYearArray, setChunkYearArray] = useState([]);

	useEffect(() => {
		axios
			.get('http://www.mocky.io/v2/5ea446a43000005900ce2ca3')
			.then((response) =>
				setActiveYear(
					response.data.timelineInfo.filter((item) => item.year === clickedYear)
				)
			);
	}, [clickedYear]);

	const previousChunk = () => {
		let index = activeIndex;
		let length = chunksAmountInArray;

		if (index === 0) {
			index = 0;
		} else if (index < 1) {
			index = length - 1;
		} else {
			index--;
		}
		setActiveIndex(index);
	};

	const nextChunk = () => {
		let index = activeIndex;
		let length = chunksAmountInArray;

		if (index === length - 1) {
			index = 0;
		} else {
			index++;
		}
		setActiveIndex(index);
	};

	const arrayChunk = (array, chunkSize) => {
		let amountOfChunks = 0;
		const chunkedArray = [];
		let clonedArray = [...array];
		if (array.length > chunkSize) {
			const splitPieces = Math.ceil(clonedArray.length / chunkSize);
			for (let i = 0; i < splitPieces; i++) {
				chunkedArray.push(clonedArray.splice(0, chunkSize));
				amountOfChunks++;
			}

			setChunkAmountInArray(amountOfChunks);
			return chunkedArray;
		} else {
			setChunkAmountInArray(0);
			return array;
		}
	};

	useEffect(() => {
		setChunkYearArray(arrayChunk(activeYear, 6));
		setActiveIndex(0);
	}, [activeYear]);

	return (
		<div className={style.infoBoxLayoutStyle}>
			{chunksAmountInArray > 0 ? (
				<button className={style.leftArrow} onClick={previousChunk}>
					<img src={arrowButton} alt='previous-page-button' />
				</button>
			) : (
				<button className={style.leftArrowHidden} onClick={previousChunk}>
					<img src={arrowButton} alt='previous-page-button' />
				</button>
			)}

			{chunksAmountInArray > 0
				? chunkYearArray[activeIndex].map((component, index) => {
						return (
							<div className={style.informationBoxLayer}>
								<InformationBox
									key={index}
									title={component.title}
									text={component.info}
									category={component.category}
									link={component.link}
								/>
							</div>
						);
				  })
				: activeYear.map((component, index) => {
						return (
							<div className={style.informationBoxLayer}>
								<InformationBox
									key={index}
									title={component.title}
									text={component.info}
									category={component.category}
									link={component.link}
								/>
							</div>
						);
				  })}
			{chunksAmountInArray > 0 ? (
				<button className={style.rightArrow} onClick={nextChunk}>
					<img
						src={arrowButton}
						alt='next-page-button'
						className={style.rotateArrowRight}
					/>
				</button>
			) : (
				<button className={style.rightArrowHidden} onClick={nextChunk}>
					<img
						src={arrowButton}
						alt='next-page-button'
						className={style.rotateArrowRight}
					/>
				</button>
			)}
		</div>
	);
};

export default InformationBoxLayout;

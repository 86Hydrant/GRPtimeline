import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './InformationBoxLayout.module.css';
import InformationBox from '../../component/InformationBox/InformationBox';
import arrowButton from '../../assets/arrow-button.svg';

const InformationBoxLayout = (props) => {
	const [activeYear, setActiveYear] = useState([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [chunksAmountInArray, setChunkAmountInArray] = useState(0);

	const previousChunk = () => {
		let index = activeIndex;
		let length = chunksAmountInArray;

		if (index < 1) {
			index = length - 1;
		} else {
			index--;
		}
		setActiveIndex(index);
		console.log('state set to', activeIndex);
	};

	const nextChunk = () => {
		let index = activeIndex;
		let length = chunksAmountInArray;

		console.log('hey');
		console.log(activeIndex);
		if (index === length - 1) {
			index = 0;
		} else {
			index++;
		}
		setActiveIndex(index);
		console.log('state set to', activeIndex);
	};

	useEffect(() => {
		axios
			.get('http://www.mocky.io/v2/5ea446a43000005900ce2ca3')
			.then((response) =>
				setActiveYear(
					response.data.timelineInfo.filter((item) => item.year === '2018')
				)
			);
	}, []);
	let chunkYearArray = [];
	useEffect(() => {
		const arrayChunk = (array, chunkSize) => {
			if (array.length > 6) {
				const chunkedArray = [];
				let clonedArray = [...array];
				let amountOfChunks = 0;
				const splitPieces = Math.ceil(clonedArray.length / chunkSize);
				for (let i = 0; i < splitPieces; i++) {
					chunkedArray.push(clonedArray.splice(0, chunkSize));
					amountOfChunks++;
					console.log(amountOfChunks);
				}
				setChunkAmountInArray(amountOfChunks);
				return chunkedArray;
			} else {
				return array;
			}
		};
		chunkYearArray = arrayChunk(activeYear);
	}, []);

	return (
		<div className={style.infoBoxLayoutStyle}>
			<button className={style.leftArrow} onClick={previousChunk}>
				<img src={arrowButton} alt='previous-page-button' />
			</button>

			{chunksAmountInArray > 0
				? chunkYearArray[activeIndex].map((component, index) => {
						return (
							<InformationBox
								key={index}
								title={component.title}
								text={component.info}
								link={component.link}
							/>
						);
				  })
				: chunkYearArray.map((component, index) => {
						return (
							<InformationBox
								key={index}
								title={component.title}
								text={component.info}
								link={component.link}
							/>
						);
				  })}
			<button className={style.rightArrow} onClick={nextChunk}>
				<img
					src={arrowButton}
					alt='next-page-button'
					className={style.rotateArrowRight}
				/>
			</button>
		</div>
	);
};

export default InformationBoxLayout;

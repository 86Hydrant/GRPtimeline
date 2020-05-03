import React from 'react';
import { useState, useEffect } from 'react';
import style from './DefaultLayout.module.css';
import Header from '../../Header/Header';
import ButtonArrowSmall from '../../Buttons/ButtonArrowSmall/ButtonArrowSmall';
import InformationBoxLayout from '../../InformationBoxLayout/InformationBoxLayout';
import Filter from '../../Filter/Filter';
import APIFetch from '../../APIFetch/APIFetch';
import AddButton from '../../Buttons/AddButton/AddButton';
import Form from '../../Form/Form';

const numbers = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5];

const DefaultLayout = () => {
	const [scalingState, setScalingState] = useState(0);
	const [yearsArray, setYearsArrayState] = useState([]);
	const [clickedYear, setClickedYear] = useState('onload');
	const [selectedCategory, setSelectedCategory] = useState([]);
	const timelineData = APIFetch();

	useEffect(() => {
		timelineData.then((data) => {
			let yearsArrays = [];
			for (let item of data.timelineInfo) {
				yearsArrays.push(item.year);
			}

			setArray(yearsArrays);
		});
	}, []);

	const setArray = (array) => {
		const passArray = new Set(array);
		const oneOfEachYear = [...passArray];
		setYearsArrayState(oneOfEachYear);
	};

	const toggle = () => {
		setScalingState((scalingState + 1) % numbers.length);
	};

	const num = numbers[scalingState];

	// Add button
	const [showForm, setShowForm] = useState(false);


 	const clickHandler = () => {
	setShowForm(!showForm);
	
  	}

	return (
		<div>
			<div
				className={style.background}
				style={{ transform: `scale(${num})` }}
			></div>
			<div className={style.container}>
				<div className={style.timeline}>
					<div className={style.buttonArrowUp}>
						<ButtonArrowSmall />
					</div>
					{yearsArray.map((item, index) => (
						<button
							key={index}
							className={style.buttonYear}
							onClick={() => {
								toggle();
								setClickedYear(item);
							}}
						>
							{item}
						</button>
					))}

					<div className={style.buttonArrowDown}>
						<ButtonArrowSmall />
					</div>
				</div>
				<div className={style.header}>
					<Header />
				</div>
				<div className={style.informationLayout}>
				<InformationBoxLayout
					clickedYear={clickedYear}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
				</div>
				<div className={style.filter}>
					<Filter
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
					/>
				</div>
				<div className={style.addbutton} onClick={() => clickHandler()}>
					<AddButton />
					
				</div>
				<div className={style.form}>
						{ showForm ?
             			 <Form />
              			: setShowForm
             			}
					</div>
			</div>
		</div>
	);
};

export default DefaultLayout;

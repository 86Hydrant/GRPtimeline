import React, { useState, useEffect } from 'react';
import style from './Filter.module.css';

const Filter = ({ selectedCategory, setSelectedCategory }) => {
	// filter through input boxes, return ID's if selectedCategory is true
	const editCategoryArray = (checked, id) => {
		const selectedCategoryArray = [...selectedCategory];
		if (checked) {
			selectedCategoryArray.push(id);
		} else if (!checked) {
			selectedCategoryArray.splice(selectedCategoryArray.indexOf(id), 1);
		}
		setSelectedCategory(selectedCategoryArray);
	};

	const filterList = [
		{
			id: 'AllCategories',
			label: 'All Categories',
		},
		{
			id: 'Publication',
			label: 'Publication',
		},
		{
			id: 'Trend',
			label: 'Trend',
		},
		{
			id: 'Event',
			label: 'Event',
		},

		{
			id: 'Program',
			label: 'Program, platform or investment initiative',
		},

		{
			id: 'Framework',
			label: 'Framework: conceptual, evaluative, operational',
		},
	];

	//needed: function so allcategories check all boxes on click

	return (
		<div className={style.filterStyle}>
			{filterList.map((data) => (
				<div>
					<input
						onChange={(event) => {
							let checked = event.target.checked;
							editCategoryArray(checked, data.id);
						}}
						type='checkbox'
						id={data.id}
					></input>{' '}
					<label for={data.id}>{data.label}</label>
				</div>
			))}
		</div>
	);
};

export default Filter;

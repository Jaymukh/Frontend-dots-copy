/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useState, useEffect, useRef } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';

// CSS
import '../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';

// Utilities
import * as Constants from '../../../utils/constants/Constants';

interface FamiliesSortingProps {
	handlePaginationData: (data: any) => void;
	paginationData: any;
}

const FamiliesSorting = ({ handlePaginationData, paginationData }: FamiliesSortingProps) => {
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [selectedItem, setSelectedItem] = useState<Constants.FamiliesSortingItem | null>(Constants.familiesSortingItems[0]);

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		Boolean(anchorEl) ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
	};

	const handleClickMenuItem = (item: Constants.FamiliesSortingItem) => {
		const param = item.param;
		handlePaginationData(param);
		setSelectedItem(item);
		handleClose();
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickOutside = (event: { target: any; }) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			handleClose();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if(paginationData.sort_by === 'updated_time') {
			if(paginationData?.reverse === 'True') {
				setSelectedItem(Constants.familiesSortingItems[1]);
			}
			else{
				setSelectedItem(Constants.familiesSortingItems[0]);
			}
		}
		if(paginationData.sort_by === 'family_name') {
			if(paginationData?.reverse === 'True') {
				setSelectedItem(Constants.familiesSortingItems[3]);
			}
			else{
				setSelectedItem(Constants.familiesSortingItems[2]);
			}
		}
	}, [paginationData?.sort_by]);

	return (
		<div className='family-menu' ref={menuRef}>
			<Button
				theme={ButtonTheme.primary}
				size={ButtonSize.small}
				variant={ButtonVariant.transparent}
				onClick={(e) => handleMenuClick(e)}
				classname='margin-0 h-auto'
			>
				<BiMenuAltLeft className="fs-22" />
			</Button>
			{Boolean(anchorEl) &&
				(<ul className='family-menu-dropdown'>
					{Constants.familiesSortingItems.map((item) => (
						<li
							key={item.key}
							className='family-menu-item d-flex py-2'
							onClick={() => handleClickMenuItem(item)}
						>
							<Heading
								title={item.text}
								colour={selectedItem === item ? TypographyColor.purple : TypographyColor.muted}
								type={TypographyType.h5}
								classname='m-0 p'
							/>
						</li>
					))}
				</ul>)
			}
			<span className={selectedItem ? 'green-circle' : ''}></span>
			
		</div >
	);
}

export default FamiliesSorting;

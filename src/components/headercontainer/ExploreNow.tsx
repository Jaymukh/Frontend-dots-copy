// External libraries
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

// CSS
import '../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
import { SpinnerLite } from '../ui/spinner/SpinnerLite';
import Search from '../ui/search/Search';
import Modal from '../ui/modal/Modal';
import { spinnerLiteState, mapFeatureState } from '../../states';

// Utilities
import WorkInProgressImage from '../../utils/images/WIP-FINAL.svg';
import { RouteConstants } from '../../constants';
import { useMapsService } from '../../services';
import { useMapHelpers } from '../../helpers';


const ExploreNow = () => {
	const mapsService = useMapsService();
	const navigate = useNavigate();
	const [mapFeatures, setMapFeatures] = useRecoilState(mapFeatureState);
	const [spinnerLite, setSpinnerLite] = useRecoilState(spinnerLiteState);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [results, setResults] = useState<any>(mapFeatures.suggestions);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [selectedValue, setSelectedValue] = useState<{ state: string, district: string }>({ state: '', district: '' });
	const [suggestions, setSuggestions] = useState<any>(mapFeatures.suggestions);
	const [hasData, setHasData] = useState(true);
	const { getErrorMsg } = useMapHelpers();

	const handleInputChange = (value: string) => {
		if (!value) {
			setSearchTerm('');
			if (selectedValue.state) {
				setSuggestions(mapFeatures.suggestions.find((item: any) => item.geo_value === selectedValue.state).children)
			}
			else {
				setSuggestions(mapFeatures.suggestions);
			}


		}
		else {
			setSearchTerm(value);
			const result = mapFeatures.suggestions?.filter((item: any) => item?.geo_value?.toLowerCase().includes(value.toLowerCase()));
			setSuggestions(result);
		}
	}

	const handleSelectValue = (value: string) => {
		const filteredData = suggestions?.find((item: any) => item.geo_value?.toLowerCase().includes(value.toLowerCase()));
		setSearchTerm('');
		if (filteredData?.has_data) {
			setHasData(true);
			if (filteredData?.children) {
				setResults([filteredData]);
				setSelectedValue({ ...selectedValue, state: filteredData.geo_value });
				setSuggestions(filteredData.children);
			}
			else {
				// setSelectedValue({ ...selectedValue, district: filteredData.geo_value });
			}
		}
		else {
			setHasData(false);
		}
	}

	const handleCloseSelected = (index: number) => {
		const objKeys: Array<keyof typeof selectedValue> = ['state', 'district'];
		setSelectedValue({ ...selectedValue, [objKeys[index]]: '' });
		if (!index) {
			setSuggestions(mapFeatures.suggestions);
			setResults(mapFeatures.suggestions);
		}
	}

	const handleModalOpen = (flag: boolean) => {
		setShowModal(flag);
		if (flag === true) {
			setSpinnerLite(true);
			mapsService.getExploreNow().then(data => {
				setMapFeatures(prevMapFeatures => ({
					...prevMapFeatures,
					suggestions: data
				}));
				setSuggestions(data);
				setResults(data);
				setSpinnerLite(false);
			}).catch(error => {
				setSpinnerLite(false);
				getErrorMsg(error);
			});
		}
		else {
			setHasData(true);
			setSelectedValue({ state: '', district: '' });
			setSearchTerm('');
		}
	}

	const handleViewAvailableStates = () => {
		setHasData(true);
		setSuggestions(mapFeatures.suggestions);
	}

	const handleClick = (state_id: number, district_id?: number) => {
		setShowModal(false);
		setHasData(true);
		setSelectedValue({ state: '', district: '' });
		setSearchTerm('');
		const search = district_id ? `?country=1&state=${state_id}&district=${district_id}` : `?country=1&state=${state_id}`;
		navigate({
			pathname: RouteConstants.root,
			search: search,
		});
	}

	return (
		<div className='p-0 m-0 d-flex justify-content-start'>
			<Button
				theme={ButtonTheme.primary}
				size={ButtonSize.small}
				variant={ButtonVariant.bordered}
				onClick={() => handleModalOpen(true)}
				classname='d-flex align-items-center'
			>
				<MdOutlineTravelExplore className='margin-right-2 fs-20' />
				Explore Now
			</Button>
			<Modal showModal={showModal} classname='width-62-5 h-100 margin-5 padding-1'>
				<div className='d-flex flex-row justify-content-between margin-bottom-2 margin-left-right-2'>
					<Heading
						title='Explore Now'
						type={TypographyType.h2}
						colour={TypographyColor.dark}
					/>
					<Button
						theme={ButtonTheme.primary}
						variant={ButtonVariant.transparent}
						onClick={() => handleModalOpen(false)}
						type='button'
						classname='padding-left-right-0'
					>
						<AiOutlineClose className="fs-20" />
					</Button>
				</div>
				<div className='' style={{ maxHeight: '68vh', minHeight: '68vh', minWidth: '56.27vw', maxWidth: '60vw' }}>
					<div className='margin-left-right-2'>
						<Body
							type={BodyType.p2}
							color={BodyColor.muted}
							classname='text-start'
						>
							Explore the list of districts on the platform where Points of Interest data has been visualised. Our team is working towards unlocking more regions for you!
						</Body>
						<div className='d-flex flex-row justify-content-start align-items-center margin-2'>
							{Object.values(selectedValue)?.map((item, index) => (
								item &&
								(<>
									<Heading
										title={item}
										type={TypographyType.h4}
										colour={TypographyColor.dark}
										classname='margin-bottom-0'
									/>
									<Button
										theme={ButtonTheme.primary}
										variant={ButtonVariant.transparent}
										onClick={() => handleCloseSelected(index)}
										type='button'
										classname='padding-left-right-0'
									>
										<AiOutlineClose className="fs-20" />
									</Button>
								</>)
							))}

						</div>
						<Search
							handleInputChange={handleInputChange}
							handleSelectValue={handleSelectValue}
							data={mapFeatures.suggestions}
							searchTerm={searchTerm}
							suggestions={suggestions}
							labelKey='geo_value'
							valueKey='geo_value'
							hideSuggestionBox={false}
							placeholderValue={selectedValue?.state ? 'Search by District' : 'Search by State'}
							classname=''
						/>
					</div>
					{hasData ?
						<div className='margin-top-bottom-2 d-flex justify-content-center align-items-start' style={{ height: '52vh', overflowY: 'auto', overflowX: 'hidden', width: '58vw' }}>
							{spinnerLite
								? <SpinnerLite />
								: <div className='' style={{ width: '56.5vw' }}>
									{results?.map((item: any) => (
										(item.has_data &&
											<div key={item.geo_id} className='margin-top-bottom-2'>
												<Heading
													title={item.geo_value}
													type={TypographyType.h4}
													colour={TypographyColor.dark}
													classname='text-start'
													onClick={() => handleClick(item.geo_id)}
												/>
												<hr className='margin-top-0'></hr>
												<div className='row margin-0 padding-0'>
													{item.children.map((district: any) => (
														(item.has_data
															&& <Body
																type={BodyType.p1}
																color={BodyColor.purple}
																classname='col-4 text-start margin-bottom-1 padding-0'
																key={district.geo_id}
																onClick={() => handleClick(item.geo_id, district.geo_id)}
															>
																{district.geo_value}
															</Body>
														)))}
												</div>
											</div>)
									))}
								</div>
							}
						</div> :
						<div className='d-flex justify-content-center align-items-center'>
							<div className="mx-4 margin-top-4 margin-bottom-0 d-flex flex-column justify-content-center align-items-center" style={{ width: '23rem' }}>
								<img src={WorkInProgressImage} className="wip-img" alt="Work in progress" width="60%" />
								<Heading
									title="The state you're Searching is currently unavailable."
									type={TypographyType.h5}
									colour={TypographyColor.dark}
									classname='padding-top-3 margin-bottom-1'
								/>
								<Body
									type={BodyType.p3}
									color={BodyColor.dark}
									classname='text-center margin-top-bottom-3 margin-left-right-0'
								>
									Our team is actively developing these features for the upcoming updates. Keep an eye out for more information.
								</Body>
								<Button
									theme={ButtonTheme.primary}
									size={ButtonSize.small}
									variant={ButtonVariant.bordered}
									onClick={() => handleViewAvailableStates()}>
									View available states
								</Button>
							</div>
						</div>
					}
				</div>
			</Modal>
		</div>
	);
};

export default ExploreNow;
// External libraries
import React, { useState } from "react";
import { useRecoilValue } from 'recoil';
import '../../styles/main.css';
import Select, { SelectSize } from '../ui/select/Select';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import NoVisualData from './NoVisualData';
import { CoreSolutionByEH, cifState } from '../../states';
import { colorDescription } from '../../utils/constants/Constants';
import InfoPanel from "../ui/InfoPanel";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCMore from 'highcharts/highcharts-more'; // Importing the highcharts-more module for packedbubble chart
HCMore(Highcharts); // Initialize the highcharts-more module

interface BubbleGraphProps {
	handleTabClick: (item: CoreSolutionByEH) => void;
}

const BubbleGraph: React.FC<BubbleGraphProps> = ({ handleTabClick }) => {
	const { coreSolutionsData } = useRecoilValue(cifState);
	const options: any[] = [];
	const currentYear = new Date().getFullYear();

	for (let year = currentYear - 10; year <= currentYear; year++) {
		options.push({ key: year, value: year.toString() });
	}

	const [selectedYear, setSelctedYear] = useState(currentYear);

	const handleChangeYear = (event: { target: { value: any; }; }) => {
		const value = event.target.value;
		setSelctedYear(value);
	}
	
	const option = {
		chart: {
			type: 'packedbubble',
			height: 'auto',
			width: window.innerWidth * 0.36,
			style: {
				fontFamily: 'Poppins, sans-serif'
			}
		},
		credits: {
			enabled: false,
		},
		title: {
			text: '',
		},
		tooltip: {
			useHTML: true,
			headerFormat: '',
			pointFormat: '{point.name}: {point.displayPOI}'
		},
		plotOptions: {
			packedbubble: {
				minSize: '20%',
				maxSize: '100%',
				draggable: false,
				friction: 0.9,
				// useSimulation: false,
				layoutAlgorithm: {},
				dataLabels: {
					enabled: true,
					alignTo: 'circle',
					formatter: function (this: any): string {
						var fontSize = Math.ceil(0.09 * this.point.marker.radius + 8);
						return '<span style="font-size: ' + fontSize + 'px">' + this.point.displayValue + '</span>';
					},
					filter: {
						property: 'y',
						operator: '>',
						value: 0
					},
					style: {
						color: '#FFFFFF',
						textOutline: 'none',
						fontWeight: 'normal'
					},
				},
				marker: {
					fillOpacity: 1,
					borderWidth: 0
				},
				legendType: 'point',
				animation: false,
				point: {
					events: {
						click: function (this: any) {
							handleTabClick(coreSolutionsData?.coreSolutionsByEH[this?.index]);
						}
					}
				}
			},
		},
		series: [{
			type: 'packedbubble',
			name: 'Core Solutions by EH',
			data: coreSolutionsData?.coreSolutionsByEH?.map((item) => {
				return {
					name: item.coreSolution,
					value: item.pointsOfInterest,
					displayPOI: item.pointsOfInterest.toLocaleString(),
					z: item.percentageContribution / 100,
					displayValue: `${item.percentageContribution}%`,
					color: colorDescription[item?.type]
				};
			}),
		}],
		legend: {
			enabled: true,
			useHTML: true,
			labelFormatter: function (this: any): string {
				const color = this.color;
				const name = this.name;
				return '<div style="display: flex; align-items: center;"><div style="width: 10px; height: 10px; border-radius: 50%; background-color: ' + color + '; margin-right: 5px;"></div>' + name + '</div>';
			}
		}
	};


	return (
		<div className="h-100 overflow-margin-right">
			<Card size={CardSize.default} variant={CardVariant.contained} classname='padding-3 h-100'>
				<div className='row padding-left-right-2 d-flex justify-content-between'>
					<div className='col-xl-10 col-lg-10 col-md-10 col-sm-8 margin-0 padding-0 d-flex align-items-center'>
						<Heading
							title='Points of Interest by Core Solutions'
							type={TypographyType.h5}
							colour={TypographyColor.dark}
							classname='text-start padding-left-1 margin-top-bottom-0'
						/>
						<InfoPanel text={coreSolutionsData?.infoButton} />
					</div>
					<div className='col-xl-2 col-lg-2 col-md-2 col-sm-4 col-4'>
						<Select
							options={options}
							onChange={handleChangeYear}
							value={selectedYear}
							labelKey='value'
							valueKey='value'
							size={SelectSize.small}
							// disabled={coreSolutionsData?.coreSolutionsByEH?.length > 0 ? false : true}
							disabled={true}
						/>
					</div>
				</div>
				<div className='d-flex justify-content-center align-items-center h-auto w-auto bubble-chart-container'>
					{coreSolutionsData?.coreSolutionsByEH?.length === 0 ?
						<NoVisualData displayImage={true} size='large' /> 
						: <HighchartsReact highcharts={Highcharts} options={option} />
					}
				</div>
			</Card>
		</div>
	)
}

export default BubbleGraph;
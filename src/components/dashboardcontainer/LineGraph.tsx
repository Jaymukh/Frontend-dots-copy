// External libraries
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// CSS
import '../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import NoVisualData from './NoVisualData';
import InfoPanel from '../ui/InfoPanel';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface LineGraphProps {
    classname?: string;
    category: string;
    graphData: any;
    infobutton: string;
}

const LineGraph: React.FC<LineGraphProps> = ({ classname, category, graphData, infobutton }) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (graphData?.length > 1) {
            const xKey = 'period';
            const yKey = 'value';
            const xAxisData = graphData?.map((data: any) => data[xKey]);
            const yAxisData = graphData?.map((data: any) => data[yKey]);
            // const newData = {...data};
            // newData.labels = xAxisData;
            // newData.datasets[0].data = yAxisData;
            const newData = {
                labels: xAxisData,
                datasets: [
                    {
                        data: yAxisData,
                        borderColor: '#367A2B', // Line color
                        backgroundColor: '#ffffff', // Area under the line color
                        pointRadius: 0, // Radius of data points
                        pointBackgroundColor: '#ffffff', // Data point color
                    },
                ],
            }
            setData(newData);
        }
    }, [graphData]);

    const options = {
        // scales: {
        //     y: {
        //         beginAtZero: true,
        //         title: {
        //             display: true,
        //             text: 'EH POPULATION (Million)', // Set the Y axis header text
        //             color: 'black',       // Set the color to black
        //         },
        //     },
        //     x: {
        //         beginAtZero: true,
        //         title: {
        //             display: true,
        //             text: 'YEAR', // Set the Y axis header text
        //             color: 'black',       // Set the color to black                
        //         },
        //     },
        // },
        plugins: {
            tooltip: {
                // mode: 'index',
                intersect: false,
                // yAlign: 'bottom',
                titleColor: '#696B71', // Set the title (header) color
                bodyColor: '#696B71', // Set the body (content) color
                backgroundColor: '#ffffff', // Set the background color
                borderColor: '#CBCBCB',
                borderWidth: 1,
                bodyFontSize: 14,  // Increase body font size
                caretPadding: 10,  // Add padding around the caret
                caretSize: 10,     // Increase caret size
                cornerRadius: 6,   // Adjust corner radius
                xPadding: 12,      // Increase padding on the x-axis
                yPadding: 12,
                callbacks: {
                    label: function (context: any) {
                        const yLabel = context.parsed.y !== null ? context.parsed.y : '';
                        return yLabel;
                    },
                    labelColor: function (context: any) {
                        return {
                            borderColor: 'transparent', // Hide the legend color border
                            backgroundColor: 'transparent' // Hide the legend color background
                        };
                    }
                },
            },
            legend: {
                display: false, // Hide the legend
            },
            hover: {
                mode: 'index',
                intersect: false
            },
        },
        elements: {
            point: {
                radius: 0,
                hoverRadius: 5, // Increase radius on hover
            },
        },
    };

    return (
        <div className={` ${classname}`} style={{height: '100%'}}>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='padding-3 h-100'>
                <div className='d-flex flex-row justify-content-start align-items-center'>
                    <Heading
                        title={category}
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='text-start padding-left-1 margin-top-bottom-0'
                    />
                    <InfoPanel text={infobutton} />
                </div>
                {data
                    ? <Line data={data} options={options} height={60} />
                    : <NoVisualData displayImage={false} />}
            </Card>
        </div>
    )
}

export default LineGraph;
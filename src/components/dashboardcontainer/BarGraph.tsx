// External libraries
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { colorDescription } from '../../utils/constants/Constants';

// CSS
import '../../styles/main.css';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarGraphProps {
    selected: any;
}

const BarGraph: React.FC<BarGraphProps> = ({ selected }) => {
    const xAxisData = selected?.subcategory?.map((data: any) => data['name']);
    const yAxisData = selected?.subcategory?.map((data: any) => data['value']);

    const getOrCreateTooltip = (chart: { canvas: { parentNode: { querySelector: (arg0: string) => any; appendChild: (arg0: any) => void; }; }; }) => {
        let tooltipEl = chart.canvas.parentNode.querySelector('div');
      
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
          tooltipEl.style.borderRadius = '3px';
          tooltipEl.style.color = 'white';
          tooltipEl.style.opacity = 1;
          tooltipEl.style.pointerEvents = 'none';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.transform = 'translate(-50%, 0)';
          tooltipEl.style.transition = 'all .1s ease';
      
          const table = document.createElement('table');
          table.style.margin = '0px';
      
          tooltipEl.appendChild(table);
          chart.canvas.parentNode.appendChild(tooltipEl);
        }
      
        return tooltipEl;
      };
      
      const externalTooltipHandler = (context: { chart: any; tooltip: any; }) => {
        // Tooltip Element
        const {chart, tooltip} = context;
        const tooltipEl = getOrCreateTooltip(chart);
      
        // Hide if no tooltip
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }
      
        // Set Text
        if (tooltip.body) {
          const titleLines = tooltip.title || [];
          const bodyLines = tooltip.body.map((b: { lines: any; }) => b.lines);
      
          const tableHead = document.createElement('thead');
      
          titleLines.forEach((title: string) => {
            const tr = document.createElement('tr');
            tr.style.borderWidth = '0';
      
            const th = document.createElement('th');
            th.style.borderWidth = '0';
            const text = document.createTextNode(title);
      
            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
          });
      
          const tableBody = document.createElement('tbody');
          bodyLines.forEach((body: string, i: string | number) => {
            const colors = tooltip.labelColors[i];
      
            const span = document.createElement('span');
            span.style.background = colors.backgroundColor;
            span.style.borderColor = colors.borderColor;
            span.style.borderWidth = '2px';
            span.style.marginRight = '10px';
            span.style.height = '10px';
            span.style.width = '10px';
            span.style.display = 'inline-block';
      
            const tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
            tr.style.borderWidth = '0';
      
            const td = document.createElement('td');
            td.style.borderWidth = '0';
      
            const text = document.createTextNode(body);
      
            td.appendChild(span);
            td.appendChild(text);
            tr.appendChild(td);
            tableBody.appendChild(tr);
          });
      
          const tableRoot = tooltipEl.querySelector('table');
      
          // Remove old children
          while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
          }
      
          // Add new children
          tableRoot.appendChild(tableHead);
          tableRoot.appendChild(tableBody);
        }
      
        const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
      
        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
        tooltipEl.style.top = positionY + tooltip.caretY + 'px';
        tooltipEl.style.font = tooltip.options.bodyFont.string;
        tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
      };

    const data = {
        labels: xAxisData,
        datasets: [
            {
                label: selected?.coreSolution,
                data: yAxisData,
                backgroundColor: colorDescription[selected?.type],
                borderColor: colorDescription[selected?.type],
                borderWidth: 0,
                borderRadius: 5,
                barPercentage: 0.6,
            },
        ],
    };

    const options = {
        indexAxis: 'y' as 'y',
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    maxWidth: 50,
                    font: {
                        size: 12,
                    },
                },
                title: {
                    display: true,
                    text: 'Count of PoI',
                    font: {
                        size: 12,
                        weight: '600',
                        fontSize: 'black'
                    }
                }
            },
            y: {
                display: true,
                grid: {
                    display: false,
                },

                // ticks: {
                //     callback: (value: any) => `${value}`,
                //   }
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    title: (context: any) => {
                        return `${context[0].dataset.label}`;
                    },
                    label: (context: any) => {
                        const index = context.dataIndex;
                        const description =  selected?.subcategory?.[index].description;
                        return `${description}`;
                    },
                },
                // enabled: false,
                // external: externalTooltipHandler
            },
        },
    };

    return (
        <div className='h-100'>
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarGraph;
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import styles from "./Table.module.css";
import { useMapHelpers } from '../../../helpers';
import { RouteConstants, TableHeaderProps } from '../../../constants';

interface TableProps {
    headers: TableHeaderProps;
    data: any[];
    size: TableSize;
    breakdownType?: string;
    classname?: string;
}

interface TableRowProps {
    KEY: string;
    VALUE: string;
    UOM?: string;
}

export enum TableSize {
    medium,
    large,
    xl,
}

const getSizeClass = (size: TableSize) => {
    let className = "";
    switch (size) {
        case TableSize.medium:
            className = `${styles.table_medium}`;
            break;
        case TableSize.large:
            className = `${styles.table_large}`;
            break;
        case TableSize.xl:
            className = `${styles.table_xl}`;
            break;
    }
    return className;
}

const Table: React.FC<TableProps> = ({ headers, data, size = TableSize.medium, breakdownType, classname }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [tableData, setTableData] = useState<any>(data);
    const [buttonState, setButtonState] = useState<[number, boolean]>([0, false]);
    const { getCurrencyWithSymbol } = useMapHelpers();

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const handleSortTable = (item: TableRowProps, order: string, index: number) => {
        setButtonState([index, order === 'asc' ? true : false]);
        let sortedTable = tableData.slice().sort((a: any, b: any) => {
            const actualKey = item.KEY + 'ActualValue';
            const hasActualValue = tableData.some((obj: any) => obj.hasOwnProperty(actualKey));
            if (a[item.KEY] === null && b[item.KEY] === null) {
                return 0;
            } else if (a[item.KEY] === null) {
                return 1;
            } else if (b[item.KEY] === null) {
                return -1;
            } else if (typeof a[item.KEY] === 'string' && typeof b[item.KEY] === 'string') {
                if (hasActualValue) {
                    return order === 'desc' ? a[actualKey] - b[actualKey] : b[actualKey] - a[actualKey];
                }
                return order === 'desc' ? a[item.KEY].localeCompare(b[item.KEY]) : b[item.KEY].localeCompare(a[item.KEY]);
            } else if (typeof a[item.KEY] === 'number' && typeof b[item.KEY] === 'number') {
                if (hasActualValue) {
                    return order === 'desc' ? a[actualKey] - b[actualKey] : b[actualKey] - a[actualKey];
                }
                return order === 'desc' ? b[item.KEY] - a[item.KEY] : a[item.KEY] - b[item.KEY];
            } else {
                return 0;
            }
        });
        setTableData([...sortedTable])
    }

    const handleColClick = (item: any, keyIndex: number) => {
        if (keyIndex === 0) {
            const geoCode = searchParams.get('geo_code')
            const searchParam = breakdownType === 'State' ? `?country=1&state=${item.geoId}` : `?country=1&state=${geoCode}&district=${item.geoId}`;
            navigate({
                pathname: RouteConstants.root,
                search: searchParam,
            });
        }
    }
    return (
        <div className={`${classname} margin-left-right-1 ${getSizeClass(size)}`}>
            <table>
                <thead>
                    <tr>
                        {headers?.KEYS?.map((item, index) => (
                            <th className='text-start'>
                                <div className='d-flex flex-row align-items-center'>
                                    <p className='padding-top-3 padding-right-2'>{item.KEY === 'geoName' ? breakdownType : item.VALUE}</p>
                                    <div className='d-flex flex-column'>
                                        <BiSolidUpArrow name='desc' className="fs-9" color={`${(buttonState[0] === index) && !buttonState[1] ? '#2B0D5C' : '#939393'}`} onClick={() => handleSortTable(item, 'desc', index)} />
                                        <BiSolidDownArrow name='asc' className="fs-9" color={`${(buttonState[0] === index) && buttonState[1] ? '#2B0D5C' : '#939393'}`} onClick={() => handleSortTable(item, 'asc', index)} />
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData?.map((item: any, index: number) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-light-grey' : ''}`}>
                            {headers?.KEYS?.map((key, keyIndex) => (
                                <td
                                    className={`fs-14 ${keyIndex === 0 ? 'color-purple' : ''}`}
                                    style={{ cursor: `${keyIndex === 0 ? 'pointer' : 'default'}` }}
                                    onClick={() => handleColClick(item, keyIndex)}
                                >
                                    {getCurrencyWithSymbol(item[key.KEY], item[key?.UOM!])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
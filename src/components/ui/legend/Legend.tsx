import { useEffect, useState } from 'react';
import { geoJsonState } from '../../../states';
import styles from './Legend.module.css';
import { useRecoilValue } from 'recoil';
interface LegendProps {
    classname?: string;
}

export const Legend: React.FC<LegendProps> = ({ classname }) => {
    const { legendProperties } = useRecoilValue(geoJsonState);
    const [legendData, setLegendData] = useState(legendProperties);

    useEffect(() => {
        if (legendProperties) {
            setLegendData(legendProperties);
        }
    }, [legendProperties]);

    return (
        <>
            {legendData && legendData?.show &&
                <div className={`row margin-left-right-0 margin-bottom-1 w-100 ${styles.legend_font_style} ${classname}`}>
                    <p className='col-12 margin-0 fs-10'>{legendData?.legend_label}</p>
                    <div className={`col-12 ${styles.legend}`} style={{ background: `linear-gradient(90deg, ${legendData?.legend_start_color} 0%, ${legendData?.legend_end_color} 100%)` }} />
                    <>
                        <p className='margin-0 padding-0 col-4 text-start fs-10'>{legendData?.legend_start}</p>
                        <p className='margin-0 padding-0 col-4 text-middle fs-10'>{legendData?.legend_mid}</p>
                        <p className='margin-0 padding-0 col-4 text-end fs-10'>{legendData?.legend_end}</p>
                    </>
                </div>}
        </>
    );
};
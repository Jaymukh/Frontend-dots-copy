// CSS
import '../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from './ui/typography/Heading'
import Body, { BodyColor, BodyType } from './ui/typography/Body';

// Utilities
import * as Constants from '../utils/constants/Constants';


const GlobalOverlayCard = () => {
    const item = Constants.countryData[0];
    var cardItems = [
        {
            value: item.population,
            title: "Aspirational Citizens",
        },
        {
            value: item.entrepreneurialHouseholds,
            title: "Entrepreneurial Households (EH)",
        },
        {
            value: item.medianSpendonCoreSoln,
            title: "Median Annual EH Income for Core Solutions",
        },
        {
            value: item.tam,
            title: "Total Addressable Market",
        }
    ];
    return (
        <div className='d-flex bg-transparent margin-top-bottom-2' style={{ position: 'absolute', top: '0', zIndex: 1000 }}>
            {cardItems.map((data, index) => (
                <div key={data.value} className={`d-flex flex-column padding-left-right-4 padding-top-bottom-3 margin-top-bottom-4 h-100 ${index < 3 ? 'right-border' : ''}`}>
                    <Heading
                        title={data.value}
                        colour={TypographyColor.dark}
                        type={TypographyType.h6}
                        classname={`fs-31 text-center ${index === 3 ? 'color-green' : ''}`} />
                    {/* <h5 className={`fs-31 font-weight-500 text-center ${index === 3 ? 'insight-bar-green-color' : ''}`}>{data.value}</h5> */}
                    {/* <p className='fs-15 font-lato font-weight-500 text-center grey-light-color'>{data.title}</p> */}
                    <Body
                        type={BodyType.p1}
                        color={BodyColor.muted}>
                        {data.title}
                    </Body>
                </div>
            ))}
        </div>
    )
}

export default GlobalOverlayCard;
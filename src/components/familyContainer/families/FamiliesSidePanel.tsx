// External libraries
import { useRecoilValue } from 'recoil';

// CSS
import '../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import { Legend } from '../../ui/legend/Legend';
import StaticMap from '../../ui/maps/StaticMap';
import { storiesState } from '../../../states';


const FamiliesSidePanel = () => {
    const stories = useRecoilValue(storiesState);
    return (
        <div className='col-lg-3 col-md-4 col-sm-12 d-flex flex-column margin-top-bottom-4 padding-left-right-3 h-auto'>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='padding-top-bottom-3 margin-left-right-0 margin-top-0 margin-left-3 bg-white'>
                <Heading
                    title={stories?.properties?.region}
                    colour={TypographyColor.dark}
                    type={TypographyType.h5}
                    classname='margin-0 text-start'
                />
                <div className='map-container-sm d-flex mx-auto justify-content-start'>
                    <StaticMap />
                </div>
                <Legend classname='margin-top-2'/>
            </Card>
        </div>
    );
}

export default FamiliesSidePanel;

// External libraries
import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// CSS
import '../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';

// Utilities
import { RouteConstants } from '../../constants';
import * as Constants from '../../utils/constants/Constants'
import { useMapHelpers } from '../../helpers';
import familySkeleton from '../../utils/images/EH Sillhouettes-5-01.svg';
import { spinnerState } from '../../states';
import { useSetRecoilState } from 'recoil';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';


interface MapPopupProps {
    properties: any;
    handleFocused: (index: number) => void;
    index: number;
}

const MapPopup: React.FC<MapPopupProps> = ({ properties, handleFocused, index }) => {
    const navigate = useNavigate();
    const { getCoreSolutions } = useMapHelpers();
    const setSpinner = useSetRecoilState(spinnerState);

    const [loaded, setLoaded] = useState(false);

    const handleImageLoad = () => {
        setLoaded(true);
    }

    const handlePopupClick = (geoIdArray: any[], geoHierarchyLevel: number) => {
        let geo_id = geoHierarchyLevel === 1 ? geoIdArray[1] : geoIdArray[0];
        navigate({
            pathname: RouteConstants.stories,
            search: `?geo_code=${geo_id}&page_no=1&storiespp=${Constants.storiesSelectOptions[0].value}`,
        });
        setSpinner(true);
    };

    return (
        <div className="map-popup-grey-text rounded row p-0 m-0" onClick={() => handleFocused(index)}>
            <div className="col-3 padding-left-right-0 position-relative d-flex align-items-start">
                {!loaded && <div className="d-flex justify-content-center align-items-center image-placeholder position-absolute"></div>}
                <img className="map-popup-story-img rounded" src={properties.image && properties.image.length > 0 ? properties.image : familySkeleton} alt={properties.familyName} onLoad={handleImageLoad} />
            </div>
            <div className="col-9 p-0 d-flex flex-column justify-content-start">
                <Heading
                    title={properties?.familyName}
                    // colour={isFocused ? TypographyColor.purple : TypographyColor.gray}
                    colour={TypographyColor.gray}
                    type={TypographyType.h6}
                    classname='m-0 p-0 text-start'
                />
                <Body
                    type={BodyType.p4}
                    color={BodyColor.secondary}
                    classname='map-popup-description text-start margin-top-bottom-0'
                >
                    <span className="">{properties.familyDetails.familyMembers} </span>
                    Family members
                </Body>
                <Body
                    type={BodyType.p4}
                    color={BodyColor.secondary}
                    classname='map-popup-description text-start margin-top-bottom-0'
                >
                    <span className="color-purple">{getCoreSolutions(properties.familyDetails)?.value} </span>
                    Annual household spend on {getCoreSolutions(properties.familyDetails)?.name}
                </Body>
                <Button
                    theme={ButtonTheme.primary}
                    size={ButtonSize.small}
                    variant={ButtonVariant.transparent}
                    // onClick={() => handlePopupClick(properties.parentID)}
                    onClick={() => handlePopupClick(properties.parent_id, properties.geoHierarchyLevel)}
                    classname='h-auto padding-left-0 m-0 p-0'
                >
                    Read more
                    <FiArrowRight className="margin-left-1" />
                </Button>
            </div>
        </div>
    );
};

export default MapPopup;

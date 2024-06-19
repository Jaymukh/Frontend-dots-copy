/* eslint-disable @typescript-eslint/no-unused-vars */
// External libraries
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

// CSS
import '../../styles/main.css';

// Components
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../ui/typography/Body';
import { ProgressBar } from '../ui/progressbar/ProgressBar';
import { mapFeatureState, storiesState } from '../../states';

// Utilities
import { useMapHelpers } from '../../helpers';
import { RouteConstants } from '../../constants';
import * as Constants from '../../utils/constants/Constants';
import familySkeleton from '../../utils/images/EH Sillhouettes-5-01.svg';
import InfoPanel from '../ui/InfoPanel';


const FamilyDetails = () => {
    const navigate = useNavigate();
    const mapFeatures = useRecoilValue(mapFeatureState);
    const { getCurrencyWithSymbol, getCoreSolutions } = useMapHelpers();
    const { family, properties } = useRecoilValue(storiesState);
    const [familyDetails, setFamilyDetails] = useState<any>({});
    const [description, setDescription] = useState('');
    const [loaded, setLoaded] = useState(false);

    const handleViewButtonClick = () => {
        navigate({
            pathname: RouteConstants.stories,
            search: `?geo_code=${properties?.geo_id}&page_no=1&storiespp=${Constants.storiesSelectOptions[0].value}`,
        });
    };

    const handleImageLoad = () => {
        setLoaded(true);
    };

    useEffect(() => {
        if (family?.length > 0) {
            setFamilyDetails(family[0]);
        }
    }, [family]);

    useEffect(() => {
        if (familyDetails?.description && familyDetails?.description[0]) {
            const charLimit = 580;
            if (familyDetails?.description[0]?.length > charLimit) {
                const shortDescription = familyDetails?.description[0]?.slice(0, charLimit) + '...';
                setDescription(shortDescription);
            }
            else {
                setDescription(familyDetails?.description[0]);
            }
        }
    }, [familyDetails?.description]);

    return (
        <div className='margin-left-right-0'>
            <div className='row d-flex justify-content-between align-items-center padding-top-bottom-2 margin-0'>
                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 padding-0'>
                    <Heading
                        title={properties?.name}
                        type={TypographyType.h2}
                        colour={TypographyColor.dark}
                        classname='text-start'
                    />
                </div>
                {(mapFeatures?.cifData?.properties?.geo_name !== 'district') &&
                    <div className='co-xl-5 col-lg-5 col-md-6 col-sm-12 col-12 d-flex align-items-center justify-content-around padding-top-bottom-2 coverage-div'>
                        <Heading
                            title='PoI Coverage'
                            colour={TypographyColor.dark}
                            type={TypographyType.h5}
                            classname='margin-top-2 w-auto text-end text-nowrap '
                        />
                        <InfoPanel text={mapFeatures?.cifData?.properties?.EICoverage?.infobutton} classname='margin-right-1' />
                        <ProgressBar coverage={mapFeatures?.cifData?.properties?.EICoverage} />
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.dark}
                            classname='w-auto margin-0 text-end text-nowrap padding-left-2'>
                            {getCurrencyWithSymbol(mapFeatures?.cifData?.properties?.EICoverage?.covered)} out of {getCurrencyWithSymbol(mapFeatures?.cifData?.properties?.EICoverage?.total)} Districts
                        </Body>
                    </div>}
            </div>
            {family?.length > 0
                && <Card size={CardSize.default} variant={CardVariant.contained} classname='margin-left-right-0 margin-top-2 padding-0 row'>
                    {/* {!loaded && <div className="image-placeholder w-100 h-100 position-absolute"></div>} */}
                    <div className='col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12 padding-right-0 padding-left-0 position-relative' >
                        {!loaded && <div className="d-flex justify-content-center align-items-center image-placeholder position-absolute" ></div>}
                        <img className='rounded-start' src={familyDetails?.image && familyDetails?.image[0] ? familyDetails?.image[0] : familySkeleton} alt={familyDetails?.familyName} style={{ objectFit: 'cover', width: '100%', height: '100%' }} onLoad={handleImageLoad} />
                    </div>
                    <div className='col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12 bg-white padding-top-bottom-4 padding-left-right-4 rounded-end'>
                        <div className='d-flex flex-row margin-bottom-2'>
                            <Heading
                                title={familyDetails?.familyName}
                                colour={TypographyColor.dark}
                                type={TypographyType.h4}
                                classname='margin-0'
                            />
                            <Body
                                type={BodyType.p3}
                                color={BodyColor.secondary}
                                classname='margin-left-3'>
                                {familyDetails?.address}
                            </Body>
                        </div>
                        {getCoreSolutions(familyDetails?.familyDetails)?.name &&
                            <div className='d-flex flex-row margin-bottom-2'>
                                <Body
                                    type={BodyType.p2}
                                    color={BodyColor.purple}
                                    classname='text-center'>
                                    {getCoreSolutions(familyDetails?.familyDetails)?.value}
                                </Body>
                                <Body
                                    type={BodyType.p4}
                                    color={BodyColor.secondary}
                                    classname='margin-left-2 margin-right-4 margin-top-1'>
                                    Annual Household Spend on {getCoreSolutions(familyDetails?.familyDetails)?.name}
                                </Body>
                            </div>
                        }
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.secondary}
                            classname='text-start'>
                            {description}
                        </Body>
                        <div className='d-flex justify-content-start margin-top-2'>
                            <button className='rounded text-start padding-left-0 border-0 fs-10 bg-white ff-poppins-medium color-purple' onClick={() => handleViewButtonClick()}>View all families<FiArrowRight className='margin-left-2 fs-18' /></button>
                        </div>
                    </div>
                </Card>
            }
        </div>
    )
}

export default FamilyDetails;
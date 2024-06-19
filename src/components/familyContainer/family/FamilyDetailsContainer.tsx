// External libraries
import { useEffect, useState } from 'react';

// CSS
import '../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../ui/typography/Body';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';

// Utilities
import { useMapHelpers } from '../../../helpers';

interface FamilyDetailsContainerProps {
    selectedData: any; // Update with appropriate type
}

const FamilyDetailsContainer: React.FC<FamilyDetailsContainerProps> = ({ selectedData }) => {
    const { getCoreSolutions, getNumberWithZero } = useMapHelpers();
    const [loaded, setLoaded] = useState([false, false, false]); // Initialize loaded state for three images

    const handleImageLoad = (index: number) => {
        const updatedLoadedState = [...loaded];
        updatedLoadedState[index] = true;
        setLoaded(updatedLoadedState);
    };

    useEffect(() => {
        // mapServices?.getCifData(Number(searchParams.get('geo_code')!)).then((response) => {
        //     if (response) {
        //         setMapFeatures(prevMapFeatures => ({ ...prevMapFeatures, cifData: response }));
        //     }
        // }).catch(error => {
        //     const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        //     setError({ type: 'Error', message: errorMsg });
        // });
    }, []);

    return (
        <div className='col-lg-8 col-md-8 col-sm-12 margin-top-bottom-4 ' >
            <div className='no-scrollbar' style={{ height: '86.25vh', overflow: 'auto' }} >
                <Card size={CardSize.default} variant={CardVariant.contained} classname='margin-bottom-5 padding-3'>
                    <div className='d-flex flex-row justify-content-between padding-bottom-1'>
                        <div className="d-flex flex-column align-items-start justify-content-start text-start">
                            <Heading
                                title={selectedData?.familyName}
                                type={TypographyType.h4}
                                colour={TypographyColor.dark}
                                classname='margin-bottom-0'
                            />
                            <Body
                                type={BodyType.p3}
                                color={BodyColor.secondary}
                                classname='margin-top-0' >
                                {selectedData?.address}
                            </Body>
                        </div>
                        <div className="d-flex flex-column align-items-end justify-content-start text-end">
                            {getCoreSolutions(selectedData?.familyDetails)?.name &&
                                <>
                                    <Heading
                                        title={getCoreSolutions(selectedData?.familyDetails)?.value}
                                        type={TypographyType.h5}
                                        colour={TypographyColor.purple}
                                        classname='margin-top-bottom-0'
                                    />
                                    <Body
                                        type={BodyType.p4}
                                        color={BodyColor.secondary}
                                    >
                                        Annual Household Spend on {getCoreSolutions(selectedData?.familyDetails)?.name}
                                    </Body>
                                </>
                            }
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center justify-content-between margin-top-bottom-2">
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            <Heading
                                title={getNumberWithZero(selectedData?.familyDetails?.familyMembers)}
                                type={TypographyType.h5}
                                colour={TypographyColor.dark}
                                classname='margin-0 margin-right-1'
                            />
                            <Body
                                type={BodyType.p4}
                                color={BodyColor.secondary}
                                classname='margin-0'>
                                Family members
                            </Body>
                        </div>
                        {/* <div className="d-flex flex-row justify-content-center align-items-center">
                            <Heading
                                title={getCurrencyWithSymbol(selectedData?.familyDetails?.householdSpend, selectedData?.familyDetails?.spendUOM)}
                                type={TypographyType.h5}
                                colour={TypographyColor.dark}
                                classname='margin-0 margin-right-1'
                            />
                            <Body
                                type={BodyType.p4}
                                color={BodyColor.secondary}
                                classname='margin-0'>
                                Household Spend
                            </Body>

                        </div>
                        <div className="d-flex flex-row justify-content-center align-items-center">
                            <Heading
                                title={getCurrencyWithSymbol(selectedData?.familyDetails?.householdBorrowing, selectedData?.familyDetails?.borrowUOM)}
                                type={TypographyType.h5}
                                colour={TypographyColor.dark}
                                classname='margin-0 margin-right-1'
                            />
                            <Body
                                type={BodyType.p4}
                                color={BodyColor.secondary}
                                classname='margin-0'>
                                Household Borrowing
                            </Body>
                        </div>
                        <div className="d-flex flex-row align-items-center">
                            <Heading
                                title={getCurrencyWithSymbol(selectedData?.familyDetails?.householdIncome, selectedData?.familyDetails?.incomeUOM)}
                                type={TypographyType.h5}
                                colour={TypographyColor.dark}
                                classname='margin-0 margin-right-1'
                            />
                            <Body
                                type={BodyType.p4}
                                color={BodyColor.secondary}
                                classname='margin-0'>
                                Household Income
                            </Body>
                        </div > */}
                    </div >
                    <div className="card-body text-start">
                        {selectedData?.image && selectedData?.image[0]
                            && <div className='position-relative'>
                                {!loaded[0] && <div className="d-flex justify-content-center align-items-center image-placeholder position-absolute" ></div>}
                                <img src={selectedData?.image[0]} alt="Family" width="100%" style={{ width: '100%', maxHeight: '60vh', objectFit: 'cover' }} className='rounded margin-top-bottom-2' onLoad={() => handleImageLoad(0)} />
                            </div>
                        }
                        {selectedData?.description && selectedData?.description[0]
                            && <Body
                                type={BodyType.p3}
                                color={BodyColor.secondary}
                                classname='margin-top-2 description'
                            >
                                {selectedData?.description[0]}
                            </Body>
                        }
                        <div className='d-flex flex-row justify-content-around margin-top-bottom-2'>
                            {selectedData?.image && selectedData?.image[1]
                                && <div className='position-relative'>
                                    {!loaded[1] && <div className="d-flex justify-content-center align-items-center image-placeholder position-absolute" ></div>}
                                    <img src={selectedData?.image[1]} alt="Family" width="50%" height="auto" className='rounded margin-right-1' onLoad={() => handleImageLoad(1)} />
                                </div>
                            }
                            {selectedData?.image && selectedData?.image[2]
                                && <div className='position-relative'>
                                    {!loaded[2] && <div className="d-flex justify-content-center align-items-center image-placeholder position-absolute" ></div>}
                                    <img src={selectedData?.image[2]} alt="Family" width="50%" height="auto" className='rounded' onLoad={() => handleImageLoad(2)} />
                                </div>
                            }
                        </div>
                        {/* {selectedData?.description && selectedData?.description[1]
                            && <Body
                                type={BodyType.p3}
                                color={BodyColor.secondary}
                            >
                                {selectedData?.description[1]}
                            </Body>
                        } */}
                    </div>
                </Card >
            </div >
        </div >
    );
};

export default FamilyDetailsContainer;



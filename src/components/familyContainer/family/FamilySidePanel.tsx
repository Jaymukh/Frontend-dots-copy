// External libraries
import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { MdOutlineArrowBack, MdOutlineArrowForward } from 'react-icons/md';
import { IoIosArrowRoundForward } from "react-icons/io";

// CSS
import '../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../ui/typography/Body';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import StaticMap from '../../ui/maps/StaticMap';
import { Legend } from '../../ui/legend/Legend';
import { storiesState } from "../../../states";

// Utilities
import familySkeleton from '../../../utils/images/EH Sillhouettes-5-01.svg';


interface FamilySidePanelProps {
    selectedStory: { index: number, story: any };
    handleCarouselSlide: (index: number) => void;
    iterator: number;
    handleBackClick: () => void;
}

const FamilySidePanel: React.FC<FamilySidePanelProps> = ({ selectedStory, handleCarouselSlide, iterator, handleBackClick }) => {
    const [stories] = useRecoilState(storiesState);
    const [loaded, setLoaded] = useState<boolean[]>([]);

    // Initialize loaded state for each image
    useEffect(() => {
        if (stories?.family) {
            const initialLoadedState = stories.family.map(() => false);
            setLoaded(initialLoadedState);
        }
    }, [stories]);

    const handleImageLoad = (index: number) => {
        const updatedLoadedState = [...loaded];
        updatedLoadedState[index] = true;
        setLoaded(updatedLoadedState);
    };

    return (
        <div className='col-lg-4 col-md-4 col-sm-12 d-flex flex-column margin-top-bottom-4 padding-left-right-3 h-auto'>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='padding-top-bottom-3 margin-left-right-0 bg-white'>
                <Heading
                    title={stories?.properties?.region}
                    colour={TypographyColor.dark}
                    type={TypographyType.h5}
                    classname='text-start margin-0'
                />
                <div className='map-container-sm d-flex mx-auto justify-content-start'>
                    <StaticMap coordinates={selectedStory?.story?.geometry?.coordinates} />
                </div>
                <Legend classname='margin-top-2' />
            </Card>
            <div className='d-flex flex-row justify-content-center align-items-center margin-top-bottom-3 w-100' >
                <button className="PrevBtn"
                    onClick={() => handleCarouselSlide((selectedStory?.index - 1 + stories?.family.length) % stories?.family.length)}
                    type="button"
                >
                    <MdOutlineArrowBack className="iconNextPrev fs-20" aria-hidden="true" />
                </button>
                <div className="h-100" style={{ width: '95%' }}>
                    {stories?.family?.map((data, index) => (
                        <div className={`carousel-item h-100 ${index === selectedStory?.index ? ' active' : ''}`} key={index}>
                            <div className="d-flex flex-row align-items-center h-100 w-100 rounded">
                                <div className='position-relative'>
                                    {!loaded[index] && <div className="d-flex justify-content-center align-items-center image-placeholder position-absolute" ></div>}
                                    <img src={data?.image && data?.image[0] ? data?.image[0] : familySkeleton} className="d-block carousel-img rounded-start bg-white" alt="Family" onLoad={() => handleImageLoad(index)} />
                                </div>
                                <div className="d-flex flex-column align-items-start justify-content-center my-auto padding-left-3 padding-right-2 w-100 h-100 rounded-end bg-white">
                                    <div className='d-flex flex-row justify-content-end align-items-center w-100 m-auto margin-top-bottom-0 padding-top-bottom-0' >
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.dark}
                                        >
                                            {iterator}/{stories?.family.length}
                                        </Body>
                                    </div>
                                    <Heading
                                        title={data?.familyName}
                                        type={TypographyType.h4}
                                        colour={TypographyColor.dark}
                                        classname='text-start margin-0'
                                    />
                                    <Body
                                        type={BodyType.p3}
                                        color={BodyColor.secondary}
                                        classname='margin-top-bottom-1 text-start'
                                    >
                                        {data?.address}
                                    </Body>
                                    <button className='border-0 bg-white color-purple margin-0 fs-10 padding-0 ff-poppins-medium' onClick={handleBackClick}>View all<IoIosArrowRoundForward fontWeight={500} className='margin-left-1 fs-20' /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="NextBtn"
                    onClick={() => handleCarouselSlide((selectedStory?.index + 1 + stories?.family.length) % stories?.family.length)}
                    type="button"
                >
                    <MdOutlineArrowForward className='iconNextPrev fs-20' aria-hidden="true" />
                </button>
            </div>
        </div >
    );
}

export default FamilySidePanel;

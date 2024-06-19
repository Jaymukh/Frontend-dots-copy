/* eslint-disable react-hooks/exhaustive-deps */

// External libraries
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { AiOutlineClose } from "react-icons/ai";

// CSS
import '../../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../../ui/typography/Body';
import Modal from '../../ui/modal/Modal';
import { spinnerLiteState } from '../../../states';

// Utilities
import * as Constants from '../../../utils/constants/Constants';
import { SpinnerLite } from '../../ui/spinner/SpinnerLite';

interface RoadmapModalProps {
    showRoadmap: number;
    setShowRoadmap: (showRoadmap: number) => void;
    openRoadmapModal: boolean;
    setOpenRoadmapModal: (openRoadmapModal: boolean) => void;
    handleRoadmapClick: (openRoadmapModal: boolean) => void;
    handleRoadmapContactDrawer: (roadmapContactDrawerOpen: boolean) => void;
}

const RoadmapModal: React.FC<RoadmapModalProps> = ({ showRoadmap, setShowRoadmap, openRoadmapModal, setOpenRoadmapModal, handleRoadmapContactDrawer }) => {

    const setSpinnerLite = useSetRecoilState(spinnerLiteState);
    const [imageLoaded, setImageLoaded] = useState(false);

    const nextRoadmap = () => {
        if (showRoadmap < Constants.roadmapContent.length) {
            setShowRoadmap(showRoadmap + 1);
        }
        else {
            setOpenRoadmapModal(false);
        }
    };
    const previousHelp = () => {
        if (showRoadmap > 0) {
            setShowRoadmap(showRoadmap - 1);
        }
    };
    const handleContactNow = () => {
        setOpenRoadmapModal(false);
        handleRoadmapContactDrawer(true);
    };
    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    useEffect(() => {
        setSpinnerLite(!imageLoaded);
    }, [imageLoaded]);

    return (
        <div>
            <Modal showModal={openRoadmapModal} classname='width-62-5'>
                <div style={{ height: '70vh' }} className='d-flex flex-column justify-content-between'>
                    <div className='d-flex flex-row justify-content-end w-100 padding-bottom-1'>
                        <Button type="button" theme={ButtonTheme.primary} variant={ButtonVariant.transparent} classname='padding-left-right-0'onClick={() => setOpenRoadmapModal(false)}>
                        <AiOutlineClose className="fs-20" />
                        </Button>
                    </div>
                    <div className='d-flex flex-row align-items-center margin-left-right-3' style={{height: '52.5vh'}}>
                        <div className="col-5 d-flex flex-row justify-content-start align-items-center" style={{ height: '52.5vh', width: '26vw' }}>
                            <img src={Constants.roadmapContent[showRoadmap - 1].image} onLoad={handleImageLoad} alt="Core Solutions" width='85%' style={{ display: imageLoaded? 'block' : 'none' }} /> 
                            {(imageLoaded === false)  && <SpinnerLite /> }
                        </div>
                        <div className="col-7 d-flex flex-column justify-content-center align-items-start text-start padding-right-2">
                            <Heading
                                title={Constants.roadmapContent[showRoadmap - 1].title}
                                type={TypographyType.h2}
                                colour={TypographyColor.dark}
                                classname='test-start margin-bottom-3'
                            />
                            <Body
                                type={BodyType.p2}
                                color={BodyColor.dark}
                                classname='text-start'
                            >
                                {Constants.roadmapContent[showRoadmap - 1].description}
                            </Body>
                            {(showRoadmap === Constants.roadmapContent.length)
                                && <Button
                                    theme={ButtonTheme.secondary}
                                    size={ButtonSize.default}
                                    variant={ButtonVariant.bordered}
                                    classname='h-2 margin-top-4'
                                    onClick={() => handleContactNow()}
                                >
                                    Contact Now
                                </Button>}
                        </div>
                    </div>
                    <div className='d-flex flex-row justify-content-between align-items-center margin-bottom-2 margin-left-right-3 padding-left-5 padding-right-2'>
                        <Body
                            type={BodyType.p2}
                            color={BodyColor.dark}
                            classname='text-start'
                        >
                            {showRoadmap}/{Constants.roadmapContent.length}
                        </Body>
                        <div className='d-flex flex-row justify-items-end align-items-center' >
                            {(showRoadmap > 1)
                                && <Button
                                    theme={ButtonTheme.secondary}
                                    size={ButtonSize.default}
                                    variant={ButtonVariant.bordered}
                                    classname='h-2 margin-right-2'
                                    onClick={previousHelp}
                                >
                                    Previous
                                </Button>
                            }
                            <Button
                                theme={ButtonTheme.primary}
                                size={ButtonSize.default}
                                variant={ButtonVariant.bordered}
                                classname='h-2'
                                onClick={nextRoadmap}
                            >
                                {(showRoadmap < Constants.roadmapContent.length) ? 'Next' : 'Continue'}
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default RoadmapModal;

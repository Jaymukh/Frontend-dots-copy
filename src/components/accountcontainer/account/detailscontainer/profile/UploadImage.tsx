// External libraries
import React, { useRef } from 'react';
import { useRecoilValue } from "recoil";
import Cropper from 'react-easy-crop';
import { BiUpload } from 'react-icons/bi';
import { MdDeleteSweep } from 'react-icons/md'
import { AiFillMinusCircle, AiFillPlusCircle, AiOutlineClose } from 'react-icons/ai';
import { IoMdCheckmark } from "react-icons/io";

// CSS
import '../../../../../styles/main.css';

// Componentss
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../../../ui/typography/Body';
import Modal from '../../../../ui/modal/Modal';
import { loggedUserState, User } from "../../../../../states";


interface UploadImageProps {
    showUploadImageModal: boolean;
    closeUploadImageModal: () => void;
    handleImageChange: (event: any) => void;
    zoom: number;
    setZoom: (level: number) => void;
    newImage: string | undefined;
    handleSaveImage: () => void;
    handleZoomIn: () => void;
    handleZoomOut: () => void;
    handleSliderChange: (e: any) => void;
    minZoom: number;
    maxZoom: number;
    handleDeleteModel: (showDeleteImageModal: boolean) => void;
    handleCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
    crop: any;
    setCrop: any;
}

const UploadImage: React.FC<UploadImageProps> = ({
    showUploadImageModal,
    closeUploadImageModal,
    handleImageChange,
    zoom,
    setZoom,
    newImage,
    handleSaveImage,
    handleZoomIn,
    handleZoomOut,
    handleSliderChange,
    minZoom,
    maxZoom,
    handleDeleteModel,
    handleCropComplete,
    crop,
    setCrop,
}) => {
    const loggedUser = useRecoilValue<User>(loggedUserState);
    const imageRef = useRef(null);

    return (
        <div>
            <Modal showModal={showUploadImageModal} >
                <div className=''>
                    <div className='d-flex flex-row justify-content-between align-items-center margin-top-1 margin-bottom-3'>
                        <Heading
                            title={newImage ? 'Update Profile Photo' : 'Profile Photo'}
                            type={TypographyType.h4}
                            colour={TypographyColor.dark}
                            classname='margin-0'
                        />
                        <Button type="button" theme={ButtonTheme.primary} variant={ButtonVariant.transparent} classname='padding-left-right-0' onClick={() => closeUploadImageModal()}>
                        <AiOutlineClose className="fs-20" />
                        </Button>
                    </div>
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        {newImage ?
                            <>
                                <div className='upload-image-box mx-auto' style={{ maxWidth: '500px', position: 'relative' }}>
                                    <Cropper
                                        image={newImage || ''}
                                        crop={crop}
                                        zoom={zoom}
                                        rotation={0}
                                        aspect={1}
                                        onZoomChange={setZoom}
                                        onCropChange={setCrop}
                                        onCropComplete={handleCropComplete}
                                    />
                                </div>
                                <div className='d-flex flex-row justify-content-around align-items-center w-100 margin-left-right-0 margin-bottom-3 margin-top-4'>
                                    <Button
                                        theme={ButtonTheme.primary}
                                        size={ButtonSize.medium}
                                        variant={ButtonVariant.transparent}
                                        onClick={() => handleZoomOut()}
                                        type='button'
                                        classname='w-auto m-auto padding-left-0 padding-right-2'
                                    >
                                        <AiFillMinusCircle className="fs-22" />
                                    </Button>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        value={zoom}
                                        onChange={(event) => handleSliderChange(event.target.value)}
                                    // style={{ background: `linear-gradient(to right, rgba(17, 24, 39, 1) ${(zoomLevel/2) - 10}%, rgba(217, 217, 217, 1) ${110 - (zoomLevel/2)}%)` }}
                                    />
                                    <Button
                                        theme={ButtonTheme.primary}
                                        size={ButtonSize.medium}
                                        variant={ButtonVariant.transparent}
                                        onClick={() => handleZoomIn()}
                                        type='button'
                                        classname='w-auto m-auto padding-left-2 padding-right-0'
                                    >
                                        <AiFillPlusCircle className="fs-22" />
                                    </Button>
                                </div>
                                <Button
                                    theme={ButtonTheme.primary}
                                    size={ButtonSize.default}
                                    variant={ButtonVariant.bordered}
                                    onClick={() => handleSaveImage()}
                                    type='button'
                                    classname=''
                                >
                                    <IoMdCheckmark className='margin-right-2 fs-20' />
                                    Save
                                </Button>
                            </> :
                            (loggedUser?.profile_picture ? (
                                <>
                                    <div className="upload-image-box margin-bottom-3 d-flex justify-content-center align-items-center bg-light" >
                                        <img src={loggedUser?.profile_picture} ref={imageRef} alt="Profile" className='w-100 h-100' />
                                    </div>
                                    <div className="w-100 d-flex flex-row justify-content-between align-items-center margin-top-1">
                                        <Button
                                            theme={ButtonTheme.secondary}
                                            size={ButtonSize.small}
                                            variant={ButtonVariant.bordered}
                                            onClick={() => handleDeleteModel(true)}
                                            type='button'
                                            classname='margin-right-2'
                                        >
                                            <MdDeleteSweep className='color-orange margin-right-2 fs-20' />
                                            Delete
                                        </Button>
                                        <label className="bg-purple rounded padding-left-right-3 height-2-25 d-flex align-items-center justify-content-center">
                                            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                            <div className="d-flex">
                                                <BiUpload className='margin-right-2 text-white fs-20' />
                                                <Body
                                                    color={BodyColor.white}
                                                    type={BodyType.p3}
                                                >
                                                    Upload new photo
                                                </Body>
                                            </div>
                                        </label>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="upload-image-box margin-bottom-4 d-flex justify-content-center align-items-center bg-light" >
                                        <span className='m-auto fs-64 w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{ backgroundColor: '#2B0D5C', color: '#ffffff' }}>{loggedUser.initial}</span>
                                    </div>
                                    <label className="bg-purple rounded padding-3 height-2-25 d-flex align-items-center justify-content-center"  style={{ width: 'fit-content' }}>
                                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                        <div className="d-flex">
                                            <BiUpload className='margin-right-2 text-white fs-20' />
                                            <Body
                                                color={BodyColor.white}
                                                type={BodyType.p3}
                                            >
                                                Upload new photo
                                            </Body>
                                        </div>
                                    </label>
                                </>
                            ))
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UploadImage;
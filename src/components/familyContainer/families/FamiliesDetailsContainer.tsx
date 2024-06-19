/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

// CSS
import '../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import Body, { BodyColor, BodyType } from '../../ui/typography/Body';
import { Card, CardSize, CardVariant } from '../../ui/card/Card';
import Select, { SelectSize } from '../../ui/select/Select';
import FamiliesSorting from './FamiliesSorting';
import { storiesState, mapFeatureState } from '../../../states';

// Utilities
import { storiesSelectOptions } from '../../../utils/constants/Constants';
import familySkeleton from '../../../utils/images/EH Sillhouettes-5-01.svg';
import { RouteConstants } from '../../../constants';
import { useStoriesService, useMapsService } from '../../../services';
import { useMapHelpers } from '../../../helpers';


const FamiliesDetailsContainer = () => {
    const navigate = useNavigate();
    const storiesService = useStoriesService();
    const [searchParams, setSearchParams] = useSearchParams();
    const [stories] = useRecoilState(storiesState);
    const mapServices = useMapsService();
    const setMapFeatures = useSetRecoilState(mapFeatureState);
    const { getNumberWithZero, getSelectedObject, getCoreSolutions, getErrorMsg } = useMapHelpers();
    const [paginationData, setPaginationData] = useState<any>(getSelectedObject());
    const [iterator, setIterator] = useState(0);
    const [totalStoryInfo, setTotalStoryInfo] = useState<{ totalStories: number, totalPages: number }>({ totalStories: 0, totalPages: 0 });

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

    const handleChangeData = (event: any) => {
        const value = Number(event.target.value);
        setPaginationData((prevPaginationData: any) => ({
            ...prevPaginationData,
            storiespp: value,
            page_no: 1
        }));
        setIterator(0);
    };

    const handleFamilyVisible = (data: any, index: number) => {
        const geo_id = data?.parent_id[0];
        mapServices.getCifData(geo_id).then((response) => {
            if (response) {
                setMapFeatures(prevMapFeatures => ({ ...prevMapFeatures, cifData: response }));
                searchParams.set('story_id', (index + 1).toString());
                setSearchParams(searchParams);
                navigate({
                    pathname: RouteConstants.story_details,
                    search: `?${searchParams.toString()}`,
                });
            }
        }).catch(error => {
            getErrorMsg(error);
        });

    };

    const handleNextClick = () => {
        setPaginationData((prevData: any) => ({
            ...prevData,
            page_no: paginationData.page_no + 1
        }));
        setIterator(iterator + 1);

    };
    const handlePreviousClick = () => {
        setPaginationData((prevData: any) => ({
            ...prevData,
            page_no: paginationData.page_no - 1
        }));
        setIterator(iterator - 1);
    };

    const handlePaginationData = (data: any) => {
        let newPaginationData = { ...paginationData };
        delete newPaginationData['reverse'];
        data.forEach((item: any) => newPaginationData = { ...newPaginationData, ...item });
        setPaginationData(newPaginationData);
    }

    useEffect(() => {
        setTotalStoryInfo({
            totalPages: Math.ceil(totalStoryInfo.totalStories / paginationData.storiespp),
            totalStories: stories.totalStories
        });
    }, [stories.totalStories, paginationData, totalStoryInfo.totalStories])

    useEffect(() => {
        if (paginationData) {
            storiesService.getAllStories(paginationData);
            const currentParams = new URLSearchParams();
            for (const key in paginationData) {
                if (paginationData[key]) {
                    currentParams.set(key, paginationData[key].toString());
                }
            }
            setSearchParams(currentParams);
        }
    }, [paginationData])

    return (
        <div className='col-lg-9 col-md-8 col-sm-12 padding-left-4 margin-bottom-5 padding-top-bottom-0 h-100'>
            <div className="d-flex flex-row justify-content-between align-items-center" style={{ height: '6.5%' }}>
                <Heading
                    title={`Families ${stories?.properties?.name ? `in ${stories?.properties?.name}` : ''}`}
                    type={TypographyType.h2}
                    colour={TypographyColor.dark}
                    classname='text-start margin-top-41 margin-left-2'
                />
                <FamiliesSorting handlePaginationData={handlePaginationData} paginationData={paginationData} />
            </div>
            <div className='w-100 d-flex flex-column justify-content-between no-scrollbar' style={{ overflowX: 'hidden', overflowY: 'auto', height: '90%' }}>
                <div className='row margin-0 padding-0 w-100' style={{ marginBottom: '5rem' }}>
                    {stories?.family?.map((data, index) => (
                        <div className='col-lg-4 col-md-6 col-sm-12 padding-left-right-0'>
                            <Card size={CardSize.medium} variant={CardVariant.contained} classname='m-2 margin-bottom-4 padding-0 cursor-pointer' onClick={() => handleFamilyVisible(data, index)}>
                                <div className='position-relative'>
                                    {!loaded[index] && <div className="d-flex justify-content-center align-items-center image-placeholder position-absolute" ></div>}
                                    <img className="rounded-top story-list-img" src={data?.image && data?.image[0] ? data?.image[0] : familySkeleton} alt={data?.familyName} onLoad={() => handleImageLoad(index)} />
                                </div>
                                <div className="text-start padding-3">
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <Heading
                                            title={data?.familyName}
                                            type={TypographyType.h4}
                                            colour={TypographyColor.dark}
                                            classname='text-start'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.purple}
                                            classname='margin-left-right-0 margin-bottom-1 bg-purple-1 padding-left-right-2 padding-top-bottom-1 green-card-sm'>
                                            {getNumberWithZero(data?.familyDetails.familyMembers)} members
                                        </Body>
                                    </div>
                                    <Body
                                        type={BodyType.p3}
                                        color={BodyColor.dark}
                                        classname='text-left margin-bottom-2'>
                                        {data?.district}, {data?.state}, {data?.country}
                                    </Body>
                                    {getCoreSolutions(data?.familyDetails)?.name &&
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.dark}
                                            classname='d-flex flex-row align-items-center margin-left-right-0 height-4'>
                                            <Heading
                                                title={getCoreSolutions(data.familyDetails)?.value}
                                                type={TypographyType.h5}
                                                colour={TypographyColor.purple}
                                                classname='margin-right-1 margin-top-bottom-0'
                                            />
                                            Annual Household Spend on {getCoreSolutions(data.familyDetails)?.name}
                                        </Body>
                                    }
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
                <div className="w-100 bg-white margin-0 margin-bottom-5 d-flex flex-row justify-content-between rounded padding-2 margin-left-2">
                    <div className='w-auto d-flex flex-row justify-content-start align-items-center'>
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.dark}
                            classname='m-2'>
                            Stories per page
                        </Body>
                        <Select
                            options={storiesSelectOptions}
                            onChange={(e) => handleChangeData(e)}
                            value={paginationData.storiespp}
                            labelKey='key'
                            valueKey='value'
                            size={SelectSize.small}
                            name='role'
                            classname='width-5 padding-left-2'
                        />
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.dark}
                            classname='margin-top-bottom-2 margin-left-2'>
                            {(stories?.totalStories) ? (iterator * paginationData.storiespp + 1) : 0} - {((iterator * paginationData.storiespp + paginationData.storiespp) < (stories?.totalStories)) ? (iterator * paginationData.storiespp + paginationData.storiespp) : (stories?.totalStories ? stories?.totalStories : 0)} of {stories?.totalStories ? stories?.totalStories : 0} items
                        </Body>
                    </div>
                    <div className='w-auto d-flex flex-row justify-content-around align-items-center'>
                        <Button
                            theme={paginationData.page_no === 1 ? ButtonTheme.muted : ButtonTheme.primary}
                            // theme={paginationData.page_no === 0 ? ButtonTheme.muted : ButtonTheme.primary}
                            size={ButtonSize.default}
                            variant={ButtonVariant.transparent}
                            disabled={paginationData.page_no === 1}
                            onClick={() => handlePreviousClick()}
                            classname='margin-0 h-auto'
                        >
                            <BsArrowLeft className='margin-right-2 margin-bottom-1 fs-22' />
                            Previous
                        </Button>
                        <div className='d-flex flex-row justify-content-around align-items-center margin-left-right-2 h-auto fs-12'>
                            <Body
                                color={BodyColor.dark}
                                type={BodyType.p3}
                                classname='border rounded margin-left-right-1 padding-left-right-2 padding-top-bottom-1'
                            >
                                {paginationData?.page_no ? paginationData?.page_no : 0}
                            </Body>
                            of {totalStoryInfo.totalPages ? totalStoryInfo?.totalPages : 0}
                        </div>
                        <Button
                            theme={paginationData.page_no === totalStoryInfo.totalPages ? ButtonTheme.muted : ButtonTheme.primary}
                            size={ButtonSize.default}
                            variant={ButtonVariant.transparent}
                            disabled={paginationData.page_no === totalStoryInfo.totalPages}
                            onClick={() => handleNextClick()}
                            classname=' margin-0'
                        >
                            Next
                            <BsArrowRight className='margin-left-2 margin-bottom-1 fs-22' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FamiliesDetailsContainer;

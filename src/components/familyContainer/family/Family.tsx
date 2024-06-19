/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate, useSearchParams } from 'react-router-dom';

// CSS
import '../../../styles/main.css';

// Components
import FamilyDetailsContainer from './FamilyDetailsContainer';
import DistrictSidebar from './DistrictSidebar';
import FamilySidePanel from './FamilySidePanel';
import { mapFeatureState, storiesState } from '../../../states';

// Utilities
import { RouteConstants } from '../../../constants';
import { useMapsService, useStoriesService } from '../../../services';
import { useMapHelpers } from '../../../helpers';
import FamilyHeader from '../FamilyHeader';

const Family = () => {
    const navigate = useNavigate();
    const storiesService = useStoriesService();
    const stories = useRecoilValue(storiesState);
    const [searchParams, setSearchParams] = useSearchParams();
    const mapServices = useMapsService();
    const setMapFeatures = useSetRecoilState(mapFeatureState);
    const { getSelectedObject, getErrorMsg } = useMapHelpers();
    const [pageInfo, setPageInfo] = useState<any>(getSelectedObject());
    const [selectedStory, setSelectedStory] = useState<{ index: number, story: any }>({ index: Number(searchParams.get('story_id')) - 1, story: {} });

    const handleCarouselSlide = (index: number) => {
        let geo_id = stories?.family[index].parent_id[0];
        mapServices.getCifData(geo_id).then((response: any) => {
            if (response) {
                setMapFeatures(prevMapFeatures => ({ ...prevMapFeatures, cifData: response }));
                setPageInfo({
                    ...pageInfo,
                    story_id: (index + 1)
                })
                setSelectedStory({
                    index: index,
                    story: stories?.family[index]
                });
            }
        }).catch(error => {
            getErrorMsg(error);
        });

    };
    // const handleCarouselSlide = (index: number) => {
    //     let geo_id = stories?.family[index].parent_id[0];
    //     setPageInfo({
    //         ...pageInfo,
    //         story_id: (index + 1)
    //     })
    //     setSelectedStory({
    //         index: index,
    //         story: stories?.family[index]
    //     });
    //     searchParams.set('story_id', (index + 1).toString());
    //     setSearchParams(searchParams);
    //     navigate({
    //         pathname: RouteConstants.story_details,
    //         search: `?geo_code=${geo_id}&page_no=1&storiespp=${Constants.storiesSelectOptions[0].value}?${searchParams.toString()}`,
    //     });
    // };

    const handleBackClick = () => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete('story_id');
        navigate({
            pathname: RouteConstants.stories,
            search: `?${currentParams.toString()}`,
        });
    }

    useEffect(() => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete('story_id');
        let queryParams: any = {};
        currentParams.toString().split('&').forEach((param) => {
            let [key, value]: any = param.split('=');
            value = Number(value) ? Number(value) : value;
            queryParams[key] = value;
        });
        storiesService.getAllStories(queryParams);
    }, []);

    useEffect(() => {
        if (pageInfo.story_id && stories?.family && stories?.family.length > 0) {
            setSelectedStory((prevData: any) => ({
                ...prevData,
                story: stories?.family[pageInfo.story_id - 1]
            }));
        }
    }, [pageInfo.story_id, stories?.family]);

    useEffect(() => {
        if (pageInfo) {
            const currentParams = new URLSearchParams();
            for (const key in pageInfo) {
                if (pageInfo[key]) {
                    currentParams.set(key, pageInfo[key].toString());
                }
            }
            setSearchParams(currentParams);
        }
    }, [pageInfo]);

    return (
        <div className='row w-100 margin-0'>
            <div className='col-9 padding-0'>
                <FamilyHeader />
                <div className='row w-100 margin-0' style={{ height: '86.25vh' }}>
                    <FamilySidePanel selectedStory={selectedStory} handleCarouselSlide={handleCarouselSlide} iterator={pageInfo.story_id} handleBackClick={handleBackClick} />
                    <FamilyDetailsContainer selectedData={selectedStory?.story} />
                </div>
            </div>
            <div className='col-3 padding-0 bg-white' style={{ height: '91.75rem' }}>
                <DistrictSidebar selectedStory={selectedStory} />
            </div>
        </div>
    );
}

export default Family;

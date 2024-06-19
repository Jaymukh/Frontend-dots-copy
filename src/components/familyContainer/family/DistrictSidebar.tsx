/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { LiaArrowRightSolid } from 'react-icons/lia';
import ReactGA from 'react-ga4';

// CSS
import '../../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import Body, { BodyColor, BodyType } from '../../ui/typography/Body';
import Select, { SelectSize } from '../../ui/select/Select';
import { ProgressBar } from '../../ui/progressbar/ProgressBar';
import InfoPanel from '../../ui/InfoPanel';
import RequestData from './RequestData';
import { mapFeatureState, AllSettingsState, UserSettingsState, spinnerState, userCurrencyState, geoJsonState } from '../../../states';

// Utilities
import WIPImage from '../../../utils/images/WIP-FINAL.svg';
import PoiIconAll from '../../../utils/images/POI_icon_all.svg';
import PoiIconFilter from '../../../utils/images/POI_icon_filter.svg';
import PoiIconFilterLabel from '../../../utils/images/POI_icon_filter_label.svg';
import { RouteConstants } from '../../../constants';
import { useMapsService, useStoriesService } from '../../../services';
import { useMapHelpers } from '../../../helpers';

interface DistrictSidebarProps {
    selectedRb?: number;
    coreSolutions?: any;
    selectedStory?: any;
}

const DistrictSidebar: React.FC<DistrictSidebarProps> = ({ selectedRb, coreSolutions, selectedStory }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { pathname } = location;
    const { cifData: { properties } } = useRecoilValue(mapFeatureState);
    const settings = useRecoilValue(AllSettingsState);
    const [currency, setCurrency] = useRecoilState(userCurrencyState);
    const usersettings = useRecoilValue(UserSettingsState);
    const setSpinner = useSetRecoilState(spinnerState);
    const { getCurrencyWithSymbol, getErrorMsg } = useMapHelpers();
    const mapServices = useMapsService();
    const storyServices = useStoriesService();
    const [geoJSON, setGeoJSON] = useRecoilState(geoJsonState)
    const [mapFeatures, setMapFeatures] = useRecoilState(mapFeatureState);


    //function to get all the user's setting
    const [requestDataDrawerOpen, setRequestDataDrawerOpen] = useState(false);

    const handleRequestDataDrawer = (requestDataDrawerOpen: boolean) => {
        setRequestDataDrawerOpen(requestDataDrawerOpen);
    };

    useEffect(() => {
        const parent_id = selectedStory?.story?.parent_id?.[0];
        if (parent_id) {
            fetchCifData(parent_id);
        }
    }, [selectedStory?.story?.parent_id]);


    useEffect(() => {
        const parent_id = selectedStory?.story?.parent_id?.[0];
        if (parent_id) {
            fetchCifData(parent_id);
        }
    }, [selectedStory?.story?.parent_id]);

    const errorHandler = (error: any) => {
        getErrorMsg(error);
    };

    const fetchGeoJsonData = (geo_id: string) => {
        setSpinner(true);
        mapServices.getMaps(Number(geo_id)).then((data: any) => {
            setGeoJSON(data);
            setSpinner(false);
        }).catch(error => {
            setSpinner(false);
            errorHandler(error);
        });
    }

    const fetchCifData = (geoCode: string) => {
        mapServices.getCifData(Number(geoCode)).then((response) => {
            if (response) {
                setMapFeatures(prevMapFeatures => ({ ...prevMapFeatures, cifData: response }));
            }
        }).catch(error => {
            getErrorMsg(error);
        });
    };

    const fetchFeaturedStories = (geo_id: string) => {
        mapServices.getFeaturedStories(Number(geo_id)).then(data => {
            setMapFeatures(prevMapFeatures => ({
                ...prevMapFeatures,
                featuredStories: data
            }));
        }).catch(error => {
            errorHandler(error);
        });
    }

    const fetchAllStories = () => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete('story_id');
        let queryParams: any = {};
        currentParams.toString().split('&').forEach((param) => {
            let [key, value]: any = param.split('=');
            value = Number(value) ? Number(value) : value;
            queryParams[key] = value;
        });
        storyServices.getAllStories(queryParams);
    }

    const handleChangeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let geoCode = searchParams.get('geo_code');
        if (!geoCode) {
            geoCode = geoJSON?.rootProperties?.id;
        }
        document.title = document.title = geoJSON?.rootProperties?.Name + ' | EPIC Intelligence | Enmasse';
        setCurrency(event.target.value);
        localStorage.setItem("currency", event.target.value);
        fetchGeoJsonData(geoCode);
        fetchCifData(mapFeatures?.cifData?.properties?.geo_id);
        fetchFeaturedStories(geoCode);
        fetchAllStories();
    }

    const handleExploreMore = (geo_id: string) => {
        ReactGA.event({
            category: 'Button event',
            action: 'Clicked the Explore button',
        });
        navigate({
            pathname: RouteConstants.dashboards,
            search: `?geo_code=${geo_id}`,
        });
        setSpinner(true);
    }

    return (
        <div className='w-100 bg-white padding-left-right-0 margin-right-0' style={{ height: pathname === '/' ? '85.5vh' : '91.75vh' }} >
            <div className='w-100 d-flex justify-content-between align-items-center padding-left-right-3 py-auto' style={{ height: '10%' }}>
                <div className='d-flex justify-content-start align-items-center col-6 margin-0 text-start'>
                    <Heading
                        title={properties?.region}
                        colour={TypographyColor.dark}
                        type={TypographyType.h4}
                        classname='margin-top-bottom-0'
                    />
                    <InfoPanel text={properties?.infoButton} />
                </div>
                <div className='col-6 padding-0'>
                    <Select
                        options={settings?.currencies}
                        // value={usersettings?.currency}
                        value={currency || usersettings?.currency}
                        labelKey='name'
                        valueKey='code'
                        size={SelectSize.small}
                        name='currency'
                        onChange={handleChangeCurrency}
                    />
                </div>
            </div>
            <div className="d-flex flex-column justify-content-start align-items-center w-100 padding-top-1 margin-left-right-0 padding-left-right-3" style={{ overflowY: 'auto', overflowX: 'hidden', height: '80%' }}>
                <div className='row d-flex flex-row justify-content-between w-100 data-card d-flex flex-row margin-left-right-0 margin-top-bottom-2' style={{ height: 'fit-content' }}>
                    <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start text-start border-right' >
                        <Heading
                            title={getCurrencyWithSymbol(properties?.totalPopulation)}
                            colour={TypographyColor.dark}
                            type={TypographyType.h5}
                            classname='margin-0'
                        />
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.secondary}
                            classname='margin-0 overflow-wrap-anywhere'>
                            Total Population
                        </Body>
                    </div>
                    <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start text-start'>
                        <Heading
                            title={getCurrencyWithSymbol(properties?.totalHouseholds)}
                            colour={TypographyColor.dark}
                            type={TypographyType.h5}
                            classname='margin-0'
                        />
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.secondary}
                            classname='margin-0 overflow-wrap-anywhere'>
                            Number of Households
                        </Body>
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-start align-items-start w-100 padding-bottom-1 padding-left-right-0'>
                    <div className='d-flex justify-content-start align-items-center'>
                        <Heading
                            title='EPIC Opportunity'
                            colour={TypographyColor.dark}
                            type={TypographyType.h5}
                            classname='margin-top-bottom-0'
                        />
                        <InfoPanel text={properties?.enMassesThesis?.infoButton} />
                    </div>
                    <div className='row data-card d-flex flex-row w-100 margin-left-right-0 margin-top-2 margin-bottom-3 padding-left-right-0'>
                        <div className='col-12 padding-left-right-2 d-flex flex-column align-items-start justify-content-center text-start padding-top-bottom-2 border-bottom rounded-top bg-gradient-dark'>
                            <Heading
                                title={getCurrencyWithSymbol(properties?.enMassesThesis?.totalAddressableMarket, properties?.enMassesThesis?.totalAddressableMarketUOM)}
                                colour={TypographyColor.secondary}
                                type={TypographyType.h5}
                                classname='margin-0'
                            />
                            <Body
                                type={BodyType.p4}
                                color={BodyColor.white}
                                classname='margin-0 overflow-wrap-anywhere'>
                                Total Addressable Market
                            </Body>
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start text-start border-right'>
                            <Heading
                                title={getCurrencyWithSymbol(properties?.enMassesThesis?.averageAnnualEHTransactionalValue, properties?.enMassesThesis?.averageAnnualEHTransactionalValueUOM)}
                                colour={TypographyColor.dark}
                                type={TypographyType.h5}
                                classname='margin-0'
                            />
                            <Body
                                type={BodyType.p4}
                                color={BodyColor.secondary}
                                classname='margin-0 overflow-wrap-anywhere'>
                                Average Annual Core Transactional Value (CTV)
                            </Body>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start justify-content-center text-start' >
                            <Heading
                                title={getCurrencyWithSymbol(properties?.enMassesThesis?.numberOfEntrepreneurialHouseholds)}
                                colour={TypographyColor.dark}
                                type={TypographyType.h5}
                                classname='margin-0'
                            />
                            <Body
                                type={BodyType.p4}
                                color={BodyColor.secondary}
                                classname='margin-0 overflow-wrap-anywhere'>
                                Number of Entrepreneurial Households (EH)
                            </Body>
                        </div>
                    </div>
                </div>
                <hr className='margin-0 w-100 hr-border' />
                {properties?.showExploreMore ?
                    <div className='margin-0 margin-top-1 padding-0 w-100'>
                        {properties?.EICoverage && (properties?.geo_name !== 'district') && <div className='row data-card d-flex flex-row margin-left-right-0 margin-bottom-2 margin-top-3 padding-left-right-2 padding-top-2 padding-bottom-3'>
                            <div className='d-flex justify-content-between align-items-center margin-0 padding-0 padding-bottom-2 flexWrap'>
                                <div className='d-flex justify-content-start align-items-center margin-0 padding-0'>
                                    <Heading
                                        title='PoI Coverage'
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='margin-top-bottom-0 text-start'
                                    />
                                    <InfoPanel text={properties?.EICoverage?.infobutton} />
                                </div>
                                <Body
                                    type={BodyType.p4}
                                    color={BodyColor.dark}
                                    classname='margin-0'>
                                    {properties?.EICoverage?.covered} out of {properties?.EICoverage?.total} Districts
                                </Body>
                            </div>
                            <ProgressBar coverage={properties?.EICoverage} />
                        </div>}

                        {properties?.EHEconomicActivityIndicators?.showPOI
                            && <div className='d-flex flex-column justify-content-center padding-bottom-1 padding-top-2 padding-left-right-0'>
                                <div className='d-flex justify-content-start align-items-center'>
                                    <Heading
                                        title='High CTV and EH Points of Interest'
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='margin-top-bottom-0 text-start'
                                    />
                                    <InfoPanel text={properties?.EHEconomicActivityIndicators?.infoButton} />
                                </div>
                                <div className='row data-card d-flex flex-row w-100 margin-left-right-0 margin-top-bottom-2 padding-left-right-0'>
                                    <div className='col-12 d-flex flex-row justify-content-between padding-left-right-2  border-bottom rounded-top bg-gradient-light'>
                                        <div className='col-12 col-sm-6 col-md-6 col-lg-9 col-xl-9 d-flex flex-column align-items-start justify-content-center text-start padding-top-bottom-2'>
                                            <Heading
                                                title={getCurrencyWithSymbol(properties?.EHEconomicActivityIndicators?.pointsOfInterest)}
                                                colour={TypographyColor.dark}
                                                type={TypographyType.h5}
                                                classname='margin-0'
                                            />
                                            <Body
                                                type={BodyType.p4}
                                                color={BodyColor.dark}
                                                classname='margin-0'>Points of Interest
                                            </Body>
                                        </div>
                                        <div className='col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 d-flex justify-content-end align-items-center padding-top-bottom-2'>
                                            {(selectedRb !== undefined) && <img src={(selectedRb === 0) ? PoiIconAll : PoiIconFilter} alt="circles" style={{height: '6vh'}} />}
                                        </div>
                                    </div>
                                    <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start text-start border-right'>
                                        <div className={`d-flex flex-row justify-content-start align-items-center ${(coreSolutions && selectedRb && selectedRb === coreSolutions?.find((item: any) => item.type === "Healthcare")?.key) ? 'bg-purple padding-left-right-1' : 'initial'}`} style={{ border: '1px', borderRadius: '2px' }} >
                                            <Heading
                                                id='Healthcare'
                                                title={getCurrencyWithSymbol(properties?.EHEconomicActivityIndicators?.healthcareActivityPointsOfInterest)}
                                                colour={TypographyColor.dark}
                                                type={TypographyType.h5}
                                                classname={`margin-0 ${(coreSolutions && selectedRb && selectedRb === coreSolutions?.find((item: any) => item.type === "Healthcare")?.key) ? 'color-white' : 'initial'}`}
                                            />
                                            {coreSolutions && selectedRb === coreSolutions?.find((item: any) => item.type === "Healthcare")?.key && <img src={PoiIconFilterLabel} alt='POI Icon' style={{ height: '0.875rem', margin: '0 0 0 0.5vh' }} />}
                                        </div>
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.secondary}
                                            classname='margin-0 overflow-wrap-anywhere'>
                                            Healthcare ecosystem markers
                                        </Body>
                                    </div>
                                    <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start justify-content-center text-start' >
                                        <div className={`d-flex flex-row justify-content-start align-items-center ${(coreSolutions && selectedRb && selectedRb === coreSolutions?.find((item: any) => item.type === "Education")?.key) ? 'bg-purple padding-left-right-1' : 'initial'}`} style={{ border: '1px', borderRadius: '2px' }} >
                                            <Heading
                                                id='Education'
                                                title={getCurrencyWithSymbol(properties?.EHEconomicActivityIndicators?.educationActivityPointsOfInterest)}
                                                colour={TypographyColor.dark}
                                                type={TypographyType.h5}
                                                classname={`margin-0 ${(coreSolutions && selectedRb && selectedRb === coreSolutions?.find((item: any) => item.type === "Education")?.key) ? 'color-white' : 'initial'}`}
                                            />
                                            {coreSolutions && selectedRb === coreSolutions?.find((item: any) => item.type === "Education")?.key && <img src={PoiIconFilterLabel} alt='POI Icon' style={{ height: '0.875rem', margin: '0 0 0 0.5vh' }} />}
                                        </div>
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.secondary}
                                            classname='margin-0 overflow-wrap-anywhere'>
                                            Education ecosystem markers
                                        </Body>
                                    </div>
                                    <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start text-start border-right border-top'>
                                        <div className={`d-flex flex-row justify-content-start align-items-center ${(coreSolutions && selectedRb && selectedRb === coreSolutions?.find((item: any) => item.type === "Agri_Markets")?.key) ? 'bg-purple padding-left-right-1' : 'initial'}`} style={{ border: '1px', borderRadius: '2px' }} >
                                            <Heading
                                                id='Agri_Markets'
                                                title={getCurrencyWithSymbol(properties?.EHEconomicActivityIndicators?.agriMarketActivityPointsOfInterest)}
                                                colour={TypographyColor.dark}
                                                type={TypographyType.h5}
                                                classname={`margin-0 ${(coreSolutions && selectedRb && selectedRb === coreSolutions?.find((item: any) => item.type === "Agri_Markets")?.key) ? 'color-white' : 'initial'}`}
                                            />
                                            {coreSolutions && selectedRb === coreSolutions?.find((item: any) => item.type === "Agri_Markets")?.key && <img src={PoiIconFilterLabel} alt='POI Icon' style={{ height: '0.875rem', margin: '0 0 0 0.5vh' }} />}
                                        </div>
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.secondary}
                                            classname='margin-0 overflow-wrap-anywhere'>
                                            Agricultural ecosystem markers
                                        </Body>
                                    </div>
                                    <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start justify-content-center text-start border-top' >
                                        <div className={`d-flex flex-row justify-content-start align-items-center ${(coreSolutions && selectedRb && selectedRb === coreSolutions?.find((item: any) => item.type === "Financial_Solutions")?.key) ? 'bg-purple padding-left-right-1' : 'initial'}`} style={{ border: '1px', borderRadius: '2px' }}>
                                            <Heading
                                                id='Financial_Solutions'
                                                title={getCurrencyWithSymbol(properties?.EHEconomicActivityIndicators?.financialSolutionsActivityPointsOfInterest)}
                                                colour={TypographyColor.dark}
                                                type={TypographyType.h5}
                                                classname={`margin-0 ${(coreSolutions && selectedRb && selectedRb === coreSolutions?.find((item: any) => item.type === "Financial_Solutions")?.key) ? 'color-white' : 'initial'}`}
                                            />
                                            {coreSolutions && selectedRb === coreSolutions?.find((item: any) => item.type === "Financial_Solutions")?.key &&
                                                <img src={PoiIconFilterLabel} alt='POI Icon' style={{ height: '0.875rem', margin: '0 0 0 0.5vh' }} />
                                            }
                                        </div>
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.secondary}
                                            classname='margin-0 overflow-wrap-anywhere'>
                                            Financial Solutions ecosystem markers
                                        </Body>
                                    </div>
                                </div>

                            </div>}

                        {properties?.EHSpend?.showSpend
                            && <div className='d-flex flex-column justify-content-center padding-bottom-1 padding-left-right-0'>
                                <div className='d-flex justify-content-start align-items-center'>
                                    <Heading
                                        title='EH Spend'
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='margin-top-bottom-0'
                                    />
                                    <InfoPanel text={properties?.EHSpend?.infoButton} />
                                </div>
                                <div className='row data-card d-flex flex-row margin-left-right-0 margin-top-bottom-2 padding-left-right-0'>
                                    <div className='col-12 padding-2 d-flex flex-column align-items-start justify-content-center text-start border-bottom rounded-top bg-purple-1'>
                                        <Heading
                                            title={getCurrencyWithSymbol(properties?.EHSpend?.annualEHSpend, properties?.EHSpend?.annualEHSpendUOM)}
                                            colour={TypographyColor.dark}
                                            type={TypographyType.h5}
                                            classname='margin-0'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.dark}
                                            classname='margin-0 overflow-wrap-anywhere'>
                                            Average Annual EH Spend
                                        </Body>
                                    </div>
                                    <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start text-start border-right'>
                                        <Heading
                                            title={getCurrencyWithSymbol(properties?.EHSpend?.averageAnnualEHSpend, properties?.EHSpend?.averageAnnualEHSpendUOM)}
                                            colour={TypographyColor.dark}
                                            type={TypographyType.h5}
                                            classname='margin-0'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.secondary}
                                            classname='margin-0 overflow-wrap-anywhere'>
                                            Average Annual EH Spend on Core Solutions
                                        </Body>
                                    </div>
                                    <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start justify-content-center text-start' >
                                        <Heading
                                            title={getCurrencyWithSymbol(properties?.EHSpend?.averageAnnualEHSpendOnNonCoreSolutions, properties?.EHSpend?.averageAnnualEHSpendOnNonCoreSolutionsUOM)}
                                            colour={TypographyColor.dark}
                                            type={TypographyType.h5}
                                            classname='margin-0'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.secondary}
                                            classname='margin-0 overflow-wrap-anywhere'>
                                            Average Annual EH Spend on Non-Core Solutions
                                        </Body>
                                    </div>
                                    <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start text-start border-right border-top'>
                                        <Heading
                                            title={getCurrencyWithSymbol(properties?.EHSpend?.AvergeAnnualEHSpendOnHealthcare, properties?.EHSpend?.healthcareSpendUOM)}
                                            colour={TypographyColor.dark}
                                            type={TypographyType.h5}
                                            classname='margin-0'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.secondary}
                                            classname='margin-0 overflow-wrap-anywhere'>
                                            Average Annual EH Spend on Healthcare
                                        </Body>
                                    </div>
                                    <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start justify-content-center text-start border-top' >
                                        <Heading
                                            title={getCurrencyWithSymbol(properties?.EHSpend?.AvergeAnnualEHSpendOnEducation, properties?.EHSpend?.educationSpendUOM)}
                                            colour={TypographyColor.dark}
                                            type={TypographyType.h5}
                                            classname='margin-0'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.secondary}
                                            classname='margin-0 overflow-wrap-anywhere'>
                                            Average Annual EH Spend on Education
                                        </Body>
                                    </div>
                                    <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start text-start border-right border-top'>
                                        <Heading
                                            title={getCurrencyWithSymbol(properties?.EHSpend?.AvergeAnnualEHSpendOnAgriMarket, properties?.EHSpend?.agriMarketSpendUOM)}
                                            colour={TypographyColor.dark}
                                            type={TypographyType.h5}
                                            classname='margin-0'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.secondary}
                                            classname='margin-0 overflow-wrap-anywhere'>
                                            Average Annual EH Spend on Agri Markets
                                        </Body>
                                    </div>
                                    <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start justify-content-center text-start border-top' >
                                        <Heading
                                            title={getCurrencyWithSymbol(properties?.EHSpend?.AvergeAnnualEHSpendOnFinancialSolutions, properties?.EHSpend?.financialSolutionsSpendUOM)}
                                            colour={TypographyColor.dark}
                                            type={TypographyType.h5}
                                            classname='margin-0'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.secondary}
                                            classname='margin-0 overflow-wrap-anywhere'>
                                            Average Annual EH Spend on Financial Solutions
                                        </Body>
                                    </div>
                                </div>
                            </div>}

                        {properties?.EHBorrow?.showBorrow
                            && <div className='d-flex flex-column justify-content-center padding-bottom-1 padding-left-right-0'>
                                <div className='d-flex justify-content-start align-items-center'>
                                    <Heading
                                        title='EH Borrowing'
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='margin-top-bottom-0'
                                    />
                                    <InfoPanel text={properties?.EHBorrow?.infoButton} />
                                </div>
                                <div className='row data-card d-flex flex-row margin-left-right-0 margin-top-bottom-2 padding-left-right-0'>
                                    <div className='col-12 padding-2 d-flex flex-column align-items-start justify-content-center text-start border-bottom rounded-top bg-purple-1'>
                                        <Heading
                                            title={getCurrencyWithSymbol(properties?.EHBorrow?.averageAnnualEHBorrowing, properties?.EHBorrow?.averageAnnualEHBorrowingUOM)}
                                            colour={TypographyColor.dark}
                                            type={TypographyType.h5}
                                            classname='margin-0'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.dark}
                                            classname='margin-0'>
                                            Average Annual EH Borrowing
                                        </Body>
                                    </div>
                                    <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start text-start border-right'>
                                        <Heading
                                            title={getCurrencyWithSymbol(properties?.EHBorrow?.averageAnuualEHBorrowingFromFormalSources, properties?.EHBorrow?.averageAnuualEHBorrowingFromFormalSourcesUOM)}
                                            colour={TypographyColor.dark}
                                            type={TypographyType.h5}
                                            classname='margin-0'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.dark}
                                            classname='margin-0'>
                                            Average Annual EH Borrowing from Formal Sources
                                        </Body>
                                    </div>
                                    <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start justify-content-center text-start' >
                                        <Heading
                                            title={getCurrencyWithSymbol(properties?.EHBorrow?.averageAnnualEHBorrowingFromInformalSources, properties?.EHBorrow?.averageAnnualEHBorrowingFromInformalSourcesUOM)}
                                            colour={TypographyColor.dark}
                                            type={TypographyType.h5}
                                            classname='margin-0'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.secondary}
                                            classname='margin-0'>
                                            Average Annual EH Borrowing from Informal Sources
                                        </Body>
                                    </div>
                                </div>
                            </div>
                        }

                        {properties?.EHIncome?.showIncome
                            && <div className='d-flex flex-column justify-content-center padding-bottom-1 padding-left-right-0'>
                                <div className='d-flex justify-content-start align-items-center'>
                                    <Heading
                                        title='EH Income'
                                        colour={TypographyColor.dark}
                                        type={TypographyType.h5}
                                        classname='margin-top-bottom-0'
                                    />
                                    <InfoPanel text={properties?.EHIncome?.infoButton} />
                                </div>
                                <div className='row data-card d-flex flex-row margin-left-right-0 margin-top-bottom-2 padding-left-right-0'>
                                    <div className='col-12 padding-2 d-flex flex-column align-items-start justify-content-center text-start border-bottom rounded-top bg-purple-1'>
                                        <Heading
                                            title={getCurrencyWithSymbol(properties?.EHIncome?.annualEHIncome, properties?.EHIncome?.annualEHIncomeUOM)}
                                            colour={TypographyColor.dark}
                                            type={TypographyType.h5}
                                            classname='margin-0'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.dark}
                                            classname='margin-0'>
                                            Average Annual EH Income
                                        </Body>
                                    </div>
                                    <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start text-start border-right'>
                                        <Heading
                                            title={getCurrencyWithSymbol(properties?.EHIncome?.averageAnnualEHIncomeFromVariableSources, properties?.EHIncome?.averageAnnualEHIncomeFromVariableSourcesUOM)}
                                            colour={TypographyColor.dark}
                                            type={TypographyType.h5}
                                            classname='margin-0'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.dark}
                                            classname='margin-0'>
                                            Average Annual EH Income from Formal Sources
                                        </Body>
                                    </div>
                                    <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 margin-top-bottom-0 padding-2 d-flex flex-column align-items-start justify-content-center text-start' >
                                        <Heading
                                            title={getCurrencyWithSymbol(properties?.EHIncome?.averageAnnualEHIncomeFromInformalSources, properties?.EHIncome?.averageAnnualEHIncomeFromInformalSourcesUOM)}
                                            colour={TypographyColor.dark}
                                            type={TypographyType.h5}
                                            classname='margin-0'
                                        />
                                        <Body
                                            type={BodyType.p4}
                                            color={BodyColor.secondary}
                                            classname='margin-0'>
                                            Average Annual EH Income from Informal Sources
                                        </Body>
                                    </div>
                                </div>
                            </div>}
                    </div>
                    : <div className='row d-flex flex-row margin-0 padding-0 justify-content-center align-items-center'>
                        <img src={WIPImage} alt='WIP' width="40%" height='50%' />
                        <Heading
                            title='Work in progress.'
                            type={TypographyType.h5}
                            colour={TypographyColor.dark}
                        />
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.muted}
                            classname='padding-0 margin-0 w-95'>
                            We are working on measuring EH Spend, Income, and Borrowing for this district to project a TAM. Please check again soon.
                        </Body>
                        <Button
                            theme={ButtonTheme.primary}
                            size={ButtonSize.default}
                            variant={ButtonVariant.bordered}
                            onClick={() => handleRequestDataDrawer(true)}
                        >
                            Request Data
                        </Button>
                    </div>
                }
            </div>
            <div className="padding-3 d-flex justify-content-center align-items-center" style={{ height: '10%' }}>
                <Button
                    disabled={!properties?.showExploreMore}
                    theme={ButtonTheme.primary}
                    size={ButtonSize.small}
                    variant={ButtonVariant.bordered}
                    onClick={() => handleExploreMore(properties?.geo_id)}
                    classname='margin-bottom-0 w-100 bottom-0'
                >
                    Explore More
                    <LiaArrowRightSolid className='margin-left-2 fs-22' />
                </Button>
            </div>
            {requestDataDrawerOpen && <RequestData requestDataDrawerOpen={requestDataDrawerOpen} handleRequestDataDrawer={handleRequestDataDrawer} />}
        </div >
    );
}

export default DistrictSidebar;

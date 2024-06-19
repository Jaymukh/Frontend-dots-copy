/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
// External libraries
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

// CSS
import '../styles/main.css';

// Components
import { AllSettingsState, UserSettingsState, mapFeatureState } from '../states';
import { Heading, TypographyColor, TypographyType } from './ui/typography/Heading'
import Body, { BodyColor, BodyType } from './ui/typography/Body';
import Select, { SelectSize } from './ui/select/Select';

// Utilities
import { useSettingsService } from '../services';
import { useMapHelpers } from '../helpers';

export default function InsightBar() {
    const mapFeatures = useRecoilValue(mapFeatureState);
    const settingsService = useSettingsService();
    const [settings, setSettings] = useRecoilState(AllSettingsState);
    const [usersettings, setUserSettings] = useRecoilState(UserSettingsState);
    const { getCurrencyWithSymbol, getErrorMsg } = useMapHelpers();

    const fetchAllSettings = () => {
        settingsService.getAllSettings().then((response) => {
            if (response) {
                setSettings(response);
            }
        }).catch(error => {
            getErrorMsg(error);
        });
    }

    const fetchUserSettings = () => {
        settingsService.getUserSettings().then((response) => {
            if (response) {
                setUserSettings(response);
                // setSpinner(false);
            }
        }).catch(error => {
            // setSpinner(false);
            getErrorMsg(error);
        });
    }

    useEffect(() => {
        fetchAllSettings();
        fetchUserSettings();
    }, []);

    return (
        <div className='sideBar-parent-expended padding-top-bottom-4 padding-left-right-0 z-index-1' style={{ overflow: 'auto', overflowX: 'hidden', position: 'inherit' }} >
            <div className='row d-flex justify-content-between align-items-center padding-left-right-3'>
                <div className='col-6 d-flex justify-content-start'>
                    <Heading
                        title='EnMasses Thesis'
                        colour={TypographyColor.dark}
                        type={TypographyType.h4}
                        classname='margin-left-1' />
                </div>
                <div className='col-6'>
                    <Select
                        options={settings?.currencies}
                        value={usersettings?.currency}
                        labelKey='name'
                        valueKey='symbol'
                        size={SelectSize.small}
                        name='currency'
                    />
                </div>
            </div>
            <>
                <Heading
                    title={mapFeatures.cifData?.properties?.region}
                    colour={TypographyColor.dark}
                    type={TypographyType.h4}
                    classname='text-start padding-left-right-3 margin-top-bottom-1 margin-left-1' />
                <div className="row d-flex justify-content-center padding-top-bottom-2 margin-left-right-0 padding-left-right-4">
                    <div className='row data-card padding-left-right-3 d-flex flex-row margin-left-right-0 margin-top-bottom-2'>
                        <div className='col-sm-11 col-md-11 col-lg-6 col-xl-6 margin-left-right-0 padding-left-right-0 margin-top-bottom-0 padding-top-bottom-2 border-end d-flex flex-column align-items-start text-start' >
                            <Heading
                                title={mapFeatures.cifData?.properties?.totalHouseholds ? mapFeatures.cifData?.properties?.totalHouseholds : "__"}
                                colour={TypographyColor.dark}
                                type={TypographyType.h5}
                                classname='text-start padding-left-right-3 margin-top-bottom-1 margin-left-1' />
                            <Body
                                type={BodyType.p3}
                                color={BodyColor.dark}
                                classname='margin-0'
                            >
                                Number of Households
                            </Body>
                        </div>
                        <div className='col-sm-11 col-md-11	col-lg-6 col-xl-6 margin-left-right-0 padding-left-right-0 margin-top-bottom-0 padding-top-bottom-2 padding-left-3 d-flex flex-column align-items-start text-start'>
                            <Heading
                                title={getCurrencyWithSymbol(mapFeatures.cifData?.properties?.totalPopulation)}
                                colour={TypographyColor.dark}
                                type={TypographyType.h5}
                                classname='margin-0'
                            />
                            <Body
                                type={BodyType.p3}
                                color={BodyColor.dark}
                                classname='margin-0'
                            >
                                Total Population
                            </Body>
                        </div>
                    </div>
                    <div className='row data-card d-flex flex-row margin-left-right-0 margin-top-bottom-2 padding-left-right-0'>
                        <div className='col-12 padding-0 d-flex flex-column align-items-center justify-content-center text-start padding-top-bottom-2 border-bottom'>
                            <Heading
                                title={getCurrencyWithSymbol(mapFeatures.cifData?.properties?.enMassesThesis?.totalAddressableMarket)}
                                colour={TypographyColor.dark}
                                type={TypographyType.h5}
                                classname='text-left margin-0'
                            />
                            <Body
                                type={BodyType.p3}
                                color={BodyColor.dark}
                                classname='margin-0'
                            >
                                Total Addressable Market
                            </Body>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-6 col-xl-6 margin-top-bottom-0 padding-top-bottom-2 d-flex flex-column align-items-start justify-content-center text-start border-end' >
                            <Heading
                                title={getCurrencyWithSymbol(mapFeatures.cifData?.properties?.enMassesThesis?.numberOfEntrepreneurialHouseholds)}
                                colour={TypographyColor.dark}
                                type={TypographyType.h5}
                                classname='margin-0'
                            />
                            <Body
                                type={BodyType.p3}
                                color={BodyColor.dark}
                                classname='margin-0'
                            >
                                Number of Entrepreneurial Households (EH)
                            </Body>
                        </div>
                        <div className='col-sm-12 col-md-12	col-lg-6 col-xl-6 margin-top-bottom-0 padding-top-bottom-2 d-flex flex-column align-items-start text-start'>
                            <Heading
                                title={getCurrencyWithSymbol(mapFeatures.cifData?.properties?.EHSpend?.averageAnnualEHSpend)}
                                colour={TypographyColor.dark}
                                type={TypographyType.h5}
                                classname='margin-0'
                            />
                            <Body
                                type={BodyType.p3}
                                color={BodyColor.dark}
                                classname='margin-0'
                            >
                                Median Annual EH Household Spend
                            </Body>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}
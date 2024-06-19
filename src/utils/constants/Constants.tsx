
import { MdGroupAdd, MdMail, MdContactSupport } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoListSharp, IoSettingsSharp } from 'react-icons/io5';
import Navale from '../images/Navale.png'
import Ashe from '../images/Ashe.png'
import Joshi from '../images/Joshi.png'
import Shah from '../images/Shah.png'
import BringData from '../images/Roadmap-Bring data-01.svg'
import District from '../images/Roadmap-District-01.svg'
import DownloadData from '../images/Roadmap-Download Data-01.svg'
import Layers from '../images/Roadmap-Layers-01.svg'
import YoyRefresh from '../images/Roadmap-YoY Refresh-01.svg'
import OnboardingScreen1 from '../images/OnboardingScreen 1.png'
import OnboardingScreen2 from '../images/OnboardingScreen 2.png'
import OnboardingScreen3 from '../images/OnboardingScreen 3.png'
import OnboardingScreen4 from '../images/OnboardingScreen 4.png'

export const storiesSelectOptions = [
    { key: 25, value: 25 },
    { key: 50, value: 50 },
    { key: 75, value: 75 }
];
export interface Option {
    key: number;
    label: string;
    type: string;
}
export const options: Option[] = [
    { key: 0, label: 'All', type: 'all' },
    { key: 1, label: 'Healthcare', type: 'health_care' },
    { key: 2, label: 'Education', type: 'education' },
    { key: 3, label: 'Agri Markets', type: 'agriculture_market' },
    { key: 4, label: 'Financial Solutions', type: 'financial_solutions' },
];

// Enmasse-Dot\src\components\mapContainer\OverlayModal.tsx
export interface HelpContent {
    title: string;
    description: string;
    image: any;
}

export const helpContent: HelpContent[] = [
    {
        title: 'Location Intelligence on The EPIC Opportunity',
        description: 'Estimating Entrepreneurial Households (EH) and their Core Transaction Value (CTV) at a National, State and District Level. Assists you in knowing which geography to target next, and measuring performance of your current field operations.',
        image: OnboardingScreen1
    },
    {
        title: 'Economic Vibrancy through High CTV Potential Points of Interest',
        description: 'Estimating activity of Core Solutions - Healthcare, Education, Agri Markets and Financial Solutions through counts of relevant Points of Interest (PoI). Gives you a sense of your market segment activity and learn from other core categories.',
        image: OnboardingScreen2
    },
    {
        title: 'Stories of Entrepreneurial Households',
        description: 'Bring their voice and relevant data from the field to you. Authentic aspirational families that are demanding formal solutions and willing to pay for it.',
        image: OnboardingScreen3
    },
    {
        title: 'Exciting Roadmap: Co-building with our users',
        description: 'This is just the beginning of an exciting journey to bring actionable insights at scale. We will be expanding geographic coverage, adding new features, and actively engaging with you to ideate and ensure strong value.',
        image: OnboardingScreen4
    }
];
// Enmasse-Dot\src\components\mapContainer\RoadmapModal.tsx
export interface RoadmapContent {
    title: string;
    description: string;
    image: any;
}

export const roadmapContent: RoadmapContent[] = [
    {
        title: 'Bring your own data',
        description: 'Visualise your company’s presence on the map and compare it with the growth of other points of interest.',
        image: BringData,
    },
    {
        title: 'Increased Coverage',
        description: 'We would be expanding our coverage to provide insights on 400 districts in India in 2024.',
        image: District,
    },
    {
        title: 'Download Data',
        description: 'We will offer you the ability to download data from the platform and mould it as per your requirements',
        image: DownloadData,
    },
    {
        title: 'Layers',
        description: 'We will be introducing more insightful layers to your platform in 2024.',
        image: Layers,
    },
    {
        title: 'Data Refresh',
        description: 'We intend to have the first time comparison in the platform, allowing you to map EH growth',
        image: YoyRefresh,
    },
    {
        title: 'Contact Us',
        description: 'Would you like a feature to be included in this platform? Tell us how we can support you better.',
        image: YoyRefresh,
    }
];
// Enmasse-Dot\src\components\InsightBar.tsx
export interface CountryData {
    country: string;
    population: string;
    households: string;
    annualAverageIncome: string;
    entrepreneurialHouseholds: string;
    tam: string;
    medianSpendonCoreSoln: string;
    button: string;
}
export const countryData: CountryData[] = [
    {
        country: 'India',
        population: '1.39B',
        households: '285 Million',
        annualAverageIncome: '$7500',
        entrepreneurialHouseholds: '200M',
        tam: '$1 Trillion',
        medianSpendonCoreSoln: '$5000',
        button: 'Explore More'
    },
    {
        country: 'Central & South America',
        population: '1.39B',
        households: '285 Million',
        annualAverageIncome: '$7500',
        entrepreneurialHouseholds: '200M',
        tam: '$1 Trillion',
        medianSpendonCoreSoln: '$5000',
        button: 'Explore More'
    },
    {
        country: 'South East Asia',
        population: '1.39B',
        households: '285 Million',
        annualAverageIncome: '$7500',
        entrepreneurialHouseholds: '200M',
        tam: '$1 Trillion',
        medianSpendonCoreSoln: '$5000',
        button: 'Explore More'
    },
    {
        country: 'Africa',
        population: '1.39B',
        households: '285 Million',
        annualAverageIncome: '$7500',
        entrepreneurialHouseholds: '200M',
        tam: '$1 Trillion',
        medianSpendonCoreSoln: '$5000',
        button: 'Explore More'
    }
];

// Enmasse-Dot\src\components\accountcontainer\account\SideBar.tsx
export interface SidebarItem {
    index: number;
    icon: JSX.Element;
    option: string;
}
export const sidebarData: SidebarItem[] = [
    {
        index: 0,
        icon: <BsFillPersonFill className='fs-21' />,
        option: 'Profile',
    },
    {
        index: 1,
        icon: <IoSettingsSharp className='fs-21' />,
        option: 'Settings',
    },
    {
        index: 2,
        icon: <MdGroupAdd className='fs-21' />,
        option: 'Invite',
    }
];

//
export interface HelpMenuItem {
    key: number;
    text: string;
    icon: JSX.Element;

}

export const helpMenuItems: HelpMenuItem[] = [
    {
        key: 1,
        text: "Contact us",
        icon: <MdMail className='fs-21' />,
    },
    {
        key: 2,
        text: "Help",
        icon: <MdContactSupport className='fs-21' />,
    },
    {
        key: 3,
        text: "Roadmap",
        icon: <IoListSharp className='fs-21' />,
    }
];
export interface AccountMenuItem {
    key: number;
    text: string;
    icon: JSX.Element;
}

export const accountMenuItems: AccountMenuItem[] = [
    {
        key: 1,
        text: "Settings",
        icon: <IoSettingsSharp className='fs-21' color='rgba(28, 27, 31, 1)' />,
    },
    {
        key: 2,
        text: "Invite",
        icon: <MdGroupAdd className='fs-21' color='rgba(28, 27, 31, 1)' />,
    },
];
// Enmasse-Dot\src\components\accountcontainer\account\detailscontainer\settings\Settings.tsx language selectbox
export interface LanguageOption {
    key: string,
    value: string
}
export const languages: LanguageOption[] = [
    {
        key: 'EN',
        value: 'English'
    },
    {
        key: 'GE',
        value: 'German'
    },
    {
        key: 'JP',
        value: 'Japanese'
    }
];
// currency selectbox
export interface CurrencyOption {
    key: string,
    value: string
}
export const currency: CurrencyOption[] = [
    {
        key: 'INR',
        value: 'INR'
    },
    {
        key: 'EURO',
        value: 'Euro'
    },
    {
        key: 'YEN',
        value: 'Japanese Yen'
    }
];
// location selectbox
export interface LocationOption {
    key: string,
    value: string
}
export const location: LocationOption[] = [
    {
        key: 'IND',
        value: 'India'
    },
    {
        key: 'GE',
        value: 'Germany'
    },
    {
        key: 'JP',
        value: 'Japan'
    }
];

//
export interface CircleLayerProps {
    sourceId: string;
    layerId: string;
    circleColor: string;
    circleStrokeWidth: number;
    circleStrokeColor: string;
}
export const collectiveCircleLayerProps: CircleLayerProps = {
    sourceId: 'geojsonsource-all-circle',
    layerId: 'all-map-circle-layer',
    circleColor: '#FFFFFF',
    circleStrokeWidth: 1,
    circleStrokeColor: '#FFFFFF'
};
//
export interface CircleLayerProps {
    sourceId: string;
    layerId: string;
    circleColor: string;
    circleStrokeWidth: number;
    circleStrokeColor: string;
}

export const coreSolutionCircleLayerProps: CircleLayerProps = {
    sourceId: 'geojsonsource-circle',
    layerId: 'map-circle-layer',
    circleColor: '#FFFFFF',
    circleStrokeWidth: 1,
    circleStrokeColor: '#FFFFFF'
}
//
export interface CompanyOption {
    key: string;
    value: string;
}

export const company: CompanyOption[] = [
    {
        key: 'enmasse',
        value: 'enmasse'
    },
    {
        key: 'Sarvagram',
        value: 'Sarvagram'
    },
    {
        key: 'Leadschool',
        value: 'Leadschool'
    },
    {
        key: 'Samunnati',
        value: 'Samunnati'
    }
];
//
export interface CompanyTypeOption {
    key: string;
    value: string;
}

export const companyType: CompanyTypeOption[] = [
    {
        key: 'Enmasse',
        value: 'Enmasse'
    },
    {
        key: 'Investor',
        value: 'Investor'
    },
    {
        key: 'Business',
        value: 'Business'
    }
];

// invite table header data     
export interface InviteTableHeader {
    key: string;
    value: string;
}

export const inviteTableHeader: InviteTableHeader[] = [
    {
        key: 'name',
        value: 'Name'
    },
    {
        key: 'role',
        value: 'Role'
    },
    {
        key: 'last_login',
        value: 'Last login'
    },
    {
        key: 'company',
        value: 'Company'
    },
    {
        key: 'company_type',
        value: 'Company type'
    }
];

// Enmasse-Dot\src\components\headercontainer\AccountOptions.tsx

export interface ProfileData {
    name: string;
    email: string;
    phone: number;
    designation: string;
    company: string;
    country: string;
    role: string;
}

export const profileData: ProfileData = {
    name: 'Kartik Parija',
    email: 'kartik@enmasse.world',
    phone: 76564545,
    designation: 'Manager',
    company: 'Enmasse',
    country: 'India',
    role: 'Admin'
};

//
export const headers: string[] = ['State', 'Entrepreneurial Households', 'Median Annual EH Spend on Core Solutions', 'Median Annual EH Income', 'EM Rank']

//
interface DashboardTableRow {
    state: string;
    households: string;
    medianAnnualEHSpend: string;
    medianAnnualEHIncome: string;
    EMrank: string;
}

export const dashboardTableData: DashboardTableRow[] = [
    {
        state: 'Andhra Pradesh',
        households: '84 Million',
        medianAnnualEHSpend: '$5400',
        medianAnnualEHIncome: '$5400',
        EMrank: '8'
    },
    {
        state: 'Andhra Pradesh',
        households: '84 Million',
        medianAnnualEHSpend: '$5400',
        medianAnnualEHIncome: '$5400',
        EMrank: '8'
    },
    {
        state: 'Arunachal Pradesh',
        households: '135 Million',
        medianAnnualEHSpend: '$7000',
        medianAnnualEHIncome: '$7000',
        EMrank: '3'
    },
    {
        state: 'Bihar',
        households: '90 Million',
        medianAnnualEHSpend: '$5500',
        medianAnnualEHIncome: '$5500',
        EMrank: '7'
    },
    {
        state: 'Chhattisgarh',
        households: '81 Million',
        medianAnnualEHSpend: '$5200',
        medianAnnualEHIncome: '$5200',
        EMrank: '9'
    },
    {
        state: 'Goa',
        households: '60 Million',
        medianAnnualEHSpend: '$5200',
        medianAnnualEHIncome: '$5200',
        EMrank: '10'
    },
    {
        state: 'Gujarat',
        households: '130 Million',
        medianAnnualEHSpend: '$6010',
        medianAnnualEHIncome: '$6010',
        EMrank: '5'
    },
];
//
interface DashboardCardInfo {
    title: string;
    value: string;
}

export const dashboardCardInfo: DashboardCardInfo[] = [
    {
        title: "Total Population",
        value: '1.4 Billion',
    },
    {
        title: "Number of Households",
        value: '285 Million',
    },
    {
        title: "Number of Entrepreneurial Households (EH)",
        value: '200 Million',
    },
    {
        title: "Average Annual EH Transactional Value",
        value: '$5000',
    },
    {
        title: "Total Addressable Market",
        value: '$1 Trillion',
    },
];

//

export interface BubbleLeaf {
    coreSolution: string;
    pointsOfInterest: number;
    color?: string;
    percentageContribution: number;
}

export interface BubbleNode {
    color?: string | undefined;
    percentageContribution?: number;
    coreSolution?: string | null | undefined;
    pointsOfInterest?: number;
    children: BubbleLeaf[];
}

export const bubbleData: BubbleNode = {
    // type: 'node',
    // coreSolution: "Core Sum",
    // pointsOfInterest: 117219,
    // percentageContribution: 100,
    children: [
        { coreSolution: "Healthcare", pointsOfInterest: 29460, percentageContribution: 25.13, color: '#007CC3' },
        { coreSolution: "Agri Market", pointsOfInterest: 30124, percentageContribution: 25.7, color: '#367A2B' },
        { coreSolution: "Education", pointsOfInterest: 29726, percentageContribution: 25.36, color: '#F47A1F' },
        { coreSolution: "Financial Solutions", pointsOfInterest: 27909, percentageContribution: 23.81, color: '#00529B' }
    ]
}
// const colors = ['#2A6D96', '#AF5F1E', '#1D9366', '#B23440'];
export const colorDescription: Record<string, string> = { Healthcare: '#B23440', Agri_Markets: '#1D9366', Education: '#AF5F1E', Financial_Solutions: ' #2A6D96' };

//

interface FamilyDetails {
    familyMembers: string;
    householdSpend: string;
    householdIncome: string;
    detail1: string;
    detail2: string;
}

interface FamilyFeatureProperties {
    message: string;
    description: string;
    image: string; // You would need to provide the correct type for the 'image' property
    familyName: string;
    district: string;
    state: string;
    country: string;
    address: string;
    familyDetails: FamilyDetails;
}

interface FamilyFeature {
    type: 'Feature';
    properties: FamilyFeatureProperties;
    geometry: {
        type: 'Point';
        coordinates: [number, number];
    };
}

interface FamiliesData {
    place: string;
    family: FamilyFeature[];
}

export const families: FamiliesData = {
    place: "India",
    family: [
        {
            type: 'Feature',
            properties: {
                message: 'Foo',
                description: "Hi! I'm Ameya. This app will work fine",
                image: Ashe,
                familyName: 'Ashe Family',
                district: 'Kutch',
                state: 'Gujarat',
                country: 'India',
                address: 'Kutch, Gujarat, India',
                familyDetails: {
                    familyMembers: '05',
                    householdSpend: '$10,500',
                    householdIncome: '$9,000',
                    detail1: 'The Ashe family lives in India. Suvarna is 45 years old and she is a housewife. Her husband Ravindra is 53 years old and he owns a small business. They live along with their mother who is a retired woman and 2 sons. Hirabai, their mother, is 72 years old. Chandan, their son, is 26 years old and he helps them with their business. Their 19 years old son, Anjan is a student. The Navale family lives in a 1-bedroom house and have been living there for the past 36 years. The thing they like about the house is its surroundings, however, what bothers them is its isolated location. The house has interrupted electricity, toilet facility within the house yard, and safe water supply. The family also owns another house and some agricultural land. The Navale family purchases all their food supplies from the market. They cook their food on LPG fuel. They aspire to grow their business of agricultural products and leverage their land as an investment for the future of their son’s.',
                    detail2: 'The family also owns another house and some agricultural land. The Navale family purchases all their food supplies from the market. They cook their food on LPG fuel. They aspire to grow their business of agricultural products and leverage their land as an investment for the future of their son’s.'
                }
            },
            geometry: {
                type: 'Point',
                coordinates: [-66.324462, -16.024695]
            }
        },
        {
            type: 'Feature',
            properties: {
                message: 'Bar',
                description: 'Hi! This is Ameya again! I aasure again that this app will live soon...',
                image: Navale,
                familyName: 'Navale Family',
                district: 'Anand',
                state: 'Gujarat',
                country: 'India',
                address: 'Anand, Gujarat, India',
                familyDetails: {
                    familyMembers: '05',
                    householdSpend: '$10,500',
                    householdIncome: '$9,000',
                    detail1: 'The Navale family lives in India. Sugat is 30 years old and he is a farmer. His wife Manjita is 22 years old and she is a daily wage worker. Their daughter Chitrakshi is 2 years old. The family lives in a small kutccha House that Sugat’s family has been living for last 20 years. The experience hourly electricity outages around 3 times a week. It has an outdoor toilet facility and decent water supply. They wish to provide their daughter with good quality education and better standard of living. They cook their food on LPG fuel. Drinking water is also available at their home and is safe to drink.',
                    detail2: 'The family also owns another house and some agricultural land. The Navale family purchases all their food supplies from the market. They cook their food on LPG fuel. They aspire to grow their business of agricultural products and leverage their land as an investment for the future of their son’s.'
                }
            },
            geometry: {
                type: 'Point',
                coordinates: [-61.21582, -15.971891]
            }
        },
        {
            type: 'Feature',
            properties: {
                message: 'Foo',
                description: "Hi! I'm Ameya. This app will work fine",
                image: Joshi,
                familyName: 'Joshi Family',
                district: 'Dahod',
                state: 'Gujarat',
                country: 'India',
                address: 'Kutch, Gujarat, India',
                familyDetails: {
                    familyMembers: '05',
                    householdSpend: '$10,500',
                    householdIncome: '$9,000',
                    detail1: 'The Navale family lives in India. Sugat is 30 years old and he is a farmer. His wife Manjita is 22 years old and she is a daily wage worker. Their daughter Chitrakshi is 2 years old. The family lives in a small kutccha House that Sugat’s family has been living for last 20 years. The experience hourly electricity outages around 3 times a week. It has an outdoor toilet facility and decent water supply. They wish to provide their daughter with good quality education and better standard of living. They cook their food on LPG fuel. Drinking water is also available at their home and is safe to drink.',
                    detail2: 'The family also owns another house and some agricultural land. The Navale family purchases all their food supplies from the market. They cook their food on LPG fuel. They aspire to grow their business of agricultural products and leverage their land as an investment for the future of their son’s.'
                }
            },
            geometry: {
                type: 'Point',
                coordinates: [-66.324462, -16.024695]
            }
        },
        {
            type: 'Feature',
            properties: {
                message: 'Bar',
                description: 'Hi! This is Ameya again! I aasure again that this app will live soon...',
                image: Shah,
                familyName: 'Shah Family',
                district: 'Navsari',
                state: 'Gujarat',
                country: 'India',
                address: 'Anand, Gujarat, India',
                familyDetails: {
                    familyMembers: '',
                    householdSpend: '',
                    householdIncome: '',
                    detail1: '',
                    detail2: ''
                }
            },
            geometry: {
                type: 'Point',
                coordinates: [-61.21582, -15.971891]
            }
        }
    ]
}

// FamiliesSorting Parameters
export interface FamiliesSortingItem {
    key: number;
    text: string;
    param: any;

}

export const familiesSortingItems: FamiliesSortingItem[] = [
    {
        key: 1,
        text: "Latest Updated (A to Z)",
        param: [{ sort_by: 'updated_time' }],
    },
    {
        key: 2,
        text: "Latest Updated (Z to A)",
        param: [{ sort_by: 'updated_time' }, { reverse: 'True' }],
    },
    {
        key: 3,
        text: "Family Name (A to Z)",
        param: [{ sort_by: 'family_name' }],
    },
    {
        key: 4,
        text: "Family Name (Z to A)",
        param: [{ sort_by: 'family_name' }, { reverse: 'True' }],
    }
];
export interface ExplorePlace {
    code: string;
    name: string;
    districts: any;
}

export const explorePlaces: ExplorePlace[] = [
    {
        code: 'AD',
        name: 'Andhra Pradesh',
        districts: [
            {
                code: 'AD1',
                name: 'Anantapur',
            },
            {
                code: 'AD2',
                name: 'Chittoor',
            },
            {
                code: 'AD3',
                name: 'East Godavari',
            },
            {
                code: 'AD4',
                name: 'Guntur',
            },
            {
                code: 'AD4',
                name: 'Krishna'
            }
        ]
    },
    {
        code: 'GJ',
        name: 'Gujarat',
        districts: [
            {
                code: 'GJ1',
                name: 'Ahmedabad',
            },
            {
                code: 'GJ2',
                name: 'Amreli',
            },
            {
                code: 'GJ3',
                name: 'Anand',
            },
            {
                code: 'GJ4',
                name: 'Kutch'
            }
        ]

    },
    {
        code: 'KL',
        name: 'Kerala',
        districts: [
            {
                code: 'KL1',
                name: 'Thiruvananthapuram',
            },
            {
                code: 'KL6',
                name: 'Thrissur'
            }
        ]
    }
];

// export const storyFeatures = {
//     type: 'FeatureCollection',
//     features: [
//         {
//             type: 'Feature',
//             geometry: {
//                 type: 'Point',
//                 coordinates: [77.11790108415168, 28.643326173465816],
//             },
//             properties: {
//                 radius: 15,
//                 id: 1,
//                 family: "5 Family members",
//                 annualSpend: '$6000',
//                 image: 'https://s3.ap-south-1.amazonaws.com/kronos-new-tarento/1/userprofile/1841/1657528681838_Ameya%20Shetty.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230807T085110Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=AKIAS2D3QDFYXIAJ2TAB%2F20230807%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=fe32f142787a47fdf38bb6b994d0ac3882c862ffb42bcf2c6fa3e3d95f39d059'
//             },
//         },
//         {
//             type: 'Feature',
//             geometry: {
//                 type: 'Point',
//                 coordinates: [80.25064909780843, 15.886294542878717],
//             },
//             properties: {
//                 radius: 15,
//                 id: 1,
//                 family: "3 Family members",
//                 annualSpend: '$3000',
//                 image: 'https://s3.ap-south-1.amazonaws.com/kronos-new-tarento/1/userprofile/1841/1657528681838_Ameya%20Shetty.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230807T085110Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=AKIAS2D3QDFYXIAJ2TAB%2F20230807%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=fe32f142787a47fdf38bb6b994d0ac3882c862ffb42bcf2c6fa3e3d95f39d059'
//             },
//         },
//         {
//             type: 'Feature',
//             geometry: {
//                 type: 'Point',
//                 coordinates: [76.51049281262189, 14.956060982956439],
//             },
//             properties: {
//                 radius: 15,
//                 id: 1,
//                 family: "6 Family members",
//                 annualSpend: '$6000',
//                 image: 'https://s3.ap-south-1.amazonaws.com/kronos-new-tarento/1/userprofile/1841/1657528681838_Ameya%20Shetty.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230807T085110Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=AKIAS2D3QDFYXIAJ2TAB%2F20230807%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=fe32f142787a47fdf38bb6b994d0ac3882c862ffb42bcf2c6fa3e3d95f39d059'
//             },
//         },
//         {
//             type: 'Feature',
//             geometry: {
//                 type: 'Point',
//                 coordinates: [83.92233007923814, 20.161197887069193],
//             },
//             properties: {
//                 radius: 15,
//                 id: 1,
//                 family: "3 Family members",
//                 annualSpend: '$5000',
//                 image: 'https://s3.ap-south-1.amazonaws.com/kronos-new-tarento/1/userprofile/1841/1657528681838_Ameya%20Shetty.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230807T085110Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=AKIAS2D3QDFYXIAJ2TAB%2F20230807%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=fe32f142787a47fdf38bb6b994d0ac3882c862ffb42bcf2c6fa3e3d95f39d059'
//             },
//         }
//     ],
// };

//
export interface StoryFeatureProperties {
    radius: number;
    id: number;
    family: string;
    annualSpend: number;
    image: string;
}

export interface StoryFeature {
    position: { lng: number; lat: number };
    properties: StoryFeatureProperties;
}

export const storyFeatures: StoryFeature[] = [
    {

        position: { lng: 77.11790108415168, lat: 28.643326173465816 },
        properties: {
            radius: 15,
            id: 1,
            family: "5 Family members",
            annualSpend: 6000,
            image: Ashe
        },
    },
    {

        position: { lng: 80.25064909780843, lat: 15.886294542878717 },
        properties: {
            radius: 15,
            id: 1,
            family: "3 Family members",
            annualSpend: 3000,
            image: Navale
        },
    },
    {

        position: { lng: 76.51049281262189, lat: 14.956060982956439 },
        properties: {
            radius: 15,
            id: 1,
            family: "6 Family members",
            annualSpend: 6000,
            image: Shah
        },
    },
    {

        position: { lng: 83.92233007923814, lat: 20.161197887069193 },
        properties: {
            radius: 15,
            id: 1,
            family: "3 Family members",
            annualSpend: 5000,
            image: Joshi
        },
    }
]
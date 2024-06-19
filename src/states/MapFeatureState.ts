import { atom } from 'recoil';

export interface GeoLocation {
    geo_id: number;
    geo_value: string;
    has_data?: boolean;
}
export interface Suggestion {
    geo_id: number;
    geo_name: string;
    has_data: string;
    children: GeoLocation[];
};
export interface CifData {
    type: string;
    properties: {
        geo_id: string;
        region: string;
        address: string;
        geo_name: string;
        totalPopulationActualValue: number;
        totalPopulation: string;
        totalHouseholdsActualValue: number;
        totalHouseholds: string;
        infoButton: string;
        override: boolean;
        enMassesThesis: {
            totalAddressableMarketActualValue: number;
            totalAddressableMarket: string;
            totalAddressableMarketUOM: string;
            numberOfEntrepreneurialHouseholdsActualValue: number;
            numberOfEntrepreneurialHouseholds: string;
            averageAnnualEHTransactionalValueActualValue: number;
            averageAnnualEHTransactionalValue: string;
            averageAnnualEHTransactionalValueUOM: string;
            infoButton: string;
            override: boolean;
        };
        EHEconomicActivityIndicators: {
            showPOI: boolean;
            pointsOfInterestActualValue: number;
            pointsOfInterest: string;
            agriMarketActivityPointsOfInterestActualValue: number;
            agriMarketActivityPointsOfInterest: string;
            educationActivityPointsOfInterestActualValue: number;
            educationActivityPointsOfInterest: string;
            financialSolutionsActivityPointsOfInterestActualValue: number;
            financialSolutionsActivityPointsOfInterest: string;
            healthcareActivityPointsOfInterestActualValue: number;
            healthcareActivityPointsOfInterest: string;
            infoButton: string;
            override: boolean;
        };
        EHSpend: {
            showSpend: boolean;
            annualEHSpendActualValue: number;
            annualEHSpend: string;
            annualEHSpendUOM: string;
            averageAnnualEHSpendActualValue: number;
            averageAnnualEHSpend: string;
            averageAnnualEHSpendUOM: string;
            averageAnnualEHSpendOnNonCoreSolutionsActualValue: number;
            averageAnnualEHSpendOnNonCoreSolutions: string;
            averageAnnualEHSpendOnNonCoreSolutionsUOM: string;
            AvergeAnnualEHSpendOnAgriMarketActualValue: number;
            AvergeAnnualEHSpendOnAgriMarket: string;
            agriMarketSpendUOM: string;
            AvergeAnnualEHSpendOnEducationActualValue: number;
            AvergeAnnualEHSpendOnEducation: string;
            educationSpendUOM: string;
            AvergeAnnualEHSpendOnFinancialSolutionsActualValue: number;
            AvergeAnnualEHSpendOnFinancialSolutions: string;
            financialSolutionsSpendUOM: string;
            AvergeAnnualEHSpendOnHealthcareActualValue: number;
            AvergeAnnualEHSpendOnHealthcare: string;
            healthcareSpendUOM: string;
            infoButton: string;
            override: boolean;
        };
        EHIncome: {
            showIncome: boolean;
            averageAnnualEHIncomeFromVariableSourcesActualValue: number;
            averageAnnualEHIncomeFromVariableSources: string;
            averageAnnualEHIncomeFromVariableSourcesUOM: string;
            annualEHIncomeActualValue: number;
            annualEHIncome: string;
            annualEHIncomeUOM: string;
            averageAnnualEHIncomeFromInformalSourcesActualValue: number;
            averageAnnualEHIncomeFromInformalSources: string;
            averageAnnualEHIncomeFromInformalSourcesUOM: string;
            infoButton: string;
            override: boolean;
        };
        EHBorrow: {
            showBorrow: boolean;
            averageAnuualEHBorrowingFromFormalSourcesActualValue: number;
            averageAnuualEHBorrowingFromFormalSources: string;
            averageAnuualEHBorrowingFromFormalSourcesUOM: string;
            averageAnnualEHBorrowingActualValue: number;
            averageAnnualEHBorrowing: string;
            averageAnnualEHBorrowingUOM: string;
            averageAnnualEHBorrowingFromInformalSourcesActualValue: number;
            averageAnnualEHBorrowingFromInformalSources: string;
            averageAnnualEHBorrowingFromInformalSourcesUOM: string;
            infoButton: string;
            override: boolean;
        };
        EICoverage: {
            showCoverage: boolean;
            covered: number;
            total: number;
            infobutton: string;
        };
        showExploreMore: boolean;
    };
}


export interface FeatureStories {
    featuredStories: [],
    geodata: []
}

const mapFeatureState = atom({
    key: 'mapFeatures',
    default: {
        circles: [],
        stories: [],
        suggestions: [] as any,
        cifData: {} as CifData,
        featuredStories: {} as FeatureStories,
    }
});

export { mapFeatureState };

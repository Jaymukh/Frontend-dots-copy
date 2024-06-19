import { atom } from 'recoil';

export interface geoInfoProps {
    show: boolean;
    breakdownType: string;
    infoButton: string;
    data: geoInfoTableProps[];
}


export interface geoInfoTableProps {
    geoId: number,
    geoName: string,
    area: number | null,
    ehPopulation: string | null,
    averageEHTransactionalValue: string | null,
    averageEHTransactionalValueUOM: string | null,
    pointsOfInterest: string | null
}

export interface metricBreakdownInfoProps {
    show: boolean;
    breakdownType: string;
    infoButton: string;
    data: metricBreakdownInfoTableProps[];
}

export interface metricBreakdownInfoTableProps {
    geoId: number,
    geoName: string,
    entrepreneurialHouseholds: number | null,
    medianAnnualEhSpend: number | null,
    medianAnnualEhBorrowing: number | null,
    medianAnnualEhIncome: number | null,
    ehTransactionValue: number | null,
}

export interface ehGrowthGraphDataProps {
    geoId: string,
    geoName: string,
    infoButton: string,
    ehGrowth: {infobutton: string, data: { value: string | null, period: string, actualValue: number | null, }[]},
    averageEhTransactionalValue: {infobutton: string, data:{ value: null | string, uom: null | string, period: string | null }[]}
}

export interface inOutFlowDataProps {
    show: boolean;
    infoButton: string;
    data: {
        geoId: number,
        parentId: number,
        geoValue: string,
        dataPeriod: string,
        medianAnnualIncome: number | null,
        medianAnnualBorrow: number | null,
        outflow: number | null,
        inflow: number | null
    }[]
}

export interface coreSolutionDataProps {
    geoData: {
        geoId: number,
        geoName: string,
        region: string
    },
    infoButton: string;
    coreSolutionsByEH: CoreSolutionByEH[]
}

export interface CoreSolutionByEH {
    type: string;
    coreSolution: string;
    pointsOfInterest: number;
    percentageContribution: number;
    subcategory: Subcategory[];
    color?: string | undefined;
}

export interface Subcategory {
    name: string;
    value: string;
}

export interface cifProps {
    geoInfo: geoInfoProps;
    metricBreakdownInfo: metricBreakdownInfoProps;
    ehGrowthGraphData: ehGrowthGraphDataProps;
    inOutFlowData: inOutFlowDataProps;
    coreSolutionsData: coreSolutionDataProps;
}

const cifState = atom({
    key: 'cif',
    default: {} as cifProps
});

export { cifState };

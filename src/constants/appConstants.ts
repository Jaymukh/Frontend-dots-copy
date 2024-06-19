interface TableHeaderProps {
    ID: string,
    NAME: string,
    KEYS: { KEY: string, VALUE: string, UOM?: string }[]
}

interface TableProps {
    GEO_INFO_TABLE: TableHeaderProps,
    METRIC_BREAKDOWN_TABLE: TableHeaderProps,
    // INVITE_TABLE: TableHeaderProps
}

const TABLE_HEADERS: TableProps = {
    GEO_INFO_TABLE: {
        ID: 'geo-info',
        NAME: 'Summary Breakdown',
        KEYS: [
            { KEY: 'geoName', VALUE: 'State' },
            { KEY: 'area', VALUE: 'Area (sq.Km)' },
            { KEY: 'ehPopulation', VALUE: 'EH Population' },
            { KEY: 'tam', VALUE: 'Total Addressable Market', UOM: 'totalEhGtvUOM' },
            { KEY: 'poi', VALUE: 'Points of Interest' }
        ],
    },
    METRIC_BREAKDOWN_TABLE: {
        ID: 'metric-breakdown',
        NAME: 'CTV Breakdown',
        KEYS: [
            { KEY: 'geoName', VALUE: 'State' },
            { KEY: 'entrepreneurialHouseholds', VALUE: 'Entrepreneurial Households' },
            { KEY: 'medianAnnualEhSpend', VALUE: 'Median Annual EH Spend', UOM: 'medianAnnualEhSpendUOM' },
            { KEY: 'medianAnnualEhBorrowing', VALUE: 'Median Annual EH Borrowing', UOM: 'medianAnnualEhBorrowingUOM' },
            { KEY: 'medianAnnualEhIncome', VALUE: 'Median Annual EH Income', UOM: 'medianAnnualEhIncomeUOM' },
            { KEY: 'ehTransactionValue', VALUE: 'EH Transcational Value', UOM: 'ehTransactionValueUOM' }
        ],
    },
    // INVITE_TABLE: {
    //     ID: 'invite',
    //     NAME: 'Invite',
    //     KEYS: [
    //         { VALUE: 'Name' },
    //         { VALUE: 'Role' },
    //         { VALUE: 'Company' },
    //         { VALUE: 'Company type' },
    //         { VALUE: 'Action' },
    //     ],
    // }
}
export { TABLE_HEADERS };
export type { TableHeaderProps };

// CSS
import '../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import Table, { TableSize } from '../ui/table/Table';
import InfoPanel from '../ui/InfoPanel';
import NoVisualData from './NoVisualData';

// Utilities
import { TableHeaderProps } from '../../constants';

interface TableViewProps {
    data: any;
    headerData: TableHeaderProps;
    infoButton: string;
    breakdownType?: string;
    classname?: string;
}

const TableView: React.FC<TableViewProps> = ({ data, headerData, infoButton, breakdownType, classname }) => {
    return (
        <div>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='padding-3'>
                <div className='d-flex align-items-center margin-0 padding-0 margin-bottom-3'>
                    <Heading
                        title={(breakdownType) ? `${breakdownType}-wise ${headerData.NAME}` : `${headerData.NAME}`}
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='text-start padding-left-1 margin-top-bottom-0'
                    />
                    <InfoPanel text={infoButton} />
                </div>

                {(data && data?.length > 0)
                    ? <Table headers={headerData} data={data} size={TableSize.xl} breakdownType={breakdownType} classname={classname} />
                    : <NoVisualData displayImage={true} />}
            </Card>
        </div>
    );
};

export default TableView;
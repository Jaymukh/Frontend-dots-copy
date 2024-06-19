// External libraries
import { useRecoilValue } from 'recoil';

// CSS
import '../../styles/main.css';

// Components
import { Card, CardSize, CardVariant } from '../ui/card/Card';
import NavTab from '../ui/navtab/NavTab';
import BarGraph from './BarGraph';
import NoVisualData from './NoVisualData';
import { CoreSolutionByEH, cifState } from '../../states';

interface BarGraphContainerProps {
    selected: CoreSolutionByEH | undefined;
    handleTabClick: (item: CoreSolutionByEH) => void;
}


const BarGraphContainer: React.FC<BarGraphContainerProps> = ({ selected, handleTabClick }) => {
    const { coreSolutionsData } = useRecoilValue(cifState);

    return (
        <div className='h-100'>
            <Card size={CardSize.default} variant={CardVariant.contained} classname='padding-3 h-100'>
                <NavTab navItems={coreSolutionsData?.coreSolutionsByEH} selected={selected?.type} handleTabClick={handleTabClick} />
                {(!selected?.subcategory && selected?.subcategory?.length === 0) ?
                    <NoVisualData displayImage={true} /> 
                    : <BarGraph selected={selected} /> 
                    }
            </Card>
        </div>
    )
}

export default BarGraphContainer;
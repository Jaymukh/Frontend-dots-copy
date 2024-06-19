// Components
import FamiliesSidePanel from './FamiliesSidePanel';
import FamiliesDetailsContainer from './FamiliesDetailsContainer';

const Families = () => {
    return (
        <div className='row w-100' style={{ height: '86.25vh' }}>
             <FamiliesSidePanel />
            <FamiliesDetailsContainer />
        </div>
    );
}

export default Families;

import './NavTab.css';

interface NavTabProps {
    navItems: any[];
    selected: any;
    handleTabClick: (item: any, index:number) => void;
}

const NavTab: React.FC<NavTabProps> = ({ navItems, selected, handleTabClick }) => {
    return (
        <ul className="nav nav-tabs" id="myTabs" role="tablist">
            {navItems?.map((item: any, index: number) => (
                <li className="nav-item " role="presentation" style={{ cursor: 'pointer' }} onClick={() => handleTabClick(item, index)}>
                    <h6 className={`nav-link ${selected === item?.type ? 'active' : ''}`}>{item?.coreSolution}</h6>
                </li>
            ))}
        </ul>
    )
}

export default NavTab;
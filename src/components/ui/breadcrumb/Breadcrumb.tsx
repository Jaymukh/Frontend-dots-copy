import '../../../styles/main.css';

export interface BreadcrumbItem {
    key: string;
    geo_id: number | null;
    label: string;
    link?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    handleBreadcrumbClick: (item: BreadcrumbItem, index: number) => void;
}

type AriaCurrent = "page" | "step" | "location" | "date" | "time";

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, handleBreadcrumbClick }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb margin-0">
                {items.map((item: BreadcrumbItem, index: number) => (
                    item.label &&
                    <li
                        key={index}
                        className={`breadcrumb-item d-flex ${index === items.length - 1 ? 'active' : 'inactive'}`}
                        aria-current={index === items.length - 1 ? 'page' as AriaCurrent : undefined}
                        style={{ cursor: `${index === items.length - 1 ? 'default' : 'pointer'}` }}
                        onClick={() => handleBreadcrumbClick(item, index)}
                    >
                        {index === items.length - 1 ? (
                            item.label
                        ) : (
                            <p className='margin-0 padding-0'>{item.label}</p>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
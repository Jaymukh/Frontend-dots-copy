// CSS
import '../../styles/main.css';

// Components
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../ui/typography/Body';

interface StatisticsCardProps {
    data: {
        value: string;
        title: string;
    };
    index: number;
}

const StatisticsCard = ({ data, index }: StatisticsCardProps) => {

    return (
        <div className={`d-flex flex-column align-items-start justify-content-center padding-left-right-2 padding-top-bottom-2 margin-top-bottom-1 ${index < 4 ? 'bg-white gray-border-with-radius' : 'bg-purple purple-border-with-radius'}`}>
            <Heading
                title={data.value}
                colour={index === 4 ? TypographyColor.secondary : TypographyColor.dark}
                type={TypographyType.h5}
                classname='padding-bottom-1 margin-0 text-start'
            />
            <Body
                type={BodyType.p3}
                color={index === 4 ? BodyColor.white : BodyColor.secondary}
                classname='margin-0 text-start'>
                {data.title}
            </Body>
        </div>
    )
}

export default StatisticsCard;
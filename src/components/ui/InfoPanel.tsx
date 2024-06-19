import React, { useEffect, useState, useRef } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai';
import '../../styles/main.css';

interface InfoPanelProps {
    text: string;
    classname?: string;
}
const InfoPanel: React.FC<InfoPanelProps> = ({ text, classname }) => {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupStyle, setPopupStyle] = useState<{ left: number | string; right: number | string; width: any; transform?: string; }>({ left: '', right: '', width: 192 });
    // const [infoText, setInfoText] = useState('');
    // const [showMore, setShowMore] = useState(false);

    const handlePopup = () => {
        // if (text) {
        //     const charLimit = 50;
        //     if (text?.length > charLimit) {
        //         const shortText = text?.slice(0, charLimit) + '...';
        //         setInfoText(shortText);
        //         setShowMore(true);
        //     }
        //     else {
        //         setInfoText(text);
        //     }
        // }
        // else {
        //     setInfoText('Info text');
        // }
        // Determine the position of the info button
        const popupWidth = 192;
        const infoButtonPosition = menuRef.current?.getBoundingClientRect();

        if (infoButtonPosition) {
            const hasSpaceOnLeft = infoButtonPosition.left >= popupWidth / 2;
            const hasSpaceOnRight = window.innerWidth - infoButtonPosition.right >= popupWidth / 2;

            if (hasSpaceOnLeft && hasSpaceOnRight) {
                // Enough space on both sides, center the popup
                setPopupStyle({ left: '50%', right: 'auto', width: popupWidth, transform: 'translateX(-50%)' });
            } else if (hasSpaceOnLeft) {
                // Not enough space on the right, position on the left
                const rightPosition = -(window.innerWidth - infoButtonPosition.right + window.scrollX - 10);
                setPopupStyle({ left: 'auto', right: rightPosition, width: popupWidth, transform: 'none' });
            } else if (hasSpaceOnRight) {
                // Not enough space on the left, position on the right
                const lefttPosition = - (infoButtonPosition.left + window.scrollX - 10);
                setPopupStyle({ left: lefttPosition, right: 'auto', width: popupWidth, transform: 'none' });
            }
        }
        setShowPopup(true);
    }


    const handleClickOutside = (event: { target: any; }) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowPopup(false);
        }
    };


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // const handleReadMore = () => {
    //     setInfoText(text);
    //     setShowMore(false);
    // }

    return (
        <div className="info-container" ref={menuRef}>
            <div
                className="cursor-pointer infoIcon"
                onClick={() => handlePopup()}
            >
                <AiOutlineInfoCircle className={`icon-color-5 margin-left-1 fs-20 ${classname}`} />
            </div>
            {showPopup && (
                <div className='popup' style={{ ...popupStyle }}>
                    <p className='margin-0 text-start info-text-wrap' dangerouslySetInnerHTML={{ __html: text }} />
                    {/* {showMore
                        &&
                        <Button
                            theme={ButtonTheme.primary}
                            size={ButtonSize.xsmall}
                            variant={ButtonVariant.transparent}
                            onClick={() => handleReadMore()}
                            classname='margin-0 h-auto padding-0'
                        >
                            Read More
                        </Button>
                    } */}
                </div>
            )}
        </div>
    )
}

export default InfoPanel
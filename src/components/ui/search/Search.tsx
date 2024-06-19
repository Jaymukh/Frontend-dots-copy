import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import styles from './Search.module.css';

interface SearchProps {
    handleInputChange: (value: string) => void;
    handleSelectValue?: (value: string) => void;
    data?: any;
    searchTerm: string;
    suggestions?: any;
    labelKey?: any;
    valueKey?: any;
    hideSuggestionBox: boolean;
    placeholderValue: string;
    classname?: string;
}

const Search = ({ handleInputChange, handleSelectValue, data, searchTerm, suggestions, labelKey, valueKey, hideSuggestionBox, placeholderValue, classname }: SearchProps) => {
    const [hideSuggestions, setHideSuggestions] = useState<boolean>(true);

    const handleSelectOption = (value: any) => {        
        if (handleSelectValue) {
            handleSelectValue(value);
        }
    }

    return (
        <div className={`d-flex flex-column h-auto ${styles.suggestion_menu}`}>
            <div className="d-flex flex-column justify-content-center align-items-start">
                <input
                    onFocus={() => setHideSuggestions(false)}
                    onBlur={async () => {
                        setTimeout(() => {
                            setHideSuggestions(true);
                        }, 200);
                    }}
                    type="text"
                    placeholder={placeholderValue}
                    value={searchTerm}
                    className={classname}
                    onChange={(e) => {
                        handleInputChange(e.target.value);
                    }}
                />
                <span className={styles.icon}><GoSearch className="fs-22" /></span>
            </div>

            {!hideSuggestionBox &&
                <div
                    className={`padding-top-bottom-1 ${classname} ${hideSuggestions ? styles.suggestions_hidden : styles.suggestions_visible} ${styles.suggestion_menu_dropdown} ${suggestions?.length < 3 ? 'h-auto' : styles.suggestion_height}`}
                >
                    {suggestions?.map((suggestion: any) => (
                        <div
                            className={`text-start padding-top-bottom-1 ${styles.suggestions_item}`}                            
                        >
                            <p className='padding-left-right-3 margin-0' onClick={() => handleSelectOption(suggestion[labelKey])}>{suggestion[labelKey]}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Search;
import './Spinner.css';
import { spinnerState } from '../../../states';
import { useRecoilState } from 'recoil';
import spinnerGif from '../../../utils/images/spinnerGIF.gif'

export const Spinner = ({ spinnerFlag }: { spinnerFlag?: boolean }) => {
    const [spinner] = useRecoilState(spinnerState);
    return (
        <>
            {(spinnerFlag || spinner) &&
                <div className="spinner-wrapper1">
                    <div className="spinner-overlay1 d-flex justify-content-center align-items-center">
                        <div className="w-100">
                            <img src={spinnerGif} alt="spinner" className="spinner-size" />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

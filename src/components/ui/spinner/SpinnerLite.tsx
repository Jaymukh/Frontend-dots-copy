import './Spinner.css';
import { spinnerLiteState } from '../../../states';
import { useRecoilState } from 'recoil';
import spinnerGif from '../../../utils/images/spinnerGIF.gif'

export const SpinnerLite = () => {
    const [spinnerLite] = useRecoilState(spinnerLiteState);
    return (
        <>
            {spinnerLite &&
                <div className="spinner-lite-wrapper">
                    <div className="spinner-lite-overlay d-flex justify-content-center align-items-center">
                        <div className="w-100">
                            <img src={spinnerGif} alt="spinner" className="spinner-size" />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

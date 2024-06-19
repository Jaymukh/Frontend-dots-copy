/* eslint-disable @typescript-eslint/no-unused-vars */
// External libraries
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';

// Components
import { AllSettingsState, authState, errorState, userCurrencyState } from '../states';

const useMapHelpers = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const settings = useRecoilValue(AllSettingsState);
    const currencies = settings.currencies;
    const setError = useSetRecoilState(errorState);
    const setUserCurrency = useSetRecoilState(userCurrencyState);
    const setAuth = useSetRecoilState(authState);
    
    const getCurrencyWithSymbol = (value: null | number | string, currency?: string | null) => {
        if (value !== undefined && value !== null) {
            if (currency) {
                const selectedCurrency = currencies?.find(item => item.code === currency);
                return selectedCurrency?.symbol! + value.toString();
            }
            return value;
        }
        return '--';
    };

    const getNumberWithZero = (value: null | number | string) => {
        if (value !== undefined && value !== null) {
            const numericValue = typeof value === 'string' ? parseInt(value, 10) : value;
            if (numericValue < 10) {
                return '0' + numericValue.toString();
            }
            return numericValue.toString();
        }
        return '--';
    };

    const getSelectedObject = () => {
        const params: any = {};
        searchParams?.toString().split('&').forEach((param) => {
            let [key, value]: any = param.split('=');
            value = Number(value) ? Number(value) : value;
            params[key] = value;
        });
        return params;
    }

    const getErrorMsg = (error: any) => {
        let detail = error?.response?.data?.detail;
        const token_erros = ['authentication credentials were not provided.', 'invalid refresh token'];
        if (detail) {
            if (detail?.toLowerCase() === 'user not found') {
                localStorage.removeItem('user');
                localStorage.removeItem('currency');
                setAuth({});
                setUserCurrency('');
            } else if (!token_erros.some(string => string.includes(detail.toLowerCase()))) {
                setError({ type: 'Error', message: detail });
            }
        } else {
            setError({ type: 'Error', message: "Something went wrong. Please try again." });
        }

    }

    const getCoreSolutions = (data: any) => {
        const coreSolutionList = [
            { name: 'Education', key: 'spendOnEducation' },
            { name: 'Healthcare', key: 'spendOnHealthCare' },
            { name: 'Financial Solutions', key: 'spendOnFinancialSolution' },
            { name: 'Agri Markets', key: 'spendOnAgricultureMarket' }
        ];
        const item = coreSolutionList.find(({ key }) => data?.hasOwnProperty(key));

        if (item) {
            return { key: item.key, name: item.name, value: getCurrencyWithSymbol(data[item.key], data[item.key + 'UOM']) };
        }
        return null;
    }

    const createImage = (url: any) =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => resolve(image))
            image.addEventListener('error', (error) => reject(error))
            image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
            image.src = url
        })

    const getRadianAngle = (degreeValue: any) => {
        return (degreeValue * Math.PI) / 180
    }

    /**
     * Returns the new bounding area of a rotated rectangle.
     */
    const rotateSize = (width: any, height: any, rotation: any) => {
        const rotRad = getRadianAngle(rotation)

        return {
            width:
                Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
            height:
                Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
        }
    }

    /**
     * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
     */
    const getCroppedImg = async (
        imageSrc: any,
        pixelCrop: { width: number; height: number; x: number; y: number; },
        rotation = 0,
        flip = { horizontal: false, vertical: false }
    ) => {
        const image: any = await createImage(imageSrc);
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
            return null
        }

        const rotRad = getRadianAngle(rotation)

        // calculate bounding box of the rotated image
        const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
            image.width,
            image.height,
            rotation
        )

        // set canvas size to match the bounding box
        canvas.width = bBoxWidth
        canvas.height = bBoxHeight

        // translate canvas context to a central location to allow rotating and flipping around the center
        ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
        ctx.rotate(rotRad)
        ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
        ctx.translate(-image.width / 2, -image.height / 2)

        // draw rotated image
        ctx.drawImage(image, 0, 0)

        const croppedCanvas = document.createElement('canvas')

        const croppedCtx = croppedCanvas.getContext('2d')

        if (!croppedCtx) {
            return null
        }

        // Set the size of the cropped canvas
        croppedCanvas.width = pixelCrop.width
        croppedCanvas.height = pixelCrop.height

        // Draw the cropped image onto the new canvas
        croppedCtx.drawImage(
            canvas,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        )

        // As Base64 string
        // return croppedCanvas.toDataURL('image/jpeg');

        // As a blob
        return new Promise((resolve, reject) => {
            croppedCanvas.toBlob((file) => {
                if (file) {
                    return resolve(URL.createObjectURL(file));
                }
            }, 'image/jpeg')
        })
    }


    return {
        getCurrencyWithSymbol,
        getNumberWithZero,
        getSelectedObject,
        getCoreSolutions,
        createImage,
        getRadianAngle,
        rotateSize,
        getCroppedImg,
        getErrorMsg,
    };
};

export { useMapHelpers };
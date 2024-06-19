import { atom } from 'recoil';

export interface geoJSONProps {
    type: string;
    features: any;
    legendProperties: {
        show: boolean;
        legend_label: string;
        legend_end: string;
        legend_end_color: string;
        legend_mid: string
        legend_start: string
        legend_start_color: string;
    }
    rootProperties: {
        Name: string;
        id: string;
        region: string;
    }
}

const geoJsonState = atom({
    key: 'geojson',
    default: {} as geoJSONProps
});

export { geoJsonState };
const initialGenerator = (value: string) => {
    if (value) {
        let initial = value.split(' ');
        if (initial[1]) {
            return initial[0][0].toUpperCase() + initial[1][0].toUpperCase();
        } else {
            return initial[0][0].toUpperCase();
        }
    } else {
        return '';
    }
}

const hRange = [0, 360];
// const sRange = [0, 100];
// const lRange = [0, 100];
const sRange = [0, 80]; 
const lRange = [0, 100]; 

const getHashOfString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
};

const normalizeHash = (hash: number, min: number, max: number) => {
    return Math.floor((hash % (max - min)) + min);
};

const HSLtoString = (hsl: [number, number, number]) => {
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
};

const generateHSL = (name: string) => {
    const hash = getHashOfString(name);
    const h = normalizeHash(hash, hRange[0], hRange[1]);
    const s = normalizeHash(hash, sRange[0], sRange[1]);
    const l = normalizeHash(hash, lRange[0], lRange[1]);
    const hsl = HSLtoString([h, s, l]);
    return hsl;
};

export { initialGenerator, generateHSL };
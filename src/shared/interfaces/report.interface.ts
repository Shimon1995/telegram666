type Img = string;

interface Location {
    latitude: number;
    longitude: number;
}

export interface IReport {
    chat_id: number;
    image?: Img;
    location?: Location; // to make necessary
    text: string;
}
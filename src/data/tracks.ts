export interface Track {
    id: string;
    title: string;
    artist: string; // Optional, can add if known
    src: string;
    cover: string;
}

export const TRACKS: Track[] = [
    {
        id: 'caravan',
        title: 'Caravan',
        artist: 'Unknown',
        src: import.meta.env.BASE_URL + 'music/caravan.mp3',
        cover: import.meta.env.BASE_URL + 'music/caravan.jpg'
    },
    {
        id: 'creep',
        title: 'Creep',
        artist: 'Radiohead',
        src: import.meta.env.BASE_URL + 'music/creep.mp3',
        cover: import.meta.env.BASE_URL + 'music/creep.jpg'
    },
    {
        id: 'end-of-beginning',
        title: 'End of Beginning',
        artist: 'Djo',
        src: import.meta.env.BASE_URL + 'music/end of beginning.mp3',
        cover: import.meta.env.BASE_URL + 'music/end of beginning.jpg'
    },
    {
        id: 'loser',
        title: 'Loser',
        artist: 'Beck',
        src: import.meta.env.BASE_URL + 'music/loser.mp3',
        cover: import.meta.env.BASE_URL + 'music/loser.png'
    },
    {
        id: 'my-old-ways',
        title: 'My Old Ways',
        artist: 'Dr. Dog',
        src: import.meta.env.BASE_URL + 'music/my old ways.mp3',
        cover: import.meta.env.BASE_URL + 'music/my old ways.png'
    },
    {
        id: 'the-less-i-know',
        title: 'The Less I Know The Better',
        artist: 'Tame Impala',
        src: import.meta.env.BASE_URL + 'music/the less i know the better.mp3',
        cover: import.meta.env.BASE_URL + 'music/the less i know the better.jpg'
    },
    {
        id: 'nikamma',
        title: 'Nikamma',
        artist: 'Lifafa',
        src: import.meta.env.BASE_URL + 'music/nikamma.mp3',
        cover: import.meta.env.BASE_URL + 'music/nikamma.jpg'
    }
];

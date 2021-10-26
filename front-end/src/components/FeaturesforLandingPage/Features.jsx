const features = [
    {
        id: 1,
        title: 'Portfolio',
        description:
            "Allow user to add Stock and Crypto to their Wallet and display their cumulative profit/loss thus far through Graphs",
        imageUrl: process.env.PUBLIC_URL + '/logo192.png',
        time: 1500,
        src: 'sentiment_analysis.png',
    },
    {
        id: 2,
        title: 'Sentiment Analysis',
        description:
            "Allow users to get a general overview of the sentiments surrounding the investments in their portfolio",
        imageUrl: process.env.PUBLIC_URL + '/sentiment_analysis.jpg',
        src: 'sentiment_analysis.png',
        time: 1500,
    },
    {
        id: 3,
        title: 'NFA - Not Financial Advice',
        description:
            "Allow users to get a short term price prediction based on technical indicators through a Machine Learning model",
        imageUrl: process.env.PUBLIC_URL + '/NFA.png',
        time: 1500,
        src: 'NFA.png',
    },
    {
        id: 4,
        title: 'News',
        description:
            "Allow users to get a short term price prediction based on technical indicators through a Machine Learning model",
        imageUrl: process.env.PUBLIC_URL + '/NFA.png',
        time: 1500,
        src: 'News.png',
    },
];

export default features;
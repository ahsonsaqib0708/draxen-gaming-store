// Vercel Serverless Function for products API
const products = [
    {
        id: 'gambit-pro-keyboard',
        name: 'Gambit Pro Keyboard',
        slug: 'gambit-pro-keyboard',
        category: 'keyboards',
        description: 'Low-latency mechanical keyboard with per-key RGB lighting.',
        price: 189.99,
        originalPrice: 229.99,
        rating: { average: 4.9, count: 128 },
        stock: 18,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOdn5gbVU-t_QOQ-DuDzTpTgK-8pxSQzuxlmkLrN4_7SRR3NMN9Mt3L1SbUjm-528ooRzrBNgxC9jr_T9L7v8UgX_pO6V7sRWnrZGwkV5iLdpbAzVq_taEpya5__k_qc3qyodTjPAMyJmNI3_pfZQJVuraNETC1o6Loq7TEM-0G4ATUpvhqUPwNmGckRPw-GKfzXrxdkqcjzHfkjGf4f48HRr1zi_7wVnv0FOiLAihUxIza9NXQuUJYL6BjnSzsJHGDLe_jgr_6rw',
        tags: ['featured', 'rgb']
    },
    {
        id: 'phantom-x7-headset',
        name: 'Phantom X7',
        slug: 'phantom-x7-headset',
        category: 'headphones',
        description: 'Wireless 7.1 spatial audio headset with noise-isolating microphone.',
        price: 249.99,
        originalPrice: 299.99,
        rating: { average: 5, count: 94 },
        stock: 11,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyIbrzrT5AUHaM8al4e8q9Lra1G5cNP2mYj3F3Y20-9eQSOK2qvDpkr5Dcw2PtJfiSJzbihKjSZSyJr8CwPiIH69oEPZ36U9jzf-Ap8nYhOIarLpN9YhAgqpv1DKK2k9G1XZRWlOmXN7XENNOHGXYsCrVmcoXQ74AKHepXMvE7cIAfM4xf9pF7hYiMLO0Cn5qNBMThs6mFzwAA6kvZ1DJLsMGVkkydxL29x00btYW5MhYhqoyg8IyTNKC_-brIOWRyd-CkTqMWN-s',
        tags: ['featured', 'wireless']
    },
    {
        id: 'nexus-reactor-pc',
        name: 'NEXUS Reactor',
        slug: 'nexus-reactor-pc',
        category: 'custom-pc',
        description: 'Liquid-cooled custom gaming PC tuned for high-refresh esports.',
        price: 3499,
        originalPrice: 3899,
        rating: { average: 4.8, count: 12 },
        stock: 4,
        image: 'https://lh3.googleusercontent.com/aida/AP1WRLsoF2Yxk-0wBfpE-bRUpcIdby3S2bLDj7BR1ZZqsz2eNk55hKuLPSbupGBckUcltL_TuzKpLpejlP31025pwvxDt7YTKtDwuP8kMTF6_AHV7fLacjzKpLfgb8GcuFkfVHJKws2nsKh4Kh5pE0JrVSI-FAAXgB6wSbuG5euCi5puLKerF0eyuGby53m9BHiB7C3NS_4xDNDw3Tj51nA9BiFf_qDx4IFtM9BNZCsSVuFZQQnfF9tWhsgs6mw',
        tags: ['featured', 'custom']
    },
    {
        id: 'rgb-light-bars',
        name: 'RGB Ambient Light Bars',
        slug: 'rgb-light-bars',
        category: 'accessories',
        description: 'Vertical RGB light bars with soft neon diffusion.',
        price: 89.99,
        originalPrice: 119.99,
        rating: { average: 4.7, count: 67 },
        stock: 25,
        image: null,
        tags: ['lighting', 'accessories']
    }
];

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ products });
};

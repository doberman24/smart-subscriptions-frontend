export const reviewsApi = {
    async getReviews() {
        return [
            {
                id: 1,
                userName: 'Дмитрий',
                feedback: {
                    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sunt sapiente vitae expedita velit quos, alias consectetur debitis facere veniam corrupti commodi tempore consequuntur quas dignissimos, reprehenderit illo cumque. Odit!',
                    goodRate: 3,
                    badRate: 2,
                    createdData: 'Дата: 12.05.2024',
                }
            },
            {
                id: 2,
                userName: 'Сергей',
                feedback: {
                    comment: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque eos laborum rem? Omnis asperiores molestiae voluptates optio, suscipit ea commodi placeat nostrum perspiciatis facilis eum eveniet?',
                    goodRate: 5,
                    badRate: 0,
                    createdData: 'Дата: 01.11.2024',
                }
            },
            {
                id: 3,
                userName: 'Олег',
                feedback: {
                    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae odio tempore assumenda, molestias, fuga at sequi ratione est deleniti repellendus illo atque! Dolores unde vel iste delectus nam numquam ex.',
                    goodRate: 1,
                    badRate: 4,
                    createdData: 'Дата: 27.01.2025',
                }
            }
        ];
    },
};

export const userApi = {
    async getUser() {
        return {
            "user": {
                "id": "1",
                "name": "Анатолий",
                "email": "anatoly@example.com",
                "currency": "RUB"
            },
            "subscriptions": {
                "summary": {
                    "activeCount": 5,
                    "monthlySpending": 2490,
                    "nextPayment": {
                        "title": "Netflix",
                        "amount": 899,
                        "date": "2025-04-10"
                    }
                },
                "latest": [
                    {
                        "id": "sub_101",
                        "title": "Spotify",
                        "amount": 269,
                        "billingDate": "2025-04-15",
                        "lastPaymentDate": "2025-03-15",
                        "isPaid": true,
                        "category": "Музыка",
                        "icon": "spotify.png",
                        "status": "active"
                    },
                    {
                        "id": "sub_102",
                        "title": "Netflix",
                        "amount": 899,
                        "billingDate": "2025-04-09",
                        "lastPaymentDate": "2025-03-09",
                        "isPaid": false,
                        "category": "Развлечения",
                        "icon": "yandex.png",
                        "status": "active"
                    },
                    {
                        "id": "sub_103",
                        "title": "Notion",
                        "amount": 499,
                        "billingDate": "2025-04-03",
                        "lastPaymentDate": "2025-03-03",
                        "isPaid": true,
                        "category": "Продуктивность",
                        "icon": "notion.png",
                        "status": "active"
                    }
                ]
            },
            "analytics": {
                "byCategory": [
                    {
                        "category": "Развлечения",
                        "total": 1198
                    },
                    {
                        "category": "Музыка",
                        "total": 269
                    },
                    {
                        "category": "Продуктивность",
                        "total": 499
                    },
                    {
                        "category": "Образование",
                        "total": 524
                    }
                ],
                "topSpending": [
                    {
                        "title": "YouTube Premium",
                        "amount": 799,
                    },
                    {
                        "title": "Notion",
                        "amount": 499
                    },
                    {
                        "title": "Coursera",
                        "amount": 524
                    }
                ],
            },
        };
    },
};
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

export const subscriptionsApi = {
    async getSubscriptions() {
        return [
            {
              id: 'sub_001',
              title: 'Netflix',
              amount: 999,
              billingDate: '2025-05-01',
              recurrence: 'Ежемесячно',
              category: 'Развлечения',
              icon: 'netflix.png',
              paymentMethod: 'Карта Visa',
              status: 'active',
              isPaid: true,
              isNew: false
            },
            {
              id: 'sub_002',
              title: 'Spotify',
              amount: 269,
              billingDate: '2025-04-08',
              recurrence: 'Ежемесячно',
              category: 'Музыка',
              icon: 'spotify.png',
              paymentMethod: 'СБП',
              status: 'active',
              isPaid: false,
              isNew: true
            },
            {
              id: 'sub_003',
              title: 'GitHub Copilot',
              amount: 1000,
              billingDate: '2025-04-15',
              recurrence: 'Ежемесячно',
              category: 'Разработка',
              icon: 'copilot.png',
              paymentMethod: 'Карта MasterCard',
              status: 'inactive',
              isPaid: false,
              isNew: false
            },
            {
              id: 'sub_004',
              title: 'Яндекс Плюс',
              amount: 299,
              billingDate: '2025-05-10',
              recurrence: 'Ежемесячно',
              category: 'Сервисы',
              icon: 'yandex.png',
              paymentMethod: 'Карта Visa',
              status: 'active',
              isPaid: true,
              isNew: false
            },
            {
              id: 'sub_005',
              title: 'Duolingo Premium',
              amount: 199,
              billingDate: '2025-04-18',
              recurrence: 'Ежемесячно',
              category: 'Образование',
              icon: 'duolingo.png',
              paymentMethod: 'СБП',
              status: 'active',
              isPaid: false,
              isNew: true
            },
            {
              id: 'sub_006',
              title: 'Adobe Creative Cloud',
              amount: 2399,
              billingDate: '2025-04-25',
              recurrence: 'Ежемесячно',
              category: 'Работа',
              icon: 'adobe.png',
              paymentMethod: 'Карта MasterCard',
              status: 'active',
              isPaid: true,
              isNew: false
            },
            {
              id: 'sub_007',
              title: 'Zoom Pro',
              amount: 1199,
              billingDate: '2025-04-20',
              recurrence: 'Ежемесячно',
              category: 'Работа',
              icon: 'zoom.png',
              paymentMethod: 'Карта Visa',
              status: 'inactive',
              isPaid: false,
              isNew: false
            },
            {
              id: 'sub_008',
              title: 'Дом.ru Интернет',
              amount: 899,
              billingDate: '2025-04-12',
              recurrence: 'Ежемесячно',
              category: 'ЖКХ',
              icon: 'domru.png',
              paymentMethod: 'СБП',
              status: 'active',
              isPaid: true,
              isNew: false
            },
            {
              id: 'sub_009',
              title: 'FitOn Pro',
              amount: 499,
              billingDate: '2025-04-22',
              recurrence: 'Ежемесячно',
              category: 'Здоровье',
              icon: 'fiton.png',
              paymentMethod: 'Карта MasterCard',
              status: 'active',
              isPaid: false,
              isNew: true
            },
            {
              id: 'sub_010',
              title: 'Xbox Game Pass',
              amount: 799,
              billingDate: '2025-04-14',
              recurrence: 'Ежемесячно',
              category: 'Игры',
              icon: 'xbox.png',
              paymentMethod: 'Карта Visa',
              status: 'active',
              isPaid: false,
              isNew: false
            }
        ];
    },
};
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
                        "titleSub": "Spotify",
                        "amount": 269,
                        "billingDate": "2025-05-15",
                        "recurrence": "Ежемесячно",
                        "isPaid": true,
                        "category": "Музыка",
                        "icon": "spotify.png",
                        "status": "active"
                    },
                    {
                        "id": "sub_102",
                        "titleSub": "Adobe Creative Cloud",
                        "amount": 899,
                        "billingDate": "2025-04-15",
                        "recurrence": "Ежемесячно",
                        "isPaid": false,
                        "category": "Работа",
                        "icon": "yandex.png",
                        "status": "active"
                    },
                    {
                        "id": "sub_103",
                        "titleSub": "Notion",
                        "amount": 499,
                        "billingDate": "2025-05-10",
                        "recurrence": "Ежемесячно",
                        "isPaid": true,
                        "category": "Продуктивность",
                        "icon": "notion.png",
                        "status": "inactive"
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
              titleSub: 'Netflix',
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
              titleSub: 'Spotify',
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
              titleSub: 'GitHub Copilot',
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
              titleSub: 'Яндекс Плюс',
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
              titleSub: 'Duolingo Premium',
              amount: 199,
              billingDate: '2025-04-17',
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
              titleSub: 'Adobe Creative Cloud',
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
              titleSub: 'Zoom Pro',
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
              titleSub: 'Дом.ru Интернет',
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
              titleSub: 'FitOn Pro',
              amount: 499,
              billingDate: '2025-04-22',
              recurrence: 'Ежемесячно',
              category: 'Здоровье',
              icon: 'fiton.png',
              paymentMethod: 'Карта MasterCard',
              status: 'active',
              isPaid: true,
              isNew: true
            },
            {
              id: 'sub_010',
              titleSub: 'Xbox Game Pass',
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

export const analiticsApi = {
    async getAnalitics() {
        return {
            "filters": {
                "selectedPeriod": "Последние 30 дней",
                "subscriptionType": "Все"
            },
            "overview": {
                "totalSpent": 8640,
                "activeSubscriptions": 7,
                "averageMonthly": 8800,
                "trend": {
                    "direction": "down",
                    "percent": 12.5
                }
            },
            "spendingOverTime": [
                { "date": "2025-03-20", "amount": 300 },
                { "date": "2025-03-22", "amount": 1200 },
                { "date": "2025-03-28", "amount": 600 },
                { "date": "2025-04-01", "amount": 2400 },
                { "date": "2025-04-05", "amount": 1600 },
                { "date": "2025-04-10", "amount": 900 },
                { "date": "2025-04-15", "amount": 1640 }
            ],
            "categoryBreakdown": [
                { "category": "ЖКХ", "amount": 2600, "color": "#3b82f6" },
                { "category": "Развлечения", "amount": 1800, "color": "#10b981" },
                { "category": "Транспорт", "amount": 1200, "color": "#f59e0b" },
                { "category": "Образование", "amount": 1600, "color": "#8b5cf6" },
                { "category": "Прочее", "amount": 1440, "color": "#ef4444" }
            ],
            "topSubscriptions": [
                {
                    "name": "Netflix",
                    "logo": "netflix.svg",
                    "amount": 999,
                    "category": "Развлечения"
                },
                {
                    "name": "Яндекс Плюс",
                    "logo": "yandex.svg",
                    "amount": 599,
                    "category": "Развлечения"
                },
                {
                    "name": "Городской ЖКХ",
                    "logo": "utilities.svg",
                    "amount": 2600,
                    "category": "ЖКХ"
                },
                {
                    "name": "Coursera",
                    "logo": "coursera.svg",
                    "amount": 1600,
                    "category": "Образование"
                },
                {
                    "name": "Spotify",
                    "logo": "spotify.svg",
                    "amount": 899,
                    "category": "Развлечения"
                }
            ],
            "recurringPayments": [
                {
                    "name": "Netflix",
                    "interval": "ежемесячно",
                    "nextPayment": "2025-05-01"
                },
                {
                    "name": "ЖКХ: вода, свет",
                    "interval": "ежемесячно",
                    "nextPayment": "2025-05-05"
                },
                {
                    "name": "Coursera Plus",
                    "interval": "раз в год",
                    "nextPayment": "2026-03-15"
                },
                {
                    "name": "Spotify",
                    "interval": "ежемесячно",
                    "nextPayment": "2025-04-28"
                },
                {
                    "name": "Google Drive",
                    "interval": "ежемесячно",
                    "nextPayment": "2025-04-20"
                }
            ],
            "recommendations": [
                {
                    "type": "inactive",
                    "message": "Вы не использовали подписку 'Coursera Plus' более 3 месяцев"
                },
                {
                    "type": "price_increase",
                    "message": "Подписка 'Netflix' подорожала на 20%"
                },
                {
                    "type": "high_spending",
                    "message": "Вы тратите более 2500 ₽ на категорию 'ЖКХ' в месяц"
                }
            ]
        };
    },
};
export const feedbackApi = {
    async getFeedback() {
        return [
            {
                id: 1,
                userName: 'Дмитрий',
                comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sunt sapiente vitae expedita velit quos, alias consectetur debitis facere veniam corrupti commodi tempore consequuntur quas dignissimos, reprehenderit illo cumque. Odit!',
                goodRate: 3,
                badRate: 2,
                createdData: 'Дата: 12.05.2024',
            },
            {
                id: 2,
                userName: 'Сергей',
                comment: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque eos laborum rem? Omnis asperiores molestiae voluptates optio, suscipit ea commodi placeat nostrum perspiciatis facilis eum eveniet?',
                goodRate: 5,
                badRate: 0,
                createdData: 'Дата: 01.11.2024',
            },
            {
                id: 3,
                userName: 'Олег',
                comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae odio tempore assumenda, molestias, fuga at sequi ratione est deleniti repellendus illo atque! Dolores unde vel iste delectus nam numquam ex.',
                goodRate: 1,
                badRate: 4,
                createdData: 'Дата: 27.01.2025',
            }
        ];
    },
} 
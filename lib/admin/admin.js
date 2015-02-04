AdminConfig = {
    name: 'Selfie',
    adminEmails: ['andrew.sygyda@gmail.com', 'admin@selfie.com'],
    collections: {
        Missions: {
            icon: 'money',
            tableColumns: [
                { label: 'Name', name: 'name' },
                { label: 'From', name: 'from' },
                { label: 'To', name: 'to' },
                { label: 'Uploads', name: 'uploadsQty' },
                { label: 'Prize', name: 'prize' },
                { label: 'Prize quantity', name: 'prizeQty' },
                { label: 'Prize type', name: 'prizeType' }
            ],
            auxCollections: ['MissionTeaser', 'MissionBrand', 'MissionSponsor']
        },
        Themes: {
            icon: 'list',
            tableColumns: [
                { label: 'Name', name: 'name' },
                { label: 'Link', name: 'link' },
                { label: 'Title', name: 'title' },
                { label: 'Uploads Quantity', name: 'uploadsQty' }
            ],
            auxCollections: ['ThemeBg']
        },
        About: {
            icon: 'pencil',
            tableColumns: [
                { label: 'Title', name: 'title' },
                { label: 'Link', name: 'link' }
            ],
            color: 'green'
        }
    }
};

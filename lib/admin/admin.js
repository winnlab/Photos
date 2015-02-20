AdminConfig = {
    name: 'Selfie',
    adminEmails: ['andrew.sygyda@gmail.com', 'admin@selfie.com'],
    collections: {
        Missions: {
            icon: 'money',
            color: 'aqua',
            tableColumns: [
                { label: 'Name', name: 'name' },
                { label: 'Von', name: 'from' },
                { label: 'Bis', name: 'to' },
                { label: 'Hochgeladene Bilder', name: 'uploadsQty' },
                { label: 'Teilnehmer', name: 'participantsQty' },
                { label: 'Prize', name: 'prize' },
                { label: 'Bilder', name: '_id', template: 'missionShareBtn' }
            ],
            auxCollections: ['MissionTeaser', 'MissionBrand', 'MissionSponsor'],
            label: 'Missionen'
        },
        Themes: {
            icon: 'list',
            color: 'purple',
            tableColumns: [
                { label: 'Name', name: 'name' },
                { label: 'Link', name: 'link' },
                { label: 'Überschrift', name: 'title' },
                { label: 'Hochgeladene Menge', name: 'uploadsQty' }
            ],
            auxCollections: ['ThemeBg'],
            label: 'Kategorien'
        },
        About: {
            icon: 'pencil',
            tableColumns: [
                { label: 'Überschrift', name: 'title' },
                { label: 'Link', name: 'link' }
            ],
            color: 'green',
            label: 'Über uns CMS'
        },
        Share: {
            icon: 'image',
            color: 'yellow',
            label: 'Bilder',
            templates: {
                view: 'adminShareWrapper'
            }
        },
        Complaints: {
            icon: 'ban',
            color: 'red',
            label: 'Beschwerden',
            tableColumns: [
                { label: 'Bilder', name: 'sourceId', template: 'adminComplaintsShare' },
                { label: 'Benutzer', name: 'users', template: 'adminComplaintsUsers' },
                { label: 'Grund', name: 'reason' },
                { label: 'Menge', name: 'counter' }
            ]
        }
    }
};

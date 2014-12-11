
if (Missions.find().count() === 0) {
    var now = new Date().getTime();

    // insert missions
    Missions.insert({
        name: '„Dein schönstes Urlaubsvideo“',
        from: new Date(now - 5 * 24 * 3600 * 1000).getTime(),
        to: new Date(now + 5 * 24 * 3600 * 1000).getTime(),
        uploadsQty: 30,
        description: 'Schon wieder Fernweh? Wir auch! Und damit wir auch in den kalten Wintermonaten in Urlaubsstimmung bleiben, wollen wir eure schönsten Urlaubsvideos sehen und in Gedanken schon mal das nächste Flugticket buchen. Ob beim Surfen am Strand von Mexico, Klettern in der Bergwelt Südtirols oder eurem Roadtrip durch die Südstaaten, zeigt uns, was ihr in eurem letzten Urlaub erlebt habt und teilt eure coolsten Abenteuer in bewegenden 30-Sekündern mit uns und der Community. Für tolle Urlaubstipps sind wir mehr als dankbar und belohnen die besten drei Videos am Ende der Mission mit je 100 Euro für die Urlaubskasse.',
        bg: {
            name: '46a2b26950aed39c615af90227a87b7b',
            time: 1418058656
        },
        listBg: {
            name: '46a2b26950aed39c615af90227a87b7b',
            time: 1418058478
        },
        prize: 100,
        prizeQty: 3,
        prizeType: 'money',
        sponsor: {
            icon: 'sponsor_icon_web_46a2b26950aed39c615af90227a87b7b_1418058478.png',
            name: 'Sponsor name',
            link: 'http://www.travelbook.de/'
        },
        ended: false,
        active: true
    });

    Missions.insert({
        name: '„Zahlen, bitte“',
        from: new Date(now - 15 * 24 * 3600 * 1000).getTime(),
        to: new Date(now + 15 * 24 * 3600 * 1000).getTime(),
        uploadsQty: 54,
        description: 'One, two, three - as easy as do-re-mi… Jap, so einfach ist das. Wir wollen endlich Zahlen sehen. Und wer damals in Mathe gut aufgepasst hat, kennt sie alle. Sollte euch also auf dem Weg zur Arbeit, beim Shoppen oder wo auch immer ihr euch so rumtreibt, eine heiße Nummer ins Auge fallen, zückt euer Smartphone und ladet sie in die Mission. Für die, die zahlenmäßig überlegen sind und die schönsten Fotos machen, ist in gut einer Woche Zahltag, denn die Jury belohnt ihre Nummer 1, 2 und 3 am Ende mit je 50 Euro!',
        bg: {
            name: 'eb87897ed366532ce769cbeaddc5b76c',
            time: 1418051167
        },
        listBg: {
            name: 'eb87897ed366532ce769cbeaddc5b76c',
            time: 1418051167
        },
        prize: 50,
        prizeQty: 3,
        prizeType: 'coupons',
        sponsor: null,
        ended: true,
        active: true
    });

    Categories.insert({
        name: 'Mein 1414',
        type: 'mein1414',
        position: 0
    });

    Categories.insert({
        name: 'Neueste',
        type: 'neueste',
        position: 1
    });

    Categories.insert({
        name: 'Beste (7 Tage)',
        type: 'top100',
        position: 2
    });

    Categories.insert({
        name: 'Gewinner',
        type: 'gw1414',
        position: 3
    });

    Categories.insert({
        name: 'Meist kommentiert',
        type: 'most-commented',
        position: 4
    });

    Categories.insert({
        name: 'Videos',
        type: 'videos',
        position: 5
    });

    Categories.insert({
        name: 'Best Clips',
        type: 'bestclips',
        position: 6
    });
}

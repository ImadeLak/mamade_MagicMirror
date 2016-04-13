var config = {
    lang: 'fr',
    time: {
        timeFormat: 24
    },
    weather: {
        //change weather params here:
        //units: metric or imperial
        params: {
            q: 'Courbevoie,France',
            units: 'metric',
            // if you want a different lang for the weather that what is set above, change it here
            lang: 'fr',
            APPID: 'e73d21f6d935fadba5cf6725122a0be6'
        }
    },
    compliments: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
            'Good morning, sensei!',
            'Bonne journée!',
            'Alors bien dormi ?'
        ],
        afternoon: [
            'Wesh, beaugoss!',
            'T\'es au top BG!',
            'Looking good today!'
        ],
        evening: [
            'Hdml ;)',
            'You look nice!',
            'Tout va bien tkt'
        ]
    },
    calendar: {
        maximumEntries: 10
    },
    news: {
        feed: 'http://www.gameblog.fr/rss.php'
    }
}

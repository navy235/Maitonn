let clientConfig = {
    host: '127.0.0.1',
    port: 3035,
    apiRoot: '/api',
    virtualPath: '',
    authToken: 'userAuth',
    product: false,
    app: {
        title: 'Dotaeye.com',
        description: 'All the modern best practices in one example.',
        meta: {
            charSet: 'utf-8',
            property: {
                'og:site_name': 'React Redux Example',
                'og:image': 'https://react-redux.herokuapp.com/logo.jpg',
                'og:locale': 'en_US',
                'og:title': 'React Redux Example',
                'og:description': 'All the modern best practices in one example.',
                'twitter:card': 'summary',
                'twitter:site': '@erikras',
                'twitter:creator': '@erikras',
                'twitter:title': 'React Redux Example',
                'twitter:description': 'All the modern best practices in one example.',
                'twitter:image': 'https://react-redux.herokuapp.com/logo.jpg',
                'twitter:image:width': '200',
                'twitter:image:height': '200'
            }
        }
    }
}

export default clientConfig;

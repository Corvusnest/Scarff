module.exports = {

    // Running Environment (production, development)
    runningEnv: 'development',

    // using https
    https: false,
    // if you are using https, you should set the path of ssl/tls key and cert
    httpsKey: 'https/key.pem',
    httpsCert: 'https/cert.pem',
    httpsPassphrase: '[Your passphrase]',

    // 80, 443, 3000
    port: 3000,

    // logger
    logger: true,
    logFolder: 'log',

    // Cookie (Not recommend)
    cookie: false,
    cookieSecret: '[Your cookie secret]',

    // Session
    session: false,
    sessionSecret: '[Your session secret]',
    sessionAge: 1000 * 60 * 60,

};

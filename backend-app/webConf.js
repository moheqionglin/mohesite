


module.exports = {
    pagiation : {
        PAGE_SIZE: 10,
        COMMENT_SIZE: 5
    },
    cookie:{
        AUTH_COOKIE_NAME: 'AUTH_TOKEN',
        TTL: 1000 * 60 * 60 * 24 * 7
    },
    cache:{
        MAX: 1000,
        MAX_AGE: 1000 * 60 * 60 * 24 * 7
    }
}
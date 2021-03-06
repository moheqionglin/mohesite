


module.exports = {
    pagiation : {
        PAGE_SIZE: 10,
        COMMENT_SIZE: 5
    },
    cookie:{
        AUTH_COOKIE_NAME: 'Auth_token',
        LOGIN_FROM_URL: 'forward_url',
        TTL: 1000 * 60 * 60 * 24 * 7
    },
    cache:{
        MAX: 1000,
        MAX_AGE: 1000 * 60 * 60 * 24 * 7
    },
    oauth2Provider: {
        WEI_BO: 'weibo',
        QQ: 'qq',
        GITHUB: 'github',
        FACEBOOK: 'facebook'
    },
    img:{
        DEFAULT_USER_IMG: 'http://image.moheqionglin.com/image/website/author.jpg'
    },
    forumId:{
        OTHER_ID: '-3',
        BLOG_ID: '-2'
    }
}
/**
 * Created by zhouwanli on 13/05/2017.
 */
'use strict';
var Oauth2AuthResponse = function(localToken, oauth2AuthId, oauth2AuthToken,
                                  expiresAt, oauthProvider, email, name, image, role){
    this.localToken = localToken;
    this.oauth2AuthId = oauth2AuthId;
    this.oauth2AuthToken = oauth2AuthToken;
    this.expiresAt = expiresAt;
    this.oauthProvider = oauthProvider;
    this.email = email;
    this.name = name;
    this.image = image;
    this.role = role;
}

module.exports = Oauth2AuthResponse;
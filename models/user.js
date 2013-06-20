var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = new Schema({
    user_id: { type: String},
    screen_name: { type: String },
    oauth_access_token: { type: String },
    oauth_access_token_secret: { type: String },
    profile_image_url: { type: String }
});

module.exports = mongoose.model('User', User);
module.exports = Reply;

// default replies
const REPLY_ERROR = "An error has occured. Please try again.";
const REPLY_DID_NOT_UNDERSTAND = "I didn't understand that. Can you rephrase?";
const REPLY_SUCCESSFUL = "I understood your message. You can tailor my responses to your messages by analysing the metadata attached with this message.";

function Reply(message) {
    this.message = message;
    this.context = "global";
}

Reply.prototype.toJson = function() {
    var json = {};
    json['message'] = this.message;
    return json;
};
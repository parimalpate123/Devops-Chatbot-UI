/**
 * A wrapper over Rasa NLU's REST API. 
 */

const request = require('request');
const Entity = require('../entity.js');
const Intent = require('../intent.js');



exports.parse = parse;
/**
 * Request Rasa NLU to parse a message. Results are provided via the callback.
 */
function parse(message, callback) {
    console.log("Rasa Parse, message: " +message);
    let  postMsg=createParseRequest(message);
    
    request(postMsg, function(error, response, body) {
        console.log(body[0]);
        body.forEach(rep => {
            console.log("test");
            console.log(rep.recipient_id+"====>"+rep.text);
        });

        callback(error,body);
      //  if (error)
		//	callback(error);
    });
}


function createParseRequest(message) {
    return {
        method: 'POST',
        uri: 'http://localhost:5005/conversations/default/respond',
        json: true,
        body: {
           
            'query':message
        }
    }
}
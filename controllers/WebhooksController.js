require('dotenv').config();

module.exports = class WebhooksController {


    static async handleWebhookPost(req, res){

        const body = req.body;

        console.log('body', body);

        if(body.object === 'page'){
          body.entry.forEach( entry => {
                const webhook_event = entry.messaging[0];
                console.log(webhook_event);

                entry.changes.forEach(change => {
                    
                    if(change.field === 'leadgen'){
                        const leadgen = change.value;
                        console.log(leadgen);
                    }


                })
          })
        }
        
        res.status(200).send('EVENT_RECEIVED');
    }

    static async handleWebhookGet(req, res){
    try {
        
        const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        console.log('mode', mode);

        if(mode && token){
            if(mode === 'subscribe' && token === VERIFY_TOKEN){
                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);
            }else{
                res.sendStatus(403);
            }
        
        }
    } catch (error) {
        console.log(error.stack);
        res.sendStatus(500);   
    }

    }


}

const axios = require('axios');
const crypto = require('crypto');
const { format } = require('date-fns');
const { checkUserExists } = require('./subscription.services');

const getSubscription = async (req, res) => {
    const data=req.body
    const { msisdn, svc_id, ext_ref, channel,svc_name } = data;
    try {
        
        checkUserExists(data, async (err, result) => {

            
            if (err) {
                console.log(err, "Error checking user existence");
                return res.status(500).json({ message: "Error checking subscription", error: err.message });
            }

            console.log("=====data===", result);

            
            if (result.length > 0) {
                // return res.send(result);
                return res.json({result,"statusId":"1"})
            }
            else{

            const url = process.env.URL;
            const accessKey = process.env.ACCESSKEY;
            const secretKey = process.env.SECRETKEY;
            const region = 'eu-west-1';
            const serviceName = 'execute-api';
            const algorithm = 'AWS4-HMAC-SHA256';

            const amzDate = format(new Date(), "yyyyMMdd'T'HHmmss'Z'");
            const dateStamp = amzDate.substr(0, 8);

            const canonicalUri = '/partner-vas-api/subscription';
            const canonicalQuerystring = '';
            const canonicalHeaders = `content-length:${JSON.stringify(data).length}\ncontent-type:application/json\nhost:sdp-s-apigw-partners.telkom.co.za\nx-amz-content-sha256:beaead3198f7da1e70d03ab969765e0821b24fc913697e929e726aeaebf0eba3\nx-amz-date:${amzDate}\nx-api-key:TWTRHWoOB1liUG1k\n`;
            const signedHeaders = 'content-length;content-type;host;x-amz-content-sha256;x-amz-date;x-api-key';

            const payloadHash = crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');

            const canonicalRequest = `POST\n${canonicalUri}\n${canonicalQuerystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

            const credentialScope = `${dateStamp}/${region}/${serviceName}/aws4_request`;
            const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`;

            const signingKey = getSigningKey(secretKey, dateStamp, region, serviceName);
            const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

            const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

            const headers = {
                'x-api-key': process.env.APIKEY,
                'Content-Type': 'application/json',
                'X-Amz-Content-Sha256': 'beaead3198f7da1e70d03ab969765e0821b24fc913697e929e726aeaebf0eba3',
                'X-Amz-Date': amzDate,
                'Authorization': authorizationHeader
            };

            try {
                const response = await axios.post(url, data, { headers });
                console.log(response, "=====");
                // res.send(response.data);
                return res.json({"result":response.data,"statusId":"0"})
                

            } catch (error) {
                console.log(error, ".....");
                res.status(500).json({ errorresult: error.message });
            }

            function getSigningKey(key, dateStamp, regionName, serviceName) {
                const kDate = crypto.createHmac('sha256', `AWS4${key}`).update(dateStamp).digest();
                const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest();
                const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest();
                const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest();
                return kSigning;
            }
     }
     })
    } catch (error) {
        console.error("Error in getSubscription:", error);
        res.status(500).json({ errorresult: error.message });
    }
};

module.exports = getSubscription;

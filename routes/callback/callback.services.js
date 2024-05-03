const pool=require('../../db')

module.exports={
    insertCallbackData:(data,callback)=>{
        const{
            amount,
            billing_ref,
            result_id,
            result_name,
            billing_type,
            subscription_id,
            user_id,
            user_msisdn,
            svc_id,
            svc_name,
            ext_ref,
            channel_name,
            status_id,
            status_name,
            renewal_type,
            billing_rate,
            billing_cycle,
            created_at,
            subscription_started_at,
            updated_at,
            expires_at,
            last_billed_at,
            next_billing_at,
        }=data
        console.log(data,"data")
    
        const insertCallback=process.env.INSERTCALLBACKLOGS
        .replace('<amount>',amount)
        .replace('<billing_ref>',billing_ref)
        .replace('<result_id>',result_id)
        .replace('<result_name>',result_name)
        .replace('<billing_type>',billing_type)
        .replace('<subscription_id>',subscription_id)
        .replace('<user_id>',user_id)
        .replace('<user_msisdn>',user_msisdn)
        .replace('<svc_id>',svc_id)
        .replace('<svc_name>',svc_name)
        .replace('<ext_ref>',ext_ref)
        .replace('<channel_name>',channel_name)
        .replace('<status_id>',status_id)
        .replace('<status_name>',status_name)
        .replace('<renewal_type>',renewal_type)
        .replace('<billing_rate>',billing_rate)
        .replace('<billing_cycle>',billing_cycle)
        .replace('<created_at>',created_at)
        .replace('<subscription_started_at>',subscription_started_at)
        .replace('<updated_at>',updated_at)
        .replace('<expires_at>',expires_at)
        .replace('<last_billed_at>',last_billed_at)
        .replace('<next_billing_at>',next_billing_at)
        console.log(insertCallback)
        pool.query(insertCallback,[],(err,result)=>{
            if(err){
                console.log(err)
                return callback(err,null)
            }
            console.log(result)
            return callback (null,result);
        })
       },

       insertBillingcallbackData:(data,callback)=>{
        const{
            amount,
            billing_ref,
            result_id,
            result_name,
            billing_type,
            subscription:{
            subscription_id,
            user_id,
            user_msisdn,
            svc_id,
            svc_name,
            ext_ref,
            channel_name,
            status_id,
            status_name,
            renewal_type,
            billing_rate,
            billing_cycle,
            created_at,
            subscription_started_at,
            updated_at,
            expires_at,
            last_billed_at,
            next_billing_at,
            }
        }=data
        console.log(data,"==")
    
        const insertBilling=process.env.INSERTCALLBACKLOGS
        .replace('<amount>',amount)
        .replace('<billing_ref>',billing_ref)
        .replace('<result_id>',result_id)
        .replace('<result_name>',result_name)
        .replace('<billing_type>',billing_type)
        .replace('<subscription_id>',subscription_id)
        .replace('<user_id>',user_id)
        .replace('<user_msisdn>',user_msisdn)
        .replace('<svc_id>',svc_id)
        .replace('<svc_name>',svc_name)
        .replace('<ext_ref>',ext_ref)
        .replace('<channel_name>',channel_name)
        .replace('<status_id>',status_id)
        .replace('<status_name>',status_name)
        .replace('<renewal_type>',renewal_type)
        .replace('<billing_rate>',billing_rate)
        .replace('<billing_cycle>',billing_cycle)
        .replace('<created_at>',created_at)
        .replace('<subscription_started_at>',subscription_started_at)
        .replace('<updated_at>',updated_at)
        .replace('<expires_at>',expires_at)
        .replace('<last_billed_at>',last_billed_at)
        .replace('<next_billing_at>',next_billing_at)
        console.log(insertBilling)
        pool.query(insertBilling,[],(err,result)=>{
            if(err){
                console.log(err)
                return callback(err,null)
            }
            console.log(result)
            return callback (null,result);
        })
       },

   insertSubscriberData:(data,callback)=>{
    const{
        subscription_id,
        user_id,
        user_msisdn,
        svc_id,
        svc_name,
        ext_ref,
        channel_name,
        status_id,
        status_name,
        renewal_type,
        billing_rate,
        billing_cycle,
        created_at,
        subscription_started_at,
        updated_at,
        expires_at,
        last_billed_at,
        next_billing_at,
    }=data
    console.log(data,"subscriptiondata")

    const insertSubscriber=process.env.INSERTSUBSCRIBERLOGS
    .replace('<subscription_id>',subscription_id)
    .replace('<user_id>',user_id)
    .replace('<user_msisdn>',user_msisdn)
    .replace('<svc_id>',svc_id)
    .replace('<svc_name>',svc_name)
    .replace('<ext_ref>',ext_ref)
    .replace('<channel_name>',channel_name)
    .replace('<status_id>',status_id)
    .replace('<status_name>',status_name)
    .replace('<renewal_type>',renewal_type)
    .replace('<billing_rate>',billing_rate)
    .replace('<billing_cycle>',billing_cycle)
    .replace('<created_at>',created_at)
    .replace('<subscription_started_at>',subscription_started_at)
    .replace('<updated_at>',updated_at)
    .replace('<expires_at>',expires_at)
    .replace('<last_billed_at>',last_billed_at)
    .replace('<next_billing_at>',next_billing_at)
    console.log(insertSubscriber)
    pool.query(insertSubscriber,[],(err,result)=>{
        if(err){
            console.log(err)
            return callback(err,null)
        }
        console.log(result)
        return callback (null,result);
    })
   },

   updateSubscriberData: (data, callback) => {
    const {user_msisdn } = data;

    // SQL query to check if the user exists in the subscription table
    const selectQuery = `SELECT * FROM tbl_subscription WHERE msisdn = '${user_msisdn}'`;

    // Execute the select query
    pool.query(selectQuery, [], (err, result) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }

        // If user exists, update renewal_type and next_billing_at
        if (result.length > 0) {
            const updateQuery = `UPDATE tbl_subscription SET type_event = 'REN' WHERE msisdn = '${user_msisdn}' AND next_billing_at >=NOW()`;

            console.log("Update query:", updateQuery);

            // Execute the update query
            pool.query(updateQuery, [], (updateErr, updateResult) => {
                if (updateErr) {
                    console.log(updateErr);
                    return callback(updateErr, null);
                }
                console.log("Updated renewal_type and next_billing_at for existing user:", updateResult);
                return callback(null, updateResult);
            });
        } else {
            // User does not exist in the table
            return callback(null, "User does not exist in tbl_subscription");
        }
    });
},

insertUnSubscriberData:(data,callback)=>{
    const{
        subscription_id,
        user_id,
        user_msisdn,
        svc_id,
        svc_name,
        ext_ref,
        channel_name,
        status_id,
        status_name,
        renewal_type,
        billing_rate,
        billing_cycle,
        created_at,
        subscription_started_at,
        updated_at,
        expires_at,
        last_billed_at,
        next_billing_at,
    }=data
    console.log(data,"unsubscriptiondata")

    const insertUnSubscriber=process.env.INSERTUNSUBSCRIBERLOGS
    .replace('<subscription_id>',subscription_id)
    .replace('<user_id>',user_id)
    .replace('<user_msisdn>',user_msisdn)
    .replace('<svc_id>',svc_id)
    .replace('<svc_name>',svc_name)
    .replace('<ext_ref>',ext_ref)
    .replace('<channel_name>',channel_name)
    .replace('<status_id>',status_id)
    .replace('<status_name>',status_name)
    .replace('<renewal_type>',renewal_type)
    .replace('<billing_rate>',billing_rate)
    .replace('<billing_cycle>',billing_cycle)
    .replace('<created_at>',created_at)
    .replace('<subscription_started_at>',subscription_started_at)
    .replace('<updated_at>',updated_at)
    .replace('<expires_at>',expires_at)
    .replace('<last_billed_at>',last_billed_at)
    .replace('<next_billing_at>',next_billing_at)
    console.log(insertUnSubscriber)
    pool.query(insertUnSubscriber,[],(err,result)=>{
        if(err){
            console.log(err)
            return callback(err,null)
        }
        console.log(result)
        return callback (null,result);
    })
   },
   deleteSubscriberData:(data,callback)=>{
    const {subscription_id}=data
    console.log(data,"data delete")

    const deletesubscriber=process.env.DELETELOGS
    .replace('<subscription_id>',subscription_id)
    console.log(deletesubscriber,"delete query")
    pool.query(deletesubscriber,[],(err,result)=>{
        if(err){
            console.log(err)
            return callback(err,null)
        }
        console.log(result)
        return callback (null,result);
    })
   },
// Function to check if a user exists in the subscription table
checkUserExists: (data, callback) => {
    const { user_msisdn, status_id } = data;
    const checkIfUserExistQuery = `SELECT * FROM tbl_subscription WHERE msisdn='${user_msisdn}' AND status_id='${status_id}'`;
    pool.query(checkIfUserExistQuery, [], (err, result) => {
        if (err) {
            console.log(err,'--------------------------------');
            return callback(err, null);
        }
       
        return callback(null, result);
    });
},

   insertBillingData:(data,callback)=>{
    const{
        amount,
        billing_ref,
        result_id,
        result_name,
        billing_type,
        subscription:{
        subscription_id,
        user_id,
        user_msisdn,
        svc_id,
        svc_name,
        ext_ref,
        channel_name,
        status_id,
        status_name,
        renewal_type,
        billing_rate,
        billing_cycle,
        created_at,
        subscription_started_at,
        updated_at,
        expires_at,
        last_billed_at,
        next_billing_at,
        }
    }=data
    console.log(data,"==")

    const insertBilling=process.env.INSERTBILLINGLOGS
    .replace('<amount>',amount)
    .replace('<billing_ref>',billing_ref)
    .replace('<result_id>',result_id)
    .replace('<result_name>',result_name)
    .replace('<billing_type>',billing_type)
    .replace('<subscription_id>',subscription_id)
    .replace('<user_id>',user_id)
    .replace('<user_msisdn>',user_msisdn)
    .replace('<svc_id>',svc_id)
    .replace('<svc_name>',svc_name)
    .replace('<ext_ref>',ext_ref)
    .replace('<channel_name>',channel_name)
    .replace('<status_id>',status_id)
    .replace('<status_name>',status_name)
    .replace('<renewal_type>',renewal_type)
    .replace('<billing_rate>',billing_rate)
    .replace('<billing_cycle>',billing_cycle)
    .replace('<created_at>',created_at)
    .replace('<subscription_started_at>',subscription_started_at)
    .replace('<updated_at>',updated_at)
    .replace('<expires_at>',expires_at)
    .replace('<last_billed_at>',last_billed_at)
    .replace('<next_billing_at>',next_billing_at)
    console.log(insertBilling)
    pool.query(insertBilling,[],(err,result)=>{
        if(err){
            console.log(err)
            return callback(err,null)
        }
        console.log(result)
        return callback (null,result);
    })
   }
 

}
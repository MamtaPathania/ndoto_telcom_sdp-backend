
const { insertCallbackData, checkUserExists, insertSubscriberData,insertUnSubscriberData, updateSubscriberData, insertBillingData, deleteSubscriberData, insertBillingcallbackData } = require("./callback.services");

// const getSubscriber = (req, res) => {
//     const data = req.body;

//     // Insert callback data into the database
//     insertCallbackData(data, (err, result) => {
//         if (err) {
//             console.log(err, "Error inserting callback data");
//             return res.status(400).json({ error: err });
//         }

//         console.log("Callback data inserted successfully");
// if(data.status_name=='ACTIVE'){
//     console.log("active data",data.status_name)
//     checkresults(data, (err, result) => {
//         if (err) {
//             console.log(err, "Error checking user existence");
//             return res.status(500).json({ message: "Error checking subscription", error: err.message });
//         }

//         // If user exists, update their data
//         if (result.length > 0) {
//             updateSubscriberData(data, (updateErr, updateResult) => {
//                 if (updateErr) {
//                     console.log(updateErr, "Error updating data in subscription");
//                     return res.status(400).json({ error: updateErr });
//                 }
//                 console.log("Updated data in subscription table:", updateResult);
//                 return res.send('Success');
//             });
//         } else {
//             // If user does not exist, insert new entry
//             insertSubscriberData(data, (insertErr, insertResult) => {
//                 if (insertErr) {
//                     console.log(insertErr, "Error inserting data in subscription");
//                     return res.status(400).json({ error: insertErr });
//                 }
//                 console.log("Inserted data in subscription table:", insertResult);
//                 return res.send('Success');
//             });
//         }
//     });
// }
// else if (data.status_name="CANCELLED"){
//     console.log("active data",data.status_name)

// }
        
       
//     });
// };

// Define the getbilling function to handle billing callbacks

const getSubscriber = (req, res) => {
    const details = req.body;
    console.log(details,"++++++++++++++etails")
    const data={
        subscription_id:details.subscription_id,
        user_id:details.user_id,
        user_msisdn:details.user_msisdn,
        svc_id:details.svc_id,
        svc_name:details.svc_name,
       ext_ref:details.ext_ref,
        channel_name:details.channel_name,
        status_id:details.status_id,
        status_name:details.status_name,
        renewal_type:details.renewal_type,
        billing_rate:details.billing_rate,
        billing_cycle:details.billing_cycle,
        created_at:details.created_at,
        subscription_started_at:details.subscription_started_at,
        updated_at:details.updated_at,
        expires_at:details.expires_at,
        last_billed_at:details.last_billed_at,
        next_billing_at:details.next_billing_at,
        amount: details.amount || 0,
        billing_ref:details.billing_ref || 0,
        result_id:details.result_id || 0,
        result_name:details.result_name || 0,
        billing_type:details.billing_type || 0,
    }
    // Insert callback data into the database
    insertCallbackData(data, (err, result) => {
        if (err) {
            console.log(err, "Error inserting callback data");
            return res.status(400).json({ error: err });
        }

        console.log("Callback data inserted successfully");

        if (data.status_name === 'ACTIVE') {
            console.log("active data", data.status_name)
            checkUserExists(data, (err, result) => {
                if (err) {
                    console.log(err, "Error checking user existence");
                    return res.status(500).json({ message: "Error checking subscription", error: err.message });
                }
                
                console.log("=====data===",result.length)
                // If user exists, update their data
                if (result.length > 0) {
                //    return res.send('success updated')
                    updateSubscriberData(data, (updateErr, updateResult) => {
                        if (updateErr) {
                            console.log(updateErr, "Error updating data in subscription");
                            return res.status(400).json({ error: updateErr });
                        }
                        console.log("Updated data in subscription table:", updateResult);
                        return res.send(updateResult);
                    });
                } else {
                    // If user does not exist, insert new entry
                    insertSubscriberData(data, (insertErr, insertResult) => {
                        if (insertErr) {
                            console.log(insertErr, "Error inserting data in subscription");
                            return res.status(400).json({ error: insertErr });
                        }
                        console.log("Inserted data in subscription table:", insertResult);
                        return res.send('inserted data in subscription table');
                    });
                }
                // return res.send(result)
            });
        } else if (data.status_name === 'CANCELLED') {
            console.log("cancelled data", data.status_name);
            // Insert into unsubscription table
            insertUnSubscriberData(data, (insertErr, insertResult) => {
                if (insertErr) {
                    console.log(insertErr, "Error inserting data in unsubscription");
                    return res.status(400).json({ error: insertErr });
                }
                console.log("Inserted data in unsubscription table:", insertResult);
                
                // Delete from subscription table
                deleteSubscriberData(data, (deleteErr, deleteResult) => {
                    if (deleteErr) {
                        console.log(deleteErr, "Error deleting data from subscription");
                        return res.status(400).json({ error: deleteErr });
                    }
                    console.log("Deleted data from subscription table:", deleteResult);
                    return res.send('Deteted data from subscription table');
                });
            });
        }
    });
};

// module.exports = { getSubscriber };

const getbilling = (req, res) => {
    const data = req.body;
    insertBillingcallbackData(data, (err, result) => {
        if (err) {
            console.log(err, "Error inserting callback data");
            return res.status(400).json({ error: err });
        }

        console.log("Callback data inserted successfully");
       return res.send('billing callback data inserted successfully')
    })
// console.log(data)
    // Insert billing data into the database
    insertBillingData(data, (err, result) => {
        if (err) {
            console.log(err, "Error inserting billing data");
            return res.status(400).json({ error: err });
        }
        console.log("Billing data inserted successfully");
        return res.send('Success');
    });
};

// Export the functions
module.exports = { getSubscriber, getbilling };

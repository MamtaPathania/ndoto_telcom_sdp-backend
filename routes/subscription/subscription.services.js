const pool=require('../../db')

module.exports={
  
    checkUserExists: (data, callback) => {
        let { msisdn,svc_name} = data;
        if (svc_name === 'beauty') {
            svc_name = 'Beauty TV';
        }

        if (svc_name === 'bossmoves') {
            svc_name = 'Boss Moves'
        }
        if (svc_name == 'woh') {
            svc_name = 'Woman Of Honour';
          }

          if (svc_name == 'luxury') {
            svc_name = 'Luxury living';
          }
          if (svc_name == 'faith') {
            svc_name = 'FaithFirstTV';
          }

          if (svc_name == 'comedy') {
            svc_name = 'LOL TV';
          }
          if (svc_name == 'fashion') {
            svc_name = 'Fashion on lock';
          }
          if (svc_name == 'sports') {
            svc_name = 'Sports & beyond';
          }

          if (svc_name == 'topics') {
            svc_name = 'Hot Topics'
          }
    console.log(data,"=====user")
      const checkuser=process.env.CHECKUSER
      .replace('<msisdn>',msisdn)
      .replace('<svc_name>',svc_name)
      console.log("=====",checkuser)
        pool.query(checkuser, [], (err, result) => {
            if (err) {
                console.log(err,'--------------------------------');
                return callback(err, null);
            }
            
            return callback(null, result);
        });
    },
    
    
    

    

}
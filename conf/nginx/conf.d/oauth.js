function introspectAccessToken(r) {
    const header = r.headersIn["Authorization"];
    if (header){
        const token_data = header.split(" ")[1]; // get the token str
        const url = "/_token_verification";
        const property = {
            method: "POST",
            body: JSON.stringify({token: token_data})
        };

        r.log(`LOG: send subrequest: url:${url}, property:${JSON.stringify(property)}`);

        r.subrequest(url, property, function(reply){
            r.log(`LOG: reply status: ${reply.status}`);
            r.log(`LOG: reply status: ${JSON.stringify(reply.responseBody)}`);
            if (reply.status === 200){
                return r.return(204); // Token is valid, return success code
            }
            else{
                 r.return(403); // Token is invalid
            }
        })
    }
    else {
        r.return(401); // does not have the header
    }
    // r.
    // r.return(401);
    // r.subrequest("/_oauth2_send_request",
    //     function(reply) {
    //         if (reply.status == 200) {
    //             var response = JSON.parse(reply.responseBody);
    //             if (response.active == true) {
    //                 r.return(204); // Token is valid, return success code
    //             } else {
    //                 r.return(403); // Token is invalid, return forbidden code
    //             }
    //         } else {
    //             r.return(401); // Unexpected response, return 'auth required'
    //         }
    //     }
    // );
}

export default { introspectAccessToken }
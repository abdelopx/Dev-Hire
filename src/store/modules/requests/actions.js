export default {
    async contactCoach(context,payload) {
        const request = {
            email: payload.email,
            message: payload.message,
        };

        const response = await fetch(process.env.VUE_APP_URL_DB+`/requests/${payload.coachId}.json`,{
            method: 'POST',
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const error = new Error(response.message || 'Failed to post data.');
            throw error;
        }

        const responseData = await response.json();
        request.id = responseData.name;

        context.commit('sendRequest',request);
    },

    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;

        const response = await fetch(process.env.VUE_APP_URL_DB+`/requests/${coachId}.json?auth=` + token);
        
        if(!response.ok) {
            response.message = "Could not fetch requests, try in few moments.";
            const error = new Error(response.message);
            throw error;
        }

        const responseData = await response.json();

        const requests = [];
        for (const key in responseData) {
            const request = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].email,
                message: responseData[key].message,
            };
            requests.push(request);
        }

        console.log(requests);
        context.commit('setRequests',requests);
    }
};
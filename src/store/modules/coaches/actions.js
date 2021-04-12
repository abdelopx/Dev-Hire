export default {
    registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas,
        };

        const token = context.rootGetters.token;

        fetch(process.env.VUE_APP_URL_DB+`/coaches/${userId}.json?auth=` + token,{
            method: 'PUT',
            body: JSON.stringify(coachData),
        }).then(response => {
            if (response.ok) {
                console.log(response);
            }
            else {
                throw new Error(response.statusText);
            }
        }).catch(err => {
            console.log(err);
        });

        context.commit('registerCoach',{
            ...coachData,
            id: userId,
        });
    },

async loadCoaches(context) {
        // fetch(process.env.VUE_APP_URL_DB+'/coaches.json')
        // .then(response => {
        //     if (!response.ok) {
        //         return new Error("An error happened please try again");
        //     }
        //     return response.json();
        // }).then(responseData => {
        //     const coaches = [];
        //     for (const key in responseData) {
        //         const coach = {
        //             id: key,
        //             firstName: responseData[key].firstName,
        //             lastName: responseData[key].lastName,
        //             description: responseData[key].description,
        //             hourlyRate: responseData[key].hourlyRate,
        //             areas: responseData[key].areas,
        //         };
        //         coaches.push(coach);
        //     }
        //     context.commit('setCoaches',coaches);
        // });
        const response = await fetch(process.env.VUE_APP_URL_DB+`/coaches.json`);

        if (!response.ok) {
            response.message = "Could not fetch the data, Please try again later...";
            const error = new Error(response.message);
            throw error;
        }

        const responseData = await response.json();

        const coaches = [];
            for (const key in responseData) {
                const coach = {
                    id: key,
                    firstName: responseData[key].firstName,
                    lastName: responseData[key].lastName,
                    description: responseData[key].description,
                    hourlyRate: responseData[key].hourlyRate,
                    areas: responseData[key].areas,
                };
                coaches.push(coach);
            }
            context.commit('setCoaches',coaches);
    },

};
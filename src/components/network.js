import conf from '../conf.json';

export const getFlatsList = () => {
    let url = conf.api_url+'property?full=true&status[]=AVAILABLE&status[]=BOOKED&projectId='+conf.project_id;

    return fetch(conf.api_url+'authentication', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: 'api-app',
            credentials: {
                pb_api_key: conf.api_key
            },
        }),
    })
    .then(response => response.json())
    .then(responseJson => responseJson.access_token)
    .then(token => fetch(url+'&access_token='+token))
    .then(results => results.json())
    .then(data => data.data);
}

export const getFlatImgs = () => {
    return fetch(conf.api_url+'authentication', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: 'api-app',
            credentials: {
                pb_api_key: conf.api_key
            },
        }),
    })
    .then(response => response.json())
    .then(responseJson => responseJson.access_token)
    .then(token => fetch(conf.api_url+'plan?access_token='+token+'&projectId='+conf.project_id+'&status[]=AVAILABLE&status[]=BOOKED'))
    .then(results => results.json())
    .then(data => {
        let plan_imgs = [];
        data.data.forEach((plan) => {
            plan.properties.forEach((item) => {
                plan_imgs[item] = plan.image.source;
            });
        });
        return plan_imgs;
    })
}

export const getFloorPlans = (houseId) => {
    return fetch(conf.api_url+'authentication', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: 'api-app',
            credentials: {
                pb_api_key: conf.api_key
            },
        }),
    })
    .then(response => response.json())
    .then(responseJson => responseJson.access_token)
    .then(token => fetch(conf.api_url+'floor?access_token='+token+'&houseId='+houseId))
    .then(results => results.json())
    .then(data => {
        let floor_plans = [];
        data.forEach((plan) => {
                floor_plans[plan.number] = plan.images.source;
        });
        return floor_plans;
    })
}

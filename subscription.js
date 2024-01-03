const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/subscription.newsSub');

class Subscribe {
    constructor() {
        this.subscribedNews = false;
        this.subscribedStation = false;}
        

        

    subscribeNews() {
        return this.updateSubscription('news', true);
    }

    unsubscribeNews() {
        return this.updateSubscription('news', false);
    }

    subscribeStation() {
        return this.updateSubscription('station', true);
    }

    unsubscribeStation() {
        return this.updateSubscription('station', false);
    }

    updateSubscription(type, value) {
        return new Promise((resolve, reject) => {
            const userId = 'user_id'; // Replace with the actual user identifier
            this.Subscription.findOneAndUpdate(
                { _id: userId },
                { [`${type}Subscription`]: value },
                { upsert: true, new: true },
                (err, doc) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        console.log(`${type} subscription updated successfully.`);
                        resolve(true);
                    }
                }
            );
        });
    }
}

// Example Usage
const subscribeInstance = new Subscribe();

subscribeInstance.subscribeNews()
    .then(() => subscribeInstance.unsubscribeNews())
    .then(() => subscribeInstance.subscribeStation())
    .then(() => subscribeInstance.unsubscribeStation())
    .catch((error) => console.error(error))
    .finally(() => mongoose.disconnect());

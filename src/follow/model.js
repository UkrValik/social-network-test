'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

class Follow {

    constructor() {

        const followSchema = new Schema({
            from: { type: String, required: true },
            to: { type: String, required: true },
        });

        followSchema.statics.insertConnection = this.insertFollow;
        followSchema.statics.findFriends = this.findFriends;
        followSchema.statics.findPopularUsers = this.findPopularUsers;

        this.Follow = mongoose.model('Follow', followSchema);
    }

    insertFollow(follow) {
        return this.Follow.create(follow);
    }

    findFriends() {
        // const all = await this.Follow.find();
        // let friends = [];
        // for (let item of all) {
        //     const exist = await this.Follow.find({ from: item.to, to: item.from });
        //     if (exist.length > 0) {
        //         friends.push(exist);
        //     }
        // }
        // return {size: friends.length, friends};
        return this.Follow.aggregate([
            {
                $graphLookup: {
                    from: "follows",
                    startWith: "$from",
                    connectFromField: "from",
                    connectToField: "to",
                    maxDepth: 0,
                    as: "possibleFriends",
                }
            },
            {
                $project: {
                    _id: 0,
                    from: 1,
                    to: 1,
                    possibleFriends: {
                        $let: {
                            vars: {
                                to: "$to",
                                possFriends: "$possibleFriends"
                            },
                            in: {
                                $filter: {
                                    input: "$possibleFriends",
                                    as: "possibleFriends",
                                    cond: {
                                        $in: ["$$to", "$$possFriends.from"]
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $match: {
                    possibleFriends: {
                        $exists: true,
                        $ne: [],
                    }
                }
            },
            {
                $project: {
                    friend: "$from",
                }
            }
        ]);
    }

    findPopularUsers(count) {
        return this.Follow.aggregate([
            {
                $group: {
                    _id: "$to",
                    followersCount: { $sum: 1 },
                    followers: { $push: "$from" },
                },
            },
            {
                $sort: {
                    followersCount: -1,
                }
            },
            {
                $limit: count,
            }
        ])
    }
}

module.exports = new Follow();

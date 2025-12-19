const express = require('express');
const { userAuth } = require('../middleware/auth');
const { ConnectionRequest } = require('../models/connectionRequest');
const User = require('../models/user');

const requestRouter = express.Router();

requestRouter.post('/request/send/:status/:toUserId', userAuth, async (req, res) =>{
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];

        if(!allowedStatus.includes(status)) {
            return res
                .status(400)
                .json({message: "Invalid Status Type: " + status});
        }

        const toUser = await User.findById(toUserId);
        if(!toUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({//checking both sides , if the connection request already defined
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId , toUserId: fromUserId }
            ],
        });

        if(existingConnectionRequest) {
            return res.status(400).json({message: "Connection already exists"});
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data: data
        });
    }
    catch (err) {
        res.status(400).send("ERROR: "+ err.message);
    }
});

requestRouter.post('/request/review/:status/:requestId', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        //Validate the status
        //requestId should be valid

        const allowedStatus = ["accepted", "rejected"];
        const {status, requestId } = req.params;
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({message: "status is not allowed"});
        }

        const connectionRequest = await ConnectionRequest.findOne({_id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        });

        if(!connectionRequest) {
            return res.status(404).json({message: "Connection request is not found"});
        }

        connectionRequest.status = status;

        const updatedRequest = await connectionRequest.save();

        res.json({
        message: "Connection request: " + status,
        data: updatedRequest
        });

    }
    catch (err) {
        res.status(400).send("ERROR: "+ err.message);
    }
});

module.exports = requestRouter;

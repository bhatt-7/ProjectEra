// controllers/friendRequestController.js
const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');

exports.sendFriendRequest = async (req, res) => {
    try {
        const { fromUserId, toUserId } = req.body;

        const fromUser = await User.findById(fromUserId);
        const toUser = await User.findById(toUserId);

        if (!fromUser || !toUser) {
            return res.status(404).json({ error: 'One or both users not found' });
        }

        const existingRequest = await FriendRequest.findOne({
            fromUser: fromUserId,
            toUser: toUserId,
            status: { $ne: 'rejected' }
        });

        if (existingRequest) {
            return res.status(400).json({ error: 'Friend request already sent or accepted' });
        }

        const friendRequest = new FriendRequest({
            fromUser: fromUserId,
            toUser: toUserId
        });

        await friendRequest.save();

        res.status(201).json({ message: 'Friend request sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.acceptFriendRequest = async (req, res) => {
    try {
        const {requestId}  = req.body
        console.log(requestId)
    
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ error: 'Friend request not found' });
        }

        
        if (friendRequest.status !== 'pending') {
            return res.status(400).json({ error: 'Friend request has already been accepted or rejected' });
        }

        
        friendRequest.status = 'accepted';
        await friendRequest.save();


        const userWhoAccepted = await User.findById(friendRequest.toUser);
        const userWhoSentRequest = await User.findById(friendRequest.fromUser);

        if (!userWhoAccepted || !userWhoSentRequest) {
            return res.status(404).json({ error: 'Users not found' });
        }

        userWhoAccepted.followers.push(userWhoSentRequest._id);
        await userWhoAccepted.save();

        res.status(200).json({ message: 'Friend request accepted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.rejectFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;

        const request = await FriendRequest.findById(requestId);

        if (!request) {
            return res.status(404).json({ error: 'Friend request not found' });
        }

        if (request.status !== 'pending') {
            return res.status(400).json({ error: 'Friend request has already been accepted or rejected' });
        }

        request.status = 'rejected';
        await request.save();

        res.status(200).json({ message: 'Friend request rejected successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.removeFriend = async (req, res) => {
    try {
        const { requestId } = req.params;

        // Find the friend request by ID
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ error: 'Friend request not found' });
        }

        // Check if the friend request has been accepted
        if (friendRequest.status !== 'accepted') {
            return res.status(400).json({ error: 'Friend request has not been accepted' });
        }

        // Remove the friend from the user's followers array
        const userWhoAccepted = await User.findById(friendRequest.toUser);

        if (!userWhoAccepted) {
            return res.status(200).json({ error: 'User not found' });
        }

        const index = userWhoAccepted.followers.indexOf(friendRequest.fromUser);
        if (index !== -1) {
            userWhoAccepted.followers.splice(index, 1);
        }

        await userWhoAccepted.save();

        // Update the friend request status to 'removed'
        friendRequest.status = 'removed';
        await friendRequest.save();

        res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllFreindRequest=async (req,res)=>{
    try {
        const user=req.user.id

        const request=await FriendRequest.find({fromUser:user})
                            .populate("toUser")

        res.status(200).json({ 
            success:true,
            request,
            message: 'Request fetch successfully' });
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

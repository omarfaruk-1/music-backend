import historyModel from "../models/history.model.js";


async function getAllHistory(req,res){
    try {
        const histories = await historyModel.find({user:req.user._id}).populate("music").sort({ updatedAt:-1});
        if(histories.length===0) return res.status(200).json({message:"History not found",histories:[]});
        
        res.status(200).json({
            message:"History fetched successfully",
            histories
        })

    } catch (error) {
        return res.status(500).json({message:"Internal server error: "+error.message})
    }
}

async function deleteHistory(req,res){
    try {
        const {historyId}=req.params;
        const history= await historyModel.findOne({user:req.user._id,_id:historyId});
        if(!history) return res.status(404).json({message:"History not found"});
        await history.deleteOne();
        res.status(200).json({message:"History delete successfully"})

    } catch (error) {
        return res.status(500).json({message:"Internal server error: "+error.message})
    }
}

async function clearHistory(req,res){
    try {
        await historyModel.deleteMany({user:req.user._id})
        res.status(200).json({message:"History clear successfully"})
    } catch (error) {
        return res.status(500).json({message:"Internal server error: "+error.message})
    }
}

export default {getAllHistory,deleteHistory,clearHistory}
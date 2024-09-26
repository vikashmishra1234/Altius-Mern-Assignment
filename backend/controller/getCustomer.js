const User = require("../models/User");

exports.getAgents = async(req,res)=>{
    try {
        const users = await User.find({})
        if(users.length==0){
            return res.status(404).json({
                success:false,
                error:"no user found"
            })
        }
        const filteredUser = users.filter((user)=>user.role=='agent')
        return res.status(200).json({
            coustomer:filteredUser,
            success:true
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success:false,
            error:'internal server error'
        })
    }
}   
exports.getCustomer = async(req,res)=>{
    try {
        const users = await User.find({})
        if(users.length==0){
            return res.status(404).json({
                success:false,
                error:"no user found"
            })
        }
        const filteredUser = users.filter((user)=>user.role=='customer')
        return res.status(200).json({
            coustomer:filteredUser,
            success:true
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success:false,
            error:'internal server error'
        })
    }
}   
exports.deleteUser = async(req,res)=>{
    try {
        const id = req.query.id;
        if(!id){
            return res.status(404).json({
                error:"id not found"
            })
        }
        await User.findByIdAndDelete(id)
     
        return res.status(200).json({
            message:'deleted successfully',
            success:true
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success:false,
            error:'internal server error'
        })
    }
}   
async function authorize  (req,res,next) {
  try {
    if(req.user.role!=="artist") return res.status(403).json({message:"You can not access"});
    next();
  } catch (error) {
    return res.status(500).json({message:"Internal server error: "+error.message});
  }
};

export default authorize;

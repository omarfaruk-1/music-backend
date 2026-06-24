const authorize = (req,res,next) => {
  if(req.user.role!=="artist") return res.status(403).json({message:"Forbidden"});
  return next();
};

export default authorize;

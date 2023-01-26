import { Request, Response, NextFunction } from "express";
import { IncomingHttpHeaders } from "http";
import AdminsModel from "../model/admins.model";
import Verifyer from "./../utils/jwt";

// export const verifyToken = (req: Request, res: Response, next: NextFunction) =>{
//   try{
//     const token = req.headers.access_token[0]

//     if(!token){
//       return res.json({
//         status: 403,
//         message: 'Token is not available'
//       })
//     }

//     const decodedData = Verifyer.Verifyer(token, res)

//     req.body.user = decodedData
//     next()

//   }catch(err){
//     return res.json({
//       status: 403,
//       message: 'Token is not available'
//     })
//   }
// }

interface CustomRequest extends Request {
  headers: IncomingHttpHeaders & {
    access_token?: string;
  };
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const access_token = req.headers.access_token;

  if (!access_token) {
    return res.json({
      message: "Token is not available",
    });
  }

  const admin = Verifyer.Verifyer(access_token, res);
  
  req.body.admin = admin
  next();
};

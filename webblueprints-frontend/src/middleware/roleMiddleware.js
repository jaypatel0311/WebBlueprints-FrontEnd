import { PERMISSIONS } from "../constants/roles";

export const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!PERMISSIONS[userRole]?.includes(requiredPermission)) {
      return res.status(403).json({ message: "Permission denied" });
    }
    next();
  };
};

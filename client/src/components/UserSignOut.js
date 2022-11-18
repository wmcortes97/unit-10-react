import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const UserSignOut = ({ context }) => {
  useEffect(() => {
    context.actions.signOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Navigate to="/" />;
};

export default UserSignOut;

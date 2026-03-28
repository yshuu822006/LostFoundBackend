import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Dummy = () => {
  const navigate = useNavigate();
  const { no } = useParams();   // destructure directly

  useEffect(() => {
    if (no === "1") {
      navigate("/lost-entry");
    } else if (no === "2") {
      navigate("/found-entry");
    }
  }, [no, navigate]);   // ✅ include dependencies

  return null;  // important: component must return something
};

export default Dummy;

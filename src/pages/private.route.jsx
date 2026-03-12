import { AuthContext } from "../components/context/auth.context";
import { useContext } from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

export const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);

    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        );
    }

    return (
        <>
            <Result
                status="403"
                title="Unauthorize!"
                subTitle={"You need to log in to access this resource."}
                extra={<Button type="primary">
                    <Link to="/"><span>Back to homepage</span></Link>
                </Button>}
            />
        </>
    );
}

import { token } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";



interface DecodedToken {
    id: string;
    role: string;
    exp: number;
}


const HasAccessComponents = ({ roles, children }: { roles: string[]; children: React.ReactElement }) => {
    if (!token) {

        return <></>
    }

    const decodedUser = jwtDecode<DecodedToken>(token);

    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
        return <></>
    }
    console.log(decodedUser.role)
    if (decodedUser.role && roles.includes(decodedUser.role)) {
        <div>
            {
                children
            }
        </div>
    } else {
        return <></>
    }
};

export default HasAccessComponents;
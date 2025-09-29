import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { token } from "@/lib/utils";

interface DecodedToken {
    id: string;
    role: string;
    exp: number;
}

export const hasAccess = ({ roles, event }: { roles: string[]; event: () => void }) => {
    console.log(roles)
    if (!token) {
        toast.warning("No token found");
        return;
    }

    const decodedUser = jwtDecode<DecodedToken>(token);
console.log(decodedUser)
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
        toast.warning("Session expired, please log in again");
        return;
    }
    console.log(decodedUser.role)
    if (decodedUser.role && roles.includes(decodedUser.role)) {
        event();
    } else {
        toast.warning("You don't have these access");
    }
};

import { toast } from "sonner";

export function setAlert(msg, alertType = "info") {
    return function () {
        if (alertType === "error") {
            toast.error(msg);
            return;
        }
        if (alertType === "success") {
            toast.success(msg);
            return;
        }
        if (alertType === "warning") {
            toast.warning(msg);
            return;
        }
        toast.info(msg);
    };
}

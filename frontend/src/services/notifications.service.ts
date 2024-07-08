import { enqueueSnackbar } from "notistack";



export class NotificationsService {


    static success(message: string) {
        enqueueSnackbar(message, {
            variant: "success",
            autoHideDuration: 4000,
            anchorOrigin: { vertical: "top", horizontal: "right" }
        });
    }

    static error(message: string) {
        enqueueSnackbar(message, {
            variant: "error",
            autoHideDuration: 4000,
            anchorOrigin: { vertical: "top", horizontal: "right" }
        });
    }
}
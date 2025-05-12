import { updateUserAction } from "@/action/actions";
import Button from "@/components/UI/Button";
import FormGroup from "@/components/UI/FormGroup";
import FormLabel from "@/components/UI/FormLabel";
import Input from "@/components/UI/Input";
import { User } from "@/types/user";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { X } from "lucide-react";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

interface UserProfileDialogProps {
    open: boolean;
    closeDialog: () => void;
    user: User;
}

export default function ProfileDialog({
    open,
    closeDialog,
    user,
}: UserProfileDialogProps) {
    const [errors, action, pending] = useActionState(updateUserAction, null);

    useEffect(() => {
        if (errors?.success) {
            toast.success(
                "Profile updated successfully! Your changes have been saved."
            );
            closeDialog();
        }
        if (errors?.success === false) {
            toast.error(
                "Profile update failed."
            );
        }
    }, [errors, closeDialog]);

    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            className="duration-200 sm:max-w-[425px] m-auto"
            slotProps={{ paper: { sx: { borderRadius: ".5rem" } } }}
            maxWidth={"xs"}
            fullWidth={true}
        >
            <DialogTitle className="flex flex-col text-center sm:text-left text-md font-semibold leading-none tracking-tight">
                <span className="text-[16px] font-medium">User Profile</span>
                <span className="text-sm text-gray-400 ">
                    view and manage your account details
                </span>
            </DialogTitle>

            <Button
                className="outline-none absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick={closeDialog}
            >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
            </Button>
            <DialogContent>
                <form className="space-y-6" action={action}>
                    <FormGroup>
                        <FormLabel htmlFor="username" className="font-medium">
                            username
                        </FormLabel>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="username"
                            className="bg-[#F9F9F9] border-[#DDDDDD] rounded-md text-[#221F26] text-sm p-2 w-full h-10"
                            defaultValue={user.username}
                        />
                        <p className="text-red-800 text-sm">
                            {errors?.error?.username}
                        </p>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel htmlFor="email" className="font-medium">
                            email
                        </FormLabel>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="email"
                            className="bg-[#F9F9F9] border-[#DDDDDD] rounded-md text-[#221F26] text-sm p-2 w-full h-10"
                            defaultValue={user.email}
                        />
                        {errors?.error?.email?.map((error: string) => (
                            <p key={error} className="text-red-800 text-sm">
                                {error}
                            </p>
                        ))}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel htmlFor="phone" className="font-medium">
                            Phone Number
                        </FormLabel>
                        <Input
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="+2349164456806"
                            className="bg-[#F9F9F9] border-[#DDDDDD] rounded-md text-[#221F26] text-sm p-2 w-full h-10"
                            defaultValue={user.phone}
                        />
                        <p className="text-red-800 text-sm">
                            {errors?.error?.phone}
                        </p>
                    </FormGroup>
                    <DialogActions sx={{ padding: 0 }}>
                        <Button
                            type="button"
                            onClick={closeDialog}
                            className="border border-gray-200 bg-gray-50 hover:bg-gray-100 py-2 px-4 "
                            disabled={pending}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-[#0f172a] hover:bg-[#171519] rounded-md text-white py-2 px-4"
                            disabled={pending}
                        >
                            Save changes
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

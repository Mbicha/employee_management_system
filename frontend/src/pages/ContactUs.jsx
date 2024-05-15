import React, {useState} from "react";
import Dialog from "../components/Dialog";

const ContactUs = () => {
    const image = "/media/gif/success.gif"
    const [isDialogOpen, setDialogOpen] = useState(true);

    const handleConfirm = () => {
        // Your logic when OK button is clicked
        setDialogOpen(false); // Close the dialog
    };
    return (
        <div>
            Contact US
            <Dialog
                isOpen={isDialogOpen}
                title="Confirmation"
                message="Are you sure you want to proceed?"
                imageSrc={image}
                onConfirm={handleConfirm}
            />
        </div>
    )
}

export default ContactUs;

import { toast } from "sonner";

export const toaster = {
	alert: (msg: string) => {
		toast("Notification:", {
			position: "bottom-right",
			description: msg,
			descriptionClassName: "text-white text-xs",
			style: {
				backgroundColor: "#052e16E6",
				color: "white",
				fontWeight: "bold",
				borderColor: "#2ecc71",
				fontSize: "0.9rem",
			},
		});
	},
	error: (msg: string) => {
		toast("An Error Occurred:", {
			descriptionClassName: "text-white text-xs",
			description: msg,
			position: "bottom-right",
			style: {
				backgroundColor: "#F87171",
				color: "white",
				fontWeight: "bold",
				borderColor: "#F87171",
				fontSize: "0.9rem",
			},
		});
	},
	success: (msg: string) => {
		toast("Success:", {
			descriptionClassName: "text-white text-xs",
			description: msg,
			position: "bottom-right",
			style: {
				backgroundColor: "#052e16E6",
				color: "white",
			},
		});
	},
};

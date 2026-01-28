import { toast } from "sonner";

export const toaster = {
	alert: (msg: string) => {
		toast("Notification:", {
			descriptionClassName: "text-white/70! text-xs",
			position: "top-center",
			description: msg,
			style: {
				backgroundColor: "#0f766e", // teal-700
				borderColor: "#14b8a6", // teal-500
				color: "#ecfeff",
				fontWeight: "bold",
				fontSize: "0.9rem",
			},
		});
	},
	error: (msg: string) => {
		toast("An Error Occurred:", {
			descriptionClassName: "text-white/70! text-xs",
			position: "top-center",
			description: msg,
			style: {
				backgroundColor: "#7f1d1d", // red-900
				borderColor: "#ef4444", // red-500
				color: "#fee2e2",
				fontWeight: "bold",
				fontSize: "0.9rem",
				boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
				borderRadius: "12px",
			},
		});
	},
	success: (msg: string) => {
		toast("Success:", {
			descriptionClassName: "text-white/70! text-xs",
			position: "top-center",
			description: msg,
			style: {
				backgroundColor: "#14532d", // green-900
				borderColor: "#22c55e", // green-500
				color: "#dcfce7",
			},
		});
	},
};

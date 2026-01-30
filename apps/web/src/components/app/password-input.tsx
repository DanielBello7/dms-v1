import { type ComponentProps, useState } from "react";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon, Button } from "../ui";

type Props = ComponentProps<"input">;
export const PasswordInput = (props: Props) => {
	const [show, setShow] = useState(false);
	return (
		<InputGroup className="pe-0">
			<InputGroupInput
				id="inline-end-input"
				{...props}
				type={show ? "text" : "password"}
				placeholder="*************"
			/>
			<InputGroupAddon align="inline-end">
				<Button
					className="hover:bg-transparent cursor-pointer"
					variant={"ghost"}
					onClick={() => setShow(!show)}
					type="button">
					{show ? <EyeOffIcon /> : <EyeIcon />}
				</Button>
			</InputGroupAddon>
		</InputGroup>
	);
};

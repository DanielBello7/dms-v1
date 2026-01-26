import { Loader } from "./loader";
import { useLogic } from "./use-logic";

type Props = {
	children?: React.ReactNode;
	onlogout: () => void;
	jwt: string | undefined | null;
	validation: () => Promise<void>;
};
export const AuthGuard = ({ children, onlogout, jwt, validation }: Props) => {
	const { isLoading } = useLogic({
		onlogout,
		jwt,
		validation,
	});
	if (isLoading) return <Loader />;
	return children;
};

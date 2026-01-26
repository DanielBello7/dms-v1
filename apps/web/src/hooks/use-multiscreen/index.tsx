import { useCallback, useMemo, useState } from "react";
import { EmptyScreen } from "./empty-screen";

export type Screen<Name extends string = string> = {
	index?: number;
	name: Name;
	component: React.ReactNode;
} & Record<string, unknown>;

export const useMultiscreen = <Name extends string = string>(
	screens: Screen<Name>[],
	initial?: Name
) => {
	// Ensure there is always at least one screen
	const managed = useMemo<Screen<Name>[]>(() => {
		return screens.length === 0
			? [{ name: "empty" as Name, component: <EmptyScreen /> }]
			: screens;
	}, [screens]);

	// Determine the initial index from the initial name
	const initialIndex = useMemo(() => {
		if (!initial) return 0;
		const found = managed.findIndex((s) => s.name === initial);
		return found >= 0 ? found : 0;
	}, [initial, managed]);

	// Use state for index (affects rendering)
	const [index, setIndex] = useState<number>(initialIndex);

	// Update index if `managed` changes and current index is out of bounds
	// (We do it in the setter functions below, not in useEffect)
	const clampIndex = useCallback(
		(i: number) => Math.max(0, Math.min(i, managed.length - 1)),
		[managed.length]
	);

	// Navigation functions
	const next = useCallback(() => {
		setIndex((i) => clampIndex(i + 1));
	}, [clampIndex]);

	const prev = useCallback(() => {
		setIndex((i) => clampIndex(i - 1));
	}, [clampIndex]);

	const goto = useCallback(
		(target: number | Name) => {
			if (typeof target === "number") {
				setIndex(clampIndex(target));
				return;
			}
			const found = managed.findIndex((s) => s.name === target);
			if (found >= 0) setIndex(found);
		},
		[clampIndex, managed]
	);

	// If `initial` changes and is different from current index, jump to it
	// Using a lazy initializer inside useState avoids useEffect entirely
	if (initial && managed[index]?.name !== initial) {
		const found = managed.findIndex((s) => s.name === initial);
		if (found >= 0 && found !== index) setIndex(found);
	}

	const screen: Screen<Name> = managed[index] ?? {
		name: "empty" as Name,
		component: <EmptyScreen />,
	};

	return {
		screens: managed,
		index,
		next,
		prev,
		goto,
		screen,
	};
};

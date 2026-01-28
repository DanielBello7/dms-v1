import { z } from "zod";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { useAsyncHandler } from "@/hooks";
import { useState } from "react";

const schema = z.object({
	search: z.string().min(1).trim(),
});

type FORM_SCHEMA_TYPE = z.infer<typeof schema>;

export const useLogic = () => {
	const [results, setResults] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const handler = useAsyncHandler();
	const form = useForm<FORM_SCHEMA_TYPE>({ defaultValues: { search: "" } });
	const values = useWatch({ control: form.control }) as FORM_SCHEMA_TYPE;

	const clear = () => {
		setResults([]);
		setShowResults(false);
	};

	const submit: SubmitHandler<FORM_SCHEMA_TYPE> = async (data) =>
		handler.run(async () => {
			const parsed = schema.parse(data);
			console.log(parsed);
			setResults([]);
		});

	return {
		handler,
		form,
		submit,
		results,
		clear,
		showResults,
		values,
		setShowResults,
	};
};

import { z } from "zod";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { useAsyncHandler } from "@/hooks";
import { useState } from "react";
import { ensure_error, wait } from "@repo/helpers";
import { envs } from "@/config";
import type { IUserSerialized } from "@repo/types";
import { api } from "@/lib";
import { useUser } from "@/stores";

const schema = z.object({
  search: z.string().min(1).trim(),
});

type FORM_SCHEMA_TYPE = z.infer<typeof schema>;

export const useLogic = () => {
  const [results, setResults] = useState<IUserSerialized[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handler = useAsyncHandler();
  const form = useForm<FORM_SCHEMA_TYPE>({ defaultValues: { search: "" } });
  const values = useWatch({ control: form.control }) as FORM_SCHEMA_TYPE;
  const user = useUser((state) => state);

  const clear = () => {
    setResults([]);
    setShowResults(false);
    form.reset();
    setError(null);
    setIsLoading(false);
  };

  const submit: SubmitHandler<FORM_SCHEMA_TYPE> = async (data) => {
    setError(null);
    setResults([]);
    setShowResults(true);
    setIsLoading(true);
    try {
      await wait(2000, envs.NODE_ENV);
      const parsed = schema.parse(data);
      const response = await api.users.search_users({
        value: parsed.search,
        page: 1,
        pick: 9,
        sort: "DESC",
      });
      const main = response.docs.filter((r) => r.id !== user.data.user.id);
      setResults(main);
      setShowResults(true);
    } catch (e) {
      setError(ensure_error(e));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handler,
    error,
    setError,
    isLoading,
    form,
    submit,
    results,
    clear,
    showResults,
    values,
    setShowResults,
  };
};

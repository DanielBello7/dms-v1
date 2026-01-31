import { assets } from "@/config";
import { Search } from "lucide-react";

export const Placeholder = () => {
  return (
    <div className="col-span-3 flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/20 bg-muted/20 px-6 py-10">
      <div className="relative flex max-w-[200px] flex-shrink-0">
        <img
          src={assets.illu_add_people}
          alt=""
          className="w-full rounded-2xl object-cover shadow-md"
        />
        <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
          <Search className="h-5 w-5" />
        </div>
      </div>
      <h3 className="mt-6 text-center text-lg font-semibold text-foreground">
        Find people to add
      </h3>
      <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
        Search by email above to find someone and add them to this conversation.
      </p>
    </div>
  );
};

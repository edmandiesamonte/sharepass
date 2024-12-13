import { Label } from "@/components/ui/label";
import { FormattedMessage } from "react-intl";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ValidationError } from "@/components/texts";

export default function AdvanceOptions({
    form: { data, errors, setData, clearErrors },
}) {
    return (
        <div className="flex items-center gap-2">
            <Label htmlFor="copies">
                <FormattedMessage defaultMessage="Copies" />
            </Label>
            <Input
                id="copies"
                type="number"
                min={1}
                max={5}
                value={data.copies}
                onChange={(e) => {
                    setData("copies", e.target.value);
                    clearErrors("copies");
                }}
                className={cn(
                    "w-20",
                    errors.copies &&
                        "border-red-500 focus-visible:ring-red-500",
                )}
            />
            {errors.copies && (
                <ValidationError>{errors.copies}</ValidationError>
            )}
        </div>
    );
}

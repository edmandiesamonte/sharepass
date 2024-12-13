import { Label } from "@/components/ui/label";
import { FormattedMessage } from "react-intl";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ValidationError } from "@/components/texts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function BasicFields({
    form: { data, errors, setData, clearErrors },
}) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-grow">
                <Label htmlFor="content">
                    <FormattedMessage defaultMessage="Content" />
                </Label>
                <Textarea
                    id="content"
                    value={data.content}
                    onChange={(e) => {
                        setData("content", e.target.value);
                        clearErrors("content");
                    }}
                    className={cn(
                        "resize-y min-h-40",
                        errors.content &&
                            "border-red-500 focus-visible:ring-red-500",
                    )}
                />
                {errors.content && (
                    <ValidationError>{errors.content}</ValidationError>
                )}
            </div>
            <div className="shrink-0 space-y-4">
                <div>
                    <Label htmlFor="expire">
                        <FormattedMessage defaultMessage="Expiration" />
                    </Label>
                    <Select
                        id="expire"
                        value={data.expiry}
                        onValueChange={(v) => {
                            setData("expiry", v);
                            clearErrors("expiry");
                        }}
                    >
                        <SelectTrigger
                            className={cn(
                                "min-w-28",
                                errors.expiry &&
                                    "border-red-500 focus-visible:ring-red-500",
                            )}
                        >
                            <SelectValue placeholder="Expiration" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hour">
                                <FormattedMessage defaultMessage="Hour" />
                            </SelectItem>
                            <SelectItem value="day">
                                <FormattedMessage defaultMessage="Day" />
                            </SelectItem>
                            <SelectItem value="week">
                                <FormattedMessage defaultMessage="Week" />
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.expiry && (
                        <ValidationError>{errors.expiry}</ValidationError>
                    )}
                </div>
                <Button className="w-full">
                    <FormattedMessage defaultMessage="Generate Secure Link" />
                </Button>
            </div>
        </div>
    );
}

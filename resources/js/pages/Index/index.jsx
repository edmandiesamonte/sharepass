import { useForm } from "@inertiajs/react";
import BasicFields from "@/pages/Index/BasicFields";
import { PageTitle } from "@/components/texts";
import { FormattedMessage } from "react-intl";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChevronDown, ChevronRight, ShieldCheck } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AdvanceOptions from "@/pages/Index/AdvanceOptions";
import { useState } from "react";

export default function Index() {
    const [advanceOptionsOpen, setAdvanceOptionsOpen] = useState(false);
    const form = useForm({
        content: "",
        expiry: "hour",
        copies: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post("/");
    };
    return (
        <div className="space-y-4">
            <PageTitle>
                <FormattedMessage defaultMessage="Encrypt Content" />
            </PageTitle>
            <Separator />
            <Alert>
                <ShieldCheck className="size-5" />
                <AlertTitle>
                    <FormattedMessage
                        defaultMessage="Welcome to {appName}"
                        values={{ appName: import.meta.env.VITE_APP_NAME }}
                    />
                </AlertTitle>
                <AlertDescription className="text-muted-foreground">
                    <FormattedMessage defaultMessage="Encrypt content and generate a one-time use secure link. Encrypted content will be permanently deleted after viewing. No traces, no records—just peace of mind." />
                </AlertDescription>
            </Alert>
            <form onSubmit={handleSubmit}>
                <div className="max-w-screen-lg space-y-6">
                    <BasicFields form={form} />
                    <Collapsible
                        open={advanceOptionsOpen}
                        onOpenChange={setAdvanceOptionsOpen}
                    >
                        <CollapsibleTrigger className="flex w-full items-center gap-3 text-xs text-muted-foreground">
                            <FormattedMessage defaultMessage="Advanced Options" />
                            <div className="border-b flex-grow" />
                            {advanceOptionsOpen ? (
                                <ChevronDown className="size-4" />
                            ) : (
                                <ChevronRight className="size-4" />
                            )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="py-4">
                            <AdvanceOptions form={form} />
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </form>
        </div>
    );
}
